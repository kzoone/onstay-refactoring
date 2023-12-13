import React from 'react';
import { useState } from 'react';
import { SlCamera } from 'react-icons/sl';
import axiosAuth from '../../services/axiosAuth';
import { useRef } from 'react';

export default function NoticeAdd({ btnText, setAddModal }) {
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ title: '', content: '' });
  const [inputCountTitle, setInputCountTitle] = useState('0');
  const [inputCountContent, setInputCountContent] = useState('0');

  const titleMaxLength = 100;
  const contentMaxLength = 2000;

  const handleModal = (e) => {
    setAddModal(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();//전송할 바디를 만듬

    formData.append('file', imageFile);
    formData.append('title', form['title']);
    formData.append('content', form['content']);

    axiosAuth.post('http://localhost:8000/notice/insert/', formData)
      .then(result => {
        if (result.data === 'ok') {
          alert('공지사항 등록이 완료되었습니다.');
          window.location.reload();
        }
      }).catch(error => console.log(error))
      ;

    setAddModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleFileButtonClick = () => {
    // 숨겨진 파일 input에 대해 클릭 이벤트
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInput = (maxLength, setCountFn) => (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
      alert(`${maxLength.toLocaleString()}자 이내로 작성해 주세요.`)
    }
    setCountFn(e.target.value.length);
  };

  return (
    <div className='modal_container'>
      <div className='modal_content add_modal'>
        <img src='/assets/images/main_logo.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <form id='notice_form' className='notice_form' onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor='notice_image'>이미지 : </label>
                <input
                  type='file'
                  name='file'
                  id='notice_image'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept='image/png, image/jpg, image/jpeg'
                />
                <div className='selected_file'>
                  <p>선택된 파일: {imageFile ? imageFile.name : '없음'}</p>
                  <button
                    type='button'
                    className='custom_file_button'
                    onClick={handleFileButtonClick}>
                    <SlCamera />
                  </button>
                </div>
              </li>
              <li>
                <label htmlFor='notice_title'>제목 : </label>
                <input type='text' name='title' id='notice_title'
                  placeholder={`title(${titleMaxLength}자 이내로 작성해 주세요.)`}
                  onChange={handleInput(titleMaxLength, setInputCountTitle)}
                  value={form.title} />
              </li>
              <li>
                <span>{inputCountTitle.toLocaleString()}</span>
                <span>/{titleMaxLength.toLocaleString()}자</span>
              </li>
              <li>
                <label htmlFor='ntoice_content'>내용 : </label>
                <textarea name='content' id='ntoice_content' form='notice_form' rows='10'
                  placeholder={`content(${contentMaxLength}자 이내로 작성해 주세요.)`}
                  onChange={handleInput(contentMaxLength, setInputCountContent)}
                  value={form.content}></textarea>
              </li>
              <li>
                <span>{inputCountContent.toLocaleString()}</span>
                <span>/{contentMaxLength.toLocaleString()}자</span>
              </li>
            </ul>
            <div className='btn_wrap'>
              <button type='button' className='close_btn'
                onClick={handleModal}>닫기</button>
              <button className='add_btn'>{btnText || '확인'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}