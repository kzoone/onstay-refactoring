import { useEffect, useState } from 'react';
import axiosAuth from './../../../services/axiosAuth';
import { Link } from 'react-router-dom';
import ConfirmModal from './../../common/ConfirmModal';

export function MyReservation({ user_id }) {
  let [category, setCategory] = useState('upcoming');
  let [reservations, setReservations] = useState([]);
  let [modal, setModal] = useState({show : false, acc_name : '', room_name : '', handleConfirm : ()=>{}})

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
      method: 'get'
    })
      .then((res) => {
        let reservations = res.data
          .map((reservation) => {
            const now = new Date().getTime();
            const checkin = new Date(reservation.checkin).getTime();
            const checkout = new Date(reservation.checkout).getTime()
            const totalPrice = reservation.room_price * parseInt((checkout - checkin) / (24*60*60*1000)) 
            const dayDiff = parseInt((checkin - now) / (24 * 60 * 60 * 1000)); // 현재 날짜와 체크인 날짜간의 간격을 구함
            return {
              ...reservation,
              dayDiff,
              totalPrice,
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
  }, [category, user_id]);

  const showModal = (e) => {
    setModal({
      show : true,
      acc_name : e.target.dataset.acc_name,
      room_name : e.target.dataset.room_name,
      handleConfirm : cancelReservation(e.target.dataset.rid)
  })
}

const closeModal = () => setModal({...modal, show : false})

// 예약 취소
const cancelReservation = rid => () => {
  axiosAuth({
    url : 'http://localhost:8000/mypage/reservation',
    method : 'delete',
    data : {reservation_id : rid}
  })
  .then(res => {
    alert(`예약이 성공적으로 취소되었습니다.`);
    window.location.href = '/mypage'; 
  })
  .catch(err => {
    alert(err.response.data.message)
  })
}


  return (
    <div className="my_reservation">
      <ul className="my_reservation_navbar">
        <li
          onClick={handleClick}
          data-category="upcoming"
          className={category === 'upcoming' ? 'active' : ''}
        >
          다가올 예약
        </li>
        <li
          onClick={handleClick}
          data-category="complete"
          className={category === 'complete' ? 'active' : ''}
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
                      결제 금액 : {res.totalPrice.toLocaleString()}원
                    </small>
                    <small className="pay_date">결제 일자 : {res.pay_date}</small>
                  </div>
                </div>
                <div className="btns">
                  {category === 'upcoming' && res.dayDiff >= 2 && (
                    <button onClick={showModal} data-rid={res.reservation_id} data-acc_name={res.acc_name} data-room_name={res.room_name}>예약 취소</button>
                  )}
                  {category === 'upcoming' && res.dayDiff < 2 && (
                    <div style={{color:'red', textAlign:'center'}}>취소 불가능</div>
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
      {modal.show && 
      <ConfirmModal noti_1={`${modal.acc_name}-${modal.room_name} 예약을 정말 취소하시겠습니까?`} 
                    noti_2={`숙소 환불 규정에 따라 위약금이 부과될 수 있습니다.`} 
                    handleModal={closeModal}
                    handleConfirm={modal.handleConfirm}/>
                    }
    </div>
  );
}
