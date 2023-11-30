import React, { forwardRef }  from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import Modal from './Modal';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationDate({param, price}) {
  const [ reservationDate, setReservationDate ] = useState([]);
  const [ startDate, setStartDate ] = useState(null);
  const [ endDate, setEndDate ] = useState(null);
  const [ btnDisabled, setBtnDisabled ] = useState(false);
  const [ isModal, setIsModal ] = useState(false);
  const [ textBtn, setTextBtn ] = useState('예 약 하 기');
  const navigate = useNavigate();
  const userInfo = {'id' : 'user'}; // 로그인 테스트 용도


  // 예약 정보 가져오기
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/room/date/${param}`)
    .then(result => {
      if(result.data.length > 0) {
        let mapArr = result.data.map(date => ({
          checkin : new Date(date.checkin),
          checkout : new Date(date.checkout)
        }));
        setReservationDate(mapArr);
      }
    })
    .catch(error => console.log(error));
  }, []);


  // 예약된 날짜에 따른 비활성화 날짜 범위 계산
  const filterReverseDate = (date) => {
    const isReserved = reservationDate.some(reservation => {
      const checkinDate = reservation.checkin;
      const checkoutDate = reservation.checkout;
      return date >= checkinDate && date < checkoutDate;
    });
    return !isReserved;
  };


  // 선택한 날짜 사이의 몇 박 계산
  const fnNightCnt = (checkin, checkout) => {
    if (!checkin || !checkout) {
      return null;
    };

    const diff = Math.abs(checkout - checkin);
    const nightCalc = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nightCalc;
  };


  // 선택한 기간에 따른 가격 구하기
  const priceCalc = (checkin, checkout) => {
    const isPossible = validateDates(checkin, checkout);
    if (isPossible) {
      const nightCnt = fnNightCnt(checkin, checkout);
      const roomPrice = nightCnt * price;
      const priceView = `₩${roomPrice.toLocaleString()}원 결제하기`;
      console.log('sd');
      setTextBtn(priceView);
    };
  };

  useEffect(() => {
    priceCalc(startDate, endDate);
  }, [startDate, endDate, price]);
  

  // input onchange 이벤트
  const handleChangeCheckin = (date) => {
    setStartDate(date);
    validateDates(date, endDate);
  };
  
  const handleChangeCheckout = (date) => {
    setEndDate(date);
    validateDates(startDate, date);
  };

  // 예약된 날짜에 선택한 날짜 포함 여부 체크
  const includeReservation = (checkin, checkout) => {
    const isReserved = reservationDate.some(reservation => {
      const checkinDate = reservation.checkin; 
      const checkoutDate = reservation.checkout;
      return checkin < checkoutDate && checkout > checkinDate
    });
    return !isReserved;
  }
  

  // input 유효성 검사
  const validateDates = (checkin, checkout) => {
    if (checkin && checkout) {
      // 체크인 체크아웃 날짜가 모두 있을 때 예약 되어있는 날짜가 포함되는지 체크하는 함수 실행
      const checkReserved = includeReservation(checkin, checkout);
      if (checkin.getTime() === checkout.getTime()) {
        setBtnDisabled(true);
        setTextBtn('같은 날짜는 예약 불가능합니다');
        return false;
      } else if (checkin.getTime() >= checkout.getTime()) {
        setBtnDisabled(true);
        setTextBtn('체크아웃 날짜는 체크인 날짜 이후로 선택해주세요');
        return false;
      } else if (!checkReserved) {
        setBtnDisabled(true);
        setTextBtn('예약 불가한 날짜가 포함되어 있습니다');
      } else {
        return true;
      }
    } else {
      setBtnDisabled(false);
      setTextBtn('예 약 하 기');
      return false;
    } 
  };

  // 예약하기 버튼 클릭
  const handleClick = () => {
    if ( !btnDisabled ) {
      if ( userInfo ) { // 추후 로그인 정보 가져와서 변동 진행
        if ( startDate && endDate ) {
            const nightCnt = fnNightCnt(startDate, endDate);
            navigate(`/reservation/${param}`, { state: { 'checkin': startDate, 'checkout': endDate, 'nightCnt': nightCnt }});
          } else {
            setBtnDisabled(true);
            navigate(`/reservation/${param}`, { state: { 'checkin': startDate, 'checkout': endDate, 'nightCnt': '' }});
            }
        } else {
          setIsModal(true);
        }
      } 
  };

  // 커스텀 input
  const CustomCheckinInput = forwardRef(({ value, onClick, onChange }, ref) => {
    return (
      <input
        type='text'
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        placeholder='체크인'
        readOnly
        style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
        />
      );
    });
      
    const CustomCheckoutInput = forwardRef(({ value, onClick, onChange }, ref) => {
      return (  
        <input
        type='text'
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        placeholder='체크아웃'
        readOnly
        style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
      />
    );
  });

  // 모달 함수 : 로그인 버튼 클릭시
  const isModalLogin = (e) => {
    navigate('/login');
  };
  
  // 모달 함수 : 닫기 클릭 + 모달 외 영역 클릭
  const isModalClose = (e)  => {
    setIsModal(false);
  };

  return(
    <>
      <div className='checkdate_container'>
        <div className='input_wrap'>
            <DatePicker
                locale={ko}
                selected={startDate}
                onChange={handleChangeCheckin}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat='yyyy-MM-dd'
                fixedHeight 
                customInput={<CustomCheckinInput />}
                filterDate={filterReverseDate}
                isClearable
                />
            <DatePicker
                locale={ko}
                selected={endDate}
                onChange={handleChangeCheckout}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat='yyyy-MM-dd'
                fixedHeight 
                customInput={<CustomCheckoutInput />}
                filterDate={filterReverseDate}
                isClearable
                />
        </div>
        <button className='reservation_btn' type='button' onClick={handleClick} disabled={btnDisabled}>{textBtn}</button>
      </div>
      {
        isModal &&
        <Modal isModalClose={isModalClose} isModalLogin={isModalLogin} />
      }
    </>
  );
};