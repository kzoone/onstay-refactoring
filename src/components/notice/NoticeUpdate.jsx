import { useRef, useState } from "react";
import axiosAuth from "../../services/axiosAuth";
import { SlCamera } from 'react-icons/sl';
import NoticeImgModal from './NoticeImgModal';

export default function NoticeUpdate(props) {
  const { btnText, setUpdateModal, notice_title, notice_content, notice_img, notice_id } = props;
  const titleMaxLength = 100;
  const contentMaxLength = 2000;
  const [form, setForm] = useState({ id: '', title: notice_title, content: notice_content });
  const tittleInputLength = form.title.length.toLocaleString();
  const contentInputLength = form.content.length.toLocaleString();
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [inputCountTitle, setInputCountTitle] = useState(tittleInputLength);
  const [inputCountContent, setInputCountContent] = useState(contentInputLength);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [imgModal, setImgModal] = useState(false);

  const openImgModal = () => setImgModal(true);

  const handelModal = (e) => {
    setUpdateModal(false);
  };

  const handleSubmit = (e) => {
    const updateConfirm =  window.confirm('등록하시겠습니까?');
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', notice_id);
    formData.append('file', imageFile);
    formData.append('title', form['title']);
    formData.append('content', form['content']);

    if(updateConfirm) {
      axiosAuth.post(`http://localhost:8000/notice/update/`, formData)
        .then(result => {
          if (result.data === 'ok') {
            alert('공지사항 수정이 완료되었습니다.');
            window.location.reload();
          }
        }).catch(error => console.log(error));
    };

    setUpdateModal(false);
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
      alert(`${maxLength.toLocaleString()}자 이내로 작성해 주세요.`)
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setCountFn(e.target.value.length);
  };

  const handleUpdateClick = () => {
    setIsEditMode(true);
  }

  return (
    <div className='modal_container'>
      <div className='modal_content update_modal'>
        <img src='/assets/images/main_logo.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <form id='notice_form' className='notice_form' onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor='notice_image'>이미지 : </label>
                {/* {
                ) : ( */}
                    <input type='file'
                      name='file'
                      id='notice_image'
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                      accept='image/png, image/jpg, image/jpeg' />
                    <div className='selected_file'>
                      {!isEditMode ?
                        <p>카메라 버튼을 눌러보면 확인 가능합니다.</p>
                        : <p>선택된 파일: {imageFile ? imageFile.name : '없음'}</p>}
                      {!isEditMode ? <button type="button" onClick={openImgModal}><SlCamera /></button>
                        : <button
                          type='button'
                          className='custom_file_button'
                          onClick={handleFileButtonClick}>
                          <SlCamera />
                        </button>}
                        {imgModal && <NoticeImgModal setImgModal={setImgModal} notice_img={notice_img} />}
                    </div>
              </li>
              <li>
                <label htmlFor='notice_title'>제목 : </label>
                <input type='text' name='title' id='notice_title' disabled={!isEditMode}
                  placeholder={`title(${titleMaxLength}자 이내로 작성해 주세요.)`}
                  onChange={handleInput(titleMaxLength, setInputCountTitle)}
                  value={form.title}
                />
              </li>
              <li>
                <span>{inputCountTitle.toLocaleString()}</span>
                <span>/{titleMaxLength.toLocaleString()}자</span>
              </li>
              <li>
                <label htmlFor='ntoice_content'>내용 : </label>
                <textarea name='content' id='ntoice_content' form='notice_form' rows='10'
                  placeholder={`content(${contentMaxLength}자 이내로 작성해 주세요.)`}
                  disabled={!isEditMode}
                  onChange={handleInput(contentMaxLength, setInputCountContent)}
                  value={form.content}></textarea>
              </li>
              <li>
                <span>{inputCountContent.toLocaleString()}</span>
                <span>/{contentMaxLength.toLocaleString()}자</span>
              </li>
            </ul>
            <div className='btn_wrap'>
              {!isEditMode ? <button type='button' className='close_btn' onClick={handelModal}>닫기</button>
                : <button className='update_btn'>등록</button>}
              {!isEditMode ? <button type="button" onClick={handleUpdateClick}>{btnText || '확인'}</button> 
              : <button type='button' className='close_btn' onClick={handelModal}>닫기</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}