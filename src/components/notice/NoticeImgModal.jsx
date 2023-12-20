import React from 'react';
import getImgPath from '../../util/getImgPath';

export default function NoticeImgModal({ setImgModal, notice_img }) {
  const handleModal = () => setImgModal(false);

  return (
    <div className='modal_container'>
      <div className='modal_content img_modal'>
        <img src={getImgPath.notice(notice_img)} alt="Notice_img" />
        <div className='btn_wrap'>
          <button type='button' className='close_img_btn'
            onClick={handleModal}>닫기</button>
        </div>
      </div>
    </div>
  );
};