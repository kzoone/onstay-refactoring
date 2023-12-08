import React from 'react';

export default function NoticeImgModal({ setImgModal, notice_img }) {
  const handleModal = () => setImgModal(false);

  return (
    <div className='modal_container'>
      <div className='modal_content img_modal'>
        <img src={notice_img !== undefined ? `http://127.0.0.1:8000/getimg/noticeimg/${notice_img}` : `/assets/images/notice/basicImg.jpg`} alt="Notice_img" />
        <div className='btn_wrap'>
          <button type='button' className='close_img_btn'
            onClick={handleModal}>닫기</button>
        </div>
      </div>
    </div>
  );
};