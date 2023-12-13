import React from 'react';
import useUserInfo from '../../util/useUserInfo';
import axiosAuth from '../../services/axiosAuth';
import { useNavigate } from 'react-router-dom';
import TodayAccSection from './TodayAccSection';

export default function TodayAccModal({ setModal, noti_1, noti_2, btnText, acc_name }) {
  const userInfo = useUserInfo(false);
  const navigate = useNavigate();

  const handleModalBackground = (e) => {
    handleModal();
    e.stopPropagation();
  };

  const handleModal = () => {
    setModal(false)
  };

  const params = {
    user_id: userInfo.user_id,
    coupon_name: `[${acc_name}] 10,000원 할인 쿠폰(오늘 공개)`,
    discount_price: 10000,
    acc_name: acc_name
  };

  const handleConfirm = () => {
    axiosAuth.post('http://localhost:8000/newstay/today/coupon', params)
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