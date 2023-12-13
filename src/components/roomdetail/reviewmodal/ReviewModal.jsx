import { useState } from 'react';
import ModalStar from './ModalStar';
import RegisterStar from './RegisterStar';

export default function ReviewModal() {
  const [ clickRating, setClickRating ] = useState(0);
  
  const handleClickRating = (value) => {
    setClickRating(value);
  }

  return(
    <div className='review_modal'>
      <button className='close_btn'>닫기 ｘ</button>
      <form className='modal_form'>
        <div className="img_wrap">
          <label htmlFor='file'>이미지 :</label>
          <input type='file' id='file' name='file' accept='image/*'/>
        </div>
        <div className='star_container'>
          <p>나만의 별점 :</p>
          <RegisterStar setClickRating={setClickRating} 
                        handleClickRating={handleClickRating}/>
          <span>{clickRating}</span>
        </div>
        {/* <ModalStar setClickRating={setClickRating} /> */}
        <div className="content_wrap">
          <label htmlFor='content'>내용 :</label>
          <input type='text' name='content' id='content' />
        </div>
      </form>
    </div>
  );
}