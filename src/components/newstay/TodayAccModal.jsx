import React from 'react';
import useUserInfo from '../../util/useUserInfo';
import axiosAuth from '../../services/axiosAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import TodayAccSection from './TodayAccSection';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function TodayAccModal({ setModal, noti_1, noti_2, btnText, acc_name }) {
  const userInfo = useUserInfo(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalBackground = (e) => {
    handleModal();
    e.stopPropagation();
  };

  const handleModal = () => {
    setModal(false)
  };

  const params = {
    user_id: userInfo.user_id,
    coupon_name: `[${acc_name}] 10,000원 할인 쿠폰`,
    discount_price: 10000,
    acc_name: acc_name
  };

  const handleConfirm = () => {
    if(userInfo.user_id) {
    axiosAuth.post(`${apiBaseUrl}/newstay/today/coupon`, params)
      .then(result => {
        if (result.data === 'ok') {
          const confirm = window.confirm('쿠폰이 발급되었습니다. 마이페이지로 이동하시겠습니까?');
          if (confirm) {
            navigate('/mypage?showContent=MyCoupon');
          } else {
            return <TodayAccSection />;
          }
        } else if (result.data === 'not ok') {
          alert('이미 쿠폰을 발급 받으셨습니다.')
          return;
        }
      })
      .catch(error => console.log(error));
    } else if (!userInfo.user_id) {
      localStorage.setItem('prev_page', location.pathname)
      navigate('/login');
    };
  };

  return (
    <div className='modal_container' onClick={handleModalBackground}>
      <div className='modal_content'>
        <img src='/assets/images/logo_color.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <p>{noti_1}</p>
          <p>{noti_2}</p>
        </div>
        <div className='btn_wrap'>
          <button type='button' className='close_btn'
            onClick={handleModal}>닫기</button>
          <button type='button' className='login_btn'
            onClick={handleConfirm}>{btnText || '확인'}</button>
        </div>
      </div>
    </div>
  );
};