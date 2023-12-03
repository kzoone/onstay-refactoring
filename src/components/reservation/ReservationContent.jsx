import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import FixDate from './FixDate'
import FormInfo from './FormInfo';
import Agreement from './Agreement';
import ConfirmModal from '../common/ConfirmModal'; // 로그인 여부에 따른 처리 예정

export default function ReservationContent() {
  const location = useLocation();
  let { reservationData, checkin, checkout, nightCntparam, price } = location.state;
  const { roomid } = useParams();
  const [ startDate, setStartDate ] = useState(checkin);
  const [ endDate, setEndDate ] = useState(checkout);
  const [ roomInfoData, setRoomInfoData ] = useState([]);
  const [ isValidDate, setIsValidDate ] = useState(false);
  const [ btnText, setBtnText ] = useState('결제하기');
  const [ nightCnt, setNightCnt ] = useState(nightCntparam);
  const [ payPrice, setPayPrice ] = useState(0);
  const [ totalPayPrice, setTotalPayPrice ] = useState(0);
  const [ selectedCouponId, setSelectedCouponId ] = useState('');
  const [ isAgree, setIsAgree ] = useState(false);
  const userInfo = { 'id': 'user' }; // 테스트용 

  // 객실 정보 리스트 조회 
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/reservation/${roomid}`)
      .then(result => {
        setRoomInfoData(result.data);
      })
      .catch(error => console.log(error));
  }, []);


  // 날짜 유효성 검사
  useEffect(() => {
    validateDates(startDate, endDate);
  }, [startDate, endDate]);

  // 날짜 유효성 검사 함수
  const validateDates = (startDate, endDate) => {
    if (startDate && endDate) {
      const isDateInclude = includeReservation(startDate, endDate);
      if (startDate.getTime() === endDate.getTime()) {
        setIsValidDate(false);
        setBtnText('같은 날짜는 예약 불가능합니다');
        return false;
      } else if (startDate.getTime() >= endDate.getTime()) {
        setIsValidDate(false);
        setBtnText('체크아웃 날짜는 체크인 날짜 이후로 선택해주세요');
        return false;
      } else if (isDateInclude) {
        setIsValidDate(false);
        setBtnText('예약 불가한 날짜가 포함되어 있습니다');
        return false;
      } else {
        setIsValidDate(true);
        const { nightCnt, payPrice } = fnPrice(startDate, endDate, price);
        setBtnText(`${nightCnt}박 : ₩${payPrice.toLocaleString()}`);
        return true;
      }
    } else {
      setIsValidDate(false);
      setBtnText('날짜를 선택해주세요');
      return false
    }
  };

  
  // 선택한 날짜에 따른 날짜 차이를 일수로 반환
  const fnNightCnt = (startDate, endDate) => {
    const diff = Math.abs(startDate - endDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };


  // 선택한 날짜에 따른 숙박 가격 반환
  const fnPrice = (startDate, endDate, price) => {
    const nightCnt = fnNightCnt(startDate, endDate);
    const payPrice = nightCnt * price;
    setNightCnt(nightCnt);
    setPayPrice(payPrice);
    return { nightCnt, payPrice };
  };


  // 선택한 날짜가 예약된 날짜에 포함되는지 확인
  const includeReservation = (startDate, endDate) => {
    const isDateInclude = reservationData.some(reservation => {
      const checkinDate = reservation.checkin;
      const checkoutDate = reservation.checkout;
      return startDate < checkoutDate && endDate > checkinDate;
    });
    return isDateInclude;
  };

  return (
    <>
      <FixDate
        reservationData={reservationData}
        roomInfoData={roomInfoData}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        nightCnt={nightCnt}
        price={price}
        btnText={btnText} />
      <form className='payment_form'>
        <FormInfo 
          roomInfoData={roomInfoData} 
          isValidDate={isValidDate}
          startDate={startDate} 
          endDate={endDate}
          price={price} 
          nightCnt={nightCnt} 
          payPrice={payPrice}
          totalPayPrice={totalPayPrice} 
          setTotalPayPrice={setTotalPayPrice}
          selectedCouponId={selectedCouponId} 
          setSelectedCouponId={setSelectedCouponId} />
        <Agreement 
          isAgree={isAgree} 
          setIsAgree={setIsAgree} 
          acc_name={roomInfoData.acc_name} />
        <div className='btn_box'>
          <button type='button' className='payment_btn' disabled={!isValidDate}>{btnText}</button>
        </div>
      </form>
    </>
  );
}