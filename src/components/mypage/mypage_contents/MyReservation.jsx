import { useEffect, useState } from 'react';
import axiosAuth from './../../../services/axiosAuth';

export function MyReservation({ user_id }) {
  let [category, setCategory] = useState('upcoming');
  let [reservations, setReservations] = useState([]);

  const handleClick = (e) => setCategory(e.target.dataset.category);

  const convertDateForm = (isoTime) => {
    let newTime = new Date(isoTime);
    let year = newTime.getFullYear();
    let month = newTime.getMonth() + 1;
    let date = newTime.getDate();
    month = month >= 10 ? month : '0' + month;
    date = date >= 10 ? date : '0' + date;
    let day = ['일', '월', '화', '수', '목', '금', '토'][newTime.getDay()];
    return `${year}-${month}-${date}(${day}) `;
  };

  useEffect(() => {
    axiosAuth({
      url: 'http://localhost:8000/mypage/reservation/' + user_id,
      method: 'get',
    })
      .then((res) => {
        let reservations = res.data
          .map((reservation) => {
            const now = new Date().getTime();
            const checkin = new Date(reservation.checkin).getTime();
            const dayDiff = parseInt((checkin - now) / (24 * 60 * 60 * 1000)); // 현재 날짜와 체크인 날짜간의 간격을 구함
            return {
              ...reservation,
              dayDiff,
              checkin: convertDateForm(reservation.checkin),
              checkout: convertDateForm(reservation.checkout),
              pay_date: convertDateForm(reservation.pay_date),
            };
          })
          .filter((reservation) => {
            if (category === 'upcoming') {
              return reservation.dayDiff >= 0; // 다가올 예약 페이지 (예약 포함)
            } else if (category === 'complete') {
              return reservation.dayDiff < 0;
            }
          });
        setReservations(reservations);
      })
      .catch((err) => {
        throw err;
      });
  }, [category]);

  return (
    <div className="my_reservation">
      <ul className="my_reservation_navbar">
        <li
          onClick={handleClick}
          data-category="upcoming"
          className={category === 'upcoming' && 'active'}
        >
          다가올 예약
        </li>
        <li
          onClick={handleClick}
          data-category="complete"
          className={category === 'complete' && 'active'}
        >
          이용 완료
        </li>
      </ul>
      <div className="my_reservation_list">
        {reservations.length ? (
          reservations.map((res) => (
            <div className="my_reservation_wrapper">
              <div className="reservation_info">
                <h4 className="acc_name">{res.acc_name}</h4>
                <span className="room_name">{res.room_name}</span>
                <div className="stay_info">
                  <b>예약 정보</b>
                  <small className="checkin">
                    체크인 : {res.checkin} {res.checkin_time}
                  </small>
                  <small className="checkout">
                    체크아웃 : {res.checkout} {res.checkout_time}
                  </small>
                </div>
                <div className="pay_info">
                  <b>결제 정보</b>
                  <small className="pay_price">
                    결제 금액 : {res.room_price.toLocaleString()}원
                  </small>
                  <small className="pay_date">결제 일자 : {res.pay_date}</small>
                </div>
                <div className="btns">
                  {category === 'upcoming' && res.dayDiff >= 2 && (
                    <button>예약 취소</button>
                  )}
                  {category === 'upcoming' && res.dayDiff < 2 && (
                    <small>취소 불가능</small>
                  )}
                  {category === 'complete' && res.dayDiff <= 0 && (
                    <button>후기 남기기</button>
                  )}
                </div>
              </div>
              <div className="acc_img">
                <img src="assets/images/acc/accImage11.jpg" alt="" />
              </div>
            </div>
          ))
        ) : (
          <div>no</div>
        )}
      </div>
    </div>
  );
}

// 숙소명 , 객실명, 체크인 ~ 체크아웃 , 버튼들
