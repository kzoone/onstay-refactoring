import { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import ConfirmModal from './../../common/ConfirmModal';
import MyContentNavbar from '../mypage_common/MyContentNavbar';
import axios from 'axios';
import MyReservationList from '../myreservation/MyReservationList';

export function MyReservation({ user_id }) {
  let [category, setCategory] = useState('upcoming');
  let [reservations, setReservations] = useState([]);
  let [modal, setModal] = useState({show : false, acc_name : '', room_name : '', handleConfirm : ()=>{}})
  let location = useLocation();

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/mypage/reservation/' + category + '/' + user_id,
      method: 'get'
    })
    .then((res) => {
      setReservations(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [category, user_id, location]);

  
const closeModal = () => setModal({...modal, show : false})


  return (
    <div className="my_reservation">
      <MyContentNavbar contents={['upcoming','complete']} contents_string={['다가올 예약', '이용 완료']}
      category={category} setCategory={setCategory}/>

      <MyReservationList category={category} setModal={setModal} reservations={reservations}/>
      
      {modal.show && // 예약 취소 확인 모달
      <ConfirmModal noti_1={`${modal.acc_name}-${modal.room_name} 예약을 정말 취소하시겠습니까?`} 
                    noti_2={`숙소 환불 규정에 따라 위약금이 부과될 수 있습니다.`} 
                    handleModal={closeModal}
                    handleConfirm={modal.handleConfirm}/>
                    }
    </div>
  );
}
