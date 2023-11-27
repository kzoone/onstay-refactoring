import React from 'react';

export default function Modal({isModalClose, isModalLogin}){

  const handleModalBackground = (e) => {
    isModalClose();
    e.stopPropagation();
  }

  return(
    <div className='modal_container' onClick={handleModalBackground}>
      <div className='modal_content'>
        <img src='/assets/images/logo_color.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <p>로그인이 필요한 서비스입니다</p>
          <p>로그인 창으로 이동하시겠습니까?</p>
        </div>
        <div className='btn_wrap'>
          <button type='button' className='close_btn'
                  onClick={isModalClose}>닫기</button>
          <button type='button' className='login_btn'
                  onClick={isModalLogin}>로그인하러 가기</button>
        </div>
      </div>
    </div>    
  );
}

