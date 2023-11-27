import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import Modal from './Modal';
import "react-datepicker/dist/react-datepicker.css"; 

export default function ReservationDate({param, price}) {
  const [ reservationDate, setReservationDate ] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ textBtn, setTextBtn ] = useState('예 약 하 기');
  const [ isModal, setIsModal ] = useState(false); 
  const navigate = useNavigate();

  // 예약 정보 가져오기 
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/room/date/${param}`)
    .then(result => {
      let dateArr = result.data.map(date => ({
          ...date,
          checkin : date.checkin ? date.checkin.slice(0, 10) : '',
          checkout : date.checkout ? date.checkout.slice(0, 10) : ''
        }));
      setReservationDate(dateArr);
    })
    .catch(error => console.log(error));
  }, []); 

  // 선택한 날짜 사이의 몇 박 계산
  const fnNightCnt = (checkin, checkout) => {
    if(!checkin || !checkout) {
      return null;
    }

    const diff = Math.abs(checkout - checkin);
    const nightCalc = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nightCalc;
  }

  // 선택한 기간에 따른 가격 구하기
  const PriceCalc = (checkin, checkout) => {
    const isCheck = validateDates(checkin, checkout)
    if(isCheck) {
      const nightCnt = fnNightCnt(checkin, checkout);
      console.log(nightCnt);
      const roomPrice = nightCnt * price;
      const priceView = `₩${roomPrice.toLocaleString()}원 결제하기`;
      setTextBtn(priceView);
    };
  };

  useEffect(() => {
    PriceCalc(startDate, endDate);
  }, [startDate, endDate, price])
  
  // input onchange 이벤트 
  const handleChangeCheckin = (date) => {
    setStartDate(date);
    validateDates(date, endDate);
  };

  const handleChangeCheckout = (date) => {
    setEndDate(date);
    validateDates(startDate, date);
  ;}

  // input 유효성 검사
  const validateDates = (checkin, checkout) => {
    if (checkin && checkout && checkin.getTime() === checkout.getTime()) {
      setTextBtn('같은 날짜는 예약 불가능합니다');
      return false;
    } else if ( checkin && checkout && checkin.getTime() >= checkout.getTime()) {
      setTextBtn('체크아웃 날짜는 체크인 날짜 이후로 선택해주세요');
      return false;
    } else if ( !checkin || !checkout ) {
      setTextBtn('예 약 하 기');
      return false
    }
    return true;
  }

 // custom input
  const CustomCheckinInput = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      placeholder='체크인'
      readOnly
      style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
    />
  );

  const CustomCheckoutInput = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      placeholder='체크아웃'
      readOnly
      style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
    />
  );

  // 예약하기 버튼 클릭
  const handleClick = () => {
    // if(로그인 회원) {
      // const nightCnt = fnNightCnt(startDate, endDate);
      // navigate(`/reservation/:${param}`, { state: {checkin: startDate, checkout: endDate, room: param, 'nightCnt': nightCnt }});
    // } else {
      setIsModal(true);
    // }
  }

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
                />
          </div>
        <button className='reservation_btn' type='button' onClick={handleClick}>{textBtn}</button>
      </div>
      {
        isModal &&
        <Modal isModalClose={isModalClose} isModalLogin={isModalLogin} />
      }
    </>
  );
};