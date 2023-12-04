import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FixDate from './FixDate'
import FormInfo from './FormInfo';
import Agreement from './Agreement';
import ConfirmModal from '../common/ConfirmModal';
import useUserInfo from '../../util/useUserInfo';
import axiosAuth from '../../services/axiosAuth';

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
  const [ isModal, setIsModal ] = useState(false);
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  

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
        setBtnText(`${nightCnt}박 : ₩${payPrice.toLocaleString()} 결제하기`);
        return true;
      }
    } else {
      setIsValidDate(false);
      setBtnText('날짜를 선택해주세요');
      return false;
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


  const handleSubmit = (e) => { // isAgree, isValidDate ? startDate, endDate, userInfo.user_id, room_id, selectedCouponId
    e.preventDefault();

    // isAgree 약관 동의 진행 되고 isValidDate 유효성검사 모두 통과했니?
    if ( isAgree && isValidDate ) {
      axiosAuth({ 
        method : 'post',
        url: 'http://127.0.0.1:8000/reservation/booking',
        data: {
          userId : userInfo.user_id,
          roomId : roomid,
          startDate : startDate.toISOString().split('T')[0],
          endDate : endDate.toISOString().split('T')[0],
          selectedCouponId : selectedCouponId || null
        }
      })
      .then(result => {
        setIsModal(true);
      })
      .catch(error => console.log(error));
    } else {
      setBtnText('약관 동의를 체크해주세요');
    }
  };

    // 모달창 확인 버튼 클릭
    const handleConfirm = (e) => {
      navigate('/mypage');
    };

    // 모달창 닫기 버튼 클릭
    const handleModal = (e) => {
        navigate('/');
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
      <form className='payment_form' onSubmit={handleSubmit} >
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
          <button
                  className='payment_btn'
                  disabled={!isValidDate}>
                  {btnText}
          </button>
        </div>
      </form>
      {
        isModal &&
          <ConfirmModal handleModal={handleModal} 
                      handleConfirm={handleConfirm} 
                      noti_1='결제 완료 되었습니다!' 
                      noti_2='예약내역으로 이동하시겠습니까?' />
      }
    </>
  );
}