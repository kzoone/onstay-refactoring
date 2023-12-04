import { useEffect, useState } from 'react';
import axiosAuth from './../../../services/axiosAuth';
import { Link } from 'react-router-dom';

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
      url: 'http://localhost:8000/mypage/reservation/' + 'user',
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
            <div className="my_reservation_wrapper" key={res.reservation_id}>
              <div className="reservation_info">
                <h4 className="acc_name">{res.acc_name}</h4>
                <span className="room_name">{res.room_name}</span>
                <div className="acc_img_mobile">
                  <img src={`assets/images/acc/${res.images[0].acc_img}`} alt="" />
                </div>
                <div className='detail_infos'>
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
                </div>
                <div className="btns">
                  {category === 'upcoming' && res.dayDiff >= 2 && (
                    <button>예약 취소</button>
                  )}
                  {category === 'upcoming' && res.dayDiff < 2 && (
                    <small style={{color:'red'}}>취소 불가능</small>
                  )}
                  {category === 'complete' && res.dayDiff <= 0 && (
                    <button>후기 남기기</button>
                  )}
                </div>
              </div>
              <div className="acc_img_pc">
                <img src={`assets/images/acc/${res.images[0].acc_img}`} alt="" />
              </div>
            </div>
          ))
        ) : (
          <div className='no_list'>
            <div className='no_list_img'>
              <img src="assets/images/etc/mypage_no_list.png" alt="" />            
            </div>
            <div>
              <span>아직 예약 정보가 없습니다.</span>
              <span>새로운 스테이를 찾아 떠나보세요.</span>
            </div>
            <Link to='/findstay'>FIND STAY</Link>
          </div>
        )}
      </div>
    </div>
  );
}
