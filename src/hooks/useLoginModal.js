
import { useState } from 'react';
import ConfirmModal from './../components/common/ConfirmModal';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useLoginModal() {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showLoginModal = () => setModalShow(true);

  const handleConfirm = () => {
    localStorage.setItem('prev_page', location.pathname + location.search)
    navigate('/login')
  }
  
  const LoginModal = () => {
    return modalShow ? (
      <ConfirmModal noti_1={'로그인이 필요한 서비스입니다.'} noti_2={'로그인 페이지로 이동하시겠습니까?'}
                    handleConfirm={handleConfirm} handleModal={()=>setModalShow(false)}/>
    ) : null
  }

  return (
    [LoginModal, showLoginModal]
  );
}