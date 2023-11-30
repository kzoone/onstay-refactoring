import { useEffect, useState } from "react";
import axiosAuth from './../../../services/axiosAuth';

export function MyReservation ({user_id}) {
  let [category, setCategory] = useState('upcoming')
  let [reservations, setReservations] = useState({});

  const handleClick = e => setCategory(e.target.dataset.category)

  useEffect(()=>{
    axiosAuth({
      url : 'http://localhost:8000/mypage/reservation/' + user_id,
      method : 'get'
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])


  return (
    <div className="my_reservation">
      <ul className='my_reservation_navbar'>
        <li onClick={handleClick} data-category="upcoming" className={category==='upcoming' && 'active'}>다가올 예약</li>
        <li onClick={handleClick} data-category="complete" className={category==='complete' && 'active'}>이용 완료</li>
      </ul>
      <div className="my_reservation_list">
        
        <div className="my_reservation_wrapper">
          <div className="reservation_info">
            <h4 className="acc_name">숙소이름</h4>
            <span className="room_name">객실명</span>
            <div className="stay_info">
              <b>예약 정보</b>
              <small className="checkin">체크인 : 2023-12-12(화) 15:00</small>
              <small className="checkout">체크아웃 : 2023-12-14(목) 11:00 </small>
            </div>
            <div className="pay_info">
              <b>결제 정보</b>
              <small className="pay_price">결제 금액 : 150,000원</small>
              <small className="pay_date">결제 일자 : 2023-12-14(목) 11:00 </small>
            </div>
            <div className="btns">
             <button>예약 취소</button>
            </div>
          </div>   
          <div className="acc_img">
            <img src="assets/images/acc/accImage11.jpg" alt="" />
          </div>
        </div>
  
      </div>
    </div>
  );
}

// 숙소명 , 객실명, 체크인 ~ 체크아웃 , 버튼들