import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import Modal from './Modal';
import "react-datepicker/dist/react-datepicker.css"; 

export default function ReservationDate({param, price}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [ reservationDate, setReservationDate ] = useState([]); // db에서 가져온 예약 정보
  const [ isModal, setIsModal ] = useState(false); // 모달 노출 여부
  const [ textBtn, setTextBtn ] = useState('예 약 하 기'); // 버튼 보여줄 글씨 
  const navigate = useNavigate(); // 모달 로그인 이동

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

  // 모달 함수 : 로그인 버튼 클릭시
  const isModalLogin = (e) => {
    navigate('/login');
  }
  
  // 모달 함수 : 닫기 클릭 + 모달 외 영역 클릭
  const isModalClose = (e)  => {
    setIsModal(false);
  }

  return(
    <>
      <div className='checkdate_container'>
        <div className='input_wrap'>
            <DatePicker
                locale={ko}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat='yyyy-MM-dd'
                placeholderText='체크인'
                fixedHeight 
                />
            <DatePicker
                locale={ko}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat='yyyy-MM-dd'
                placeholderText='체크아웃'
                fixedHeight 
                />
          </div>
        <button className='reservation_btn' type='button'>{textBtn}</button>
      </div>
      {
        isModal &&
        <Modal isModalClose={isModalClose} isModalLogin={isModalLogin} />
      }
    </>
  );
}


