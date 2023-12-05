import axios from 'axios';
import React from 'react';

export default function NoticeAdd({ setUpdateModal }) {
  const handelModal = (e) => {
    setUpdateModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    })

    axios.post('http://127.0.0.1:8000/notice/insert/', formDataObject)
  }

  return (
    <div className='modal_container'>
      <div className='modal_content addModal'>
        <img src='/assets/images/main_logo.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <form id='notice_form' className='notice_form' onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="">제목 : </label>
                <input type="text" name='title' placeholder='title' />
              </li>
              <li>
                <label htmlFor="">이미지 : </label>
                <input type="text" name='image' placeholder='image' />
              </li>
              <li>
                <label htmlFor="">내용 : </label>
                <textarea name="content" form="notice_form" cols="30" rows="10" placeholder='content'></textarea>
              </li>
            </ul>
          </form>
        </div>
        <div className='btn_wrap'>
          <button type='button' className='close_btn'
            onClick={handelModal}>닫기</button>
          {/* <button type='button' className='login_btn'
                  onClick={handleConfirm}>{btnText || '확인'}</button> */}
        </div>
      </div>
    </div>
  );
}

