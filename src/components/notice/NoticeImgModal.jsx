import React from 'react';

export default function NoticeImgModal({ setImgModal, notice_img }) {
  const handleModal = () => setImgModal(false);

  return (
    <div className='modal_container'>
      <div className='modal_content img_modal'>
        {notice_img !== null ?
          <img src={`http://localhost:8000/uploads/noticefile/${notice_img}`} alt="Notice_img" />
          : <img src={`/assets/images/notice/basicImg.jpg`} alt="Notice Image" />}
        <div className='btn_wrap'>
          <button type='button' className='close_img_btn'
            onClick={handleModal}>닫기</button>
        </div>
      </div>
    </div>
  );
};