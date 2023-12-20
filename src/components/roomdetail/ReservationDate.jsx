import React, { forwardRef }  from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import ConfirmModal from '../common/ConfirmModal';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationDate({roomid, price, user_id}) {
  const [ reservationData, setReservationData ] = useState([]);
  const [ startDate, setStartDate ] = useState(null);
  const [ endDate, setEndDate ] = useState(null);
  const [ isModal, setIsModal ] = useState(false);
  const [ btnDisabled, setBtnDisabled ] = useState(false);
  const [ textBtn, setTextBtn ] = useState('예 약 하 기');
  const navigate = useNavigate();

  // 예약 정보 가져오기
  useEffect(() => {
    axios.get(`http://localhost:8000/room/date/${roomid}`)
      .then(result => {
        if(result.data.length > 0) {
          let mapArr = result.data.map(date => ({
            checkin : new Date(date.checkin),
            checkout : new Date(date.checkout)
          }));
          setReservationData(mapArr);
        }
      })
      .catch(error => console.log(error));
  }, [roomid]);


  // 날짜 유효성 검사
  useEffect(() => {
    validateDates(startDate, endDate);
  }, [startDate, endDate, price]);


  // 예약된 날짜에 선택한 날짜 포함 여부 체크
  const includeReservation = (startDate, endDate) => {
    const isDateInclude = reservationData.some(reservation => {
      const checkinDate = reservation.checkin; 
      const checkoutDate = reservation.checkout;
      return startDate < checkoutDate && endDate > checkinDate;
    });
    return !isDateInclude;
  };
  
  // input 유효성 검사 함수
  const validateDates = (startDate, endDate) => {
    if (startDate && endDate) {
      // 체크인 체크아웃 날짜가 모두 있을 때 예약 되어있는 날짜가 포함되는지 체크하는 함수 실행
      const checkReserved = includeReservation(startDate, endDate);
      if (startDate.getTime() === endDate.getTime()) {
        setBtnDisabled(true);
        setTextBtn('같은 날짜는 예약 불가능합니다');
        return false;
      } else if (startDate.getTime() >= endDate.getTime()) {
        setBtnDisabled(true);
        setTextBtn('체크아웃 날짜는 체크인 날짜 이후로 선택해주세요');
        return false;
      } else if (!checkReserved) {
        setBtnDisabled(true);
        setTextBtn('예약 불가한 날짜가 포함되어 있습니다');
      } else {
        setBtnDisabled(false);
        const { payPrice, nightCnt } = priceCalc(startDate, endDate);
        setTextBtn(`${nightCnt}박 : ₩${payPrice}원 결제하기`);
        return true;
      }
    } else {
      setBtnDisabled(false);
      setTextBtn('예 약 하 기');
      return false;
    }
  };


  // 예약된 날짜에 따른 비활성화 날짜 범위 계산
  const filterReverseDate = (date) => {
    const isReserved = reservationData.some(reservation => {
      const checkinDate = reservation.checkin;
      const checkoutDate = reservation.checkout;
      return date >= checkinDate && date < checkoutDate;
    });
    return !isReserved;
  };


  // 선택한 날짜 사이의 몇 박 계산
  const fnNightCnt = (startDate, endDate) => {
    const diff = Math.abs(startDate - endDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };


  // 선택한 기간에 따른 가격 구하기
  const priceCalc = (startDate, endDate) => {
      const nightCnt = fnNightCnt(startDate, endDate);
      const roomPrice = nightCnt * price;
      const payPrice = roomPrice.toLocaleString();
      return { payPrice, nightCnt };
  };

  // input onchange 이벤트
  const handleChangeCheckin = (date) => {
    setStartDate(date);
  };
  
  const handleChangeCheckout = (date) => {
    setEndDate(date);
  };


  // 예약하기 버튼 클릭
  const handleClick = () => {
    if ( !btnDisabled ) {
      if ( user_id ) { 
        if ( startDate && endDate ) {
            const nightCnt = fnNightCnt(startDate, endDate);
            navigate(`/reservation/${roomid}`, { state: { 'checkin': startDate, 'checkout': endDate, 'nightCntparam': nightCnt, price }});
          } else {
            setBtnDisabled(true);
            navigate(`/reservation/${roomid}`, { state: { 'checkin': startDate, 'checkout': endDate, 'nightCntparam': '', price }});
            };
        } else {
          setIsModal(true);
        };
      };
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
        style={{ backgroundImage: 'url(/assets/images/etc/calendar.png)'}}
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
        style={{ backgroundImage: 'url(/assets/images/etc/calendar.png)'}}
      />
    );
  });

  // 모달 함수 : 로그인 버튼 클릭시
  const handleConfirm = (e) => {
    navigate('/login');
  };
  
  // 모달 함수 : 닫기 클릭 + 모달 외 영역 클릭
  const handleModal = (e)  => {
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
        <ConfirmModal handleModal={handleModal} 
                      handleConfirm={handleConfirm} 
                      noti_1='로그인이 필요한 서비스입니다' 
                      noti_2='로그인 창으로 이동하시겠습니까?'/>
      }
    </>
  );
};