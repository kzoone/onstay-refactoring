import { useRef, useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import ModalStar from './ModalStar';
import RegisterStar from './RegisterStar';

export default function ReviewModal() {
  const [ clickRating, setClickRating ] = useState(0);
  const fileInputRef = useRef(null);
  const [ contentText, setContentText ] = useState({content : ''});
  
  const handleClickRating = (value) => {
    setClickRating(value);
  }

  const handleClickFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  }

  const handleChangeText = (e) => {
    setContentText({...contentText, [e.target.name] : e.target.value})
  }

  return(
    <div className='bg_modal'>
      <div className='review_modal'>
        <div className='logo_wrap'>
          <img src='/assets/images/logo_white.png' alt='onstayhouse 로고 이미지' />
        </div>
        <form className='modal_form'>
          <div className="img_wrap">
            <label htmlFor='file'>File</label>
            <input 
              type='file' 
              id='file' 
              name='file' 
              accept='image/*'
              ref={fileInputRef} />
            <div className='icon_wrap'>
              <p>선택된 파일 : </p>
              <button
                type='button'
                className='file_icon_btn'
                onClick={handleClickFile} >
                <BsCameraFill />
              </button>
          </div>
          </div>
          <div className='star_container'>
            <p>Rating</p>
            <div className='star_content'>
              <RegisterStar setClickRating={setClickRating} 
                            handleClickRating={handleClickRating}/>
              <span>{clickRating}점</span>
            </div>
          </div>
          {/* <ModalStar setClickRating={setClickRating} /> */}
          <div className="content_wrap">
            <label htmlFor='content'>Content</label>
            <textarea 
              name='content' 
              id='content' 
              maxLength='500'
              onChange={handleChangeText}
              placeholder='500자 이하로 작성해주세요'/>
          </div>
          <div className='text_length'>
            <span>{contentText.content.length}/</span>
            <span>500</span>
          </div>
          <div className='btn_wrap'>
            <button className='close_btn' type='button'>닫기 ｘ</button>
            <button className='insert_btn'>등록 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}