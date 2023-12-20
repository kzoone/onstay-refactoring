import { Link, useNavigate } from 'react-router-dom';
import axiosAuth from '../../../services/axiosAuth';
import getImgPath from '../../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function MyReservationList ({reservations, setModal, category}) {
    const navigate = useNavigate()
   
    const dateFormatWithDay = (date) => {
        return date + ' (' + ['일','월','화','수','목','금','토'][new Date(date).getDay()] + ')'
      }
      const showModal = (e) => {
        setModal({
          show : true,
          acc_name : e.target.dataset.acc_name,
          room_name : e.target.dataset.room_name,
          handleConfirm : cancelReservation(e.target.dataset.rid)
      })
    }

    // 에약 취소
    const cancelReservation = rid => () => {
        axiosAuth({
          url : `${apiBaseUrl}/mypage/reservation`,
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
        <div className="my_reservation_list">
        {reservations.length ? (
          reservations.map((res) => (
            <div className="my_reservation_wrapper" key={res.reservation_id}>
              <div className="reservation_info">
                <h4 className="acc_name">{res.acc_name}</h4>
                <span className="room_name">{res.room_name}</span>
                <div className="acc_img_mobile">
                  <img src={getImgPath.acc(res.images[0].acc_img)} alt="" />
                </div>
                <div className='detail_infos'>
                  <div className="stay_info">
                    <b>예약 정보</b>
                    <small className="checkin">
                      체크인 : {dateFormatWithDay(res.checkin_date)} {res.checkin_time}
                    </small>
                    <small className="checkout">
                      체크아웃 : {dateFormatWithDay(res.checkout_date)} {res.checkout_time}
                    </small>
                  </div>
                  <div className="pay_info">
                    <b>결제 정보</b>
                    <small className="pay_price">
                      결제 금액 : {res.pay_price?.toLocaleString()}원
                    </small>
                    <small className="pay_date">결제 일자 : {res.pay_date}</small>
                  </div>
                </div>
                <div className="btns">
                  {(category === 'upcoming' && res.isCancelable) ? (
                    <button onClick={showModal} data-rid={res.reservation_id} data-acc_name={res.acc_name} data-room_name={res.room_name}>예약 취소</button>
                  ) : null}
                  {(category === 'upcoming' && !res.isCancelable) ? (
                    <button onClick={()=>alert('취소 불가능 상태입니다. 1:1 문의를 이용해주세요.')} className='disabled'>취소 불가능</button>
                  ) : null}
                  {(category === 'complete' && res.isReviewable) ? (
                    <button onClick={()=>navigate(`/findstay/room/${res.room_id}`)}>후기 남기기</button>
                  ) : null}
                  {(category === 'complete' && !res.isReviewable) ? (
                    <button className='disabled'>이미 후기를 남겼어요!</button>
                  ) : ''}
                </div>
              </div>
              <div className="acc_img_pc">
                <img src={getImgPath.acc(res.images[0].acc_img)} alt="" />
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
    );
}