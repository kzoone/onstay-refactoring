import { useEffect, useRef, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import RegisterStar from '../../../roomdetail/reviewmodal/RegisterStar';
import axiosAuth from '../../../../services/axiosAuth';
import MyReviewImg from './MyReviewImg';
import { FaImages } from 'react-icons/fa';

export default function MyReviewModal({setReviewModal, reviewModalData, review_id, user_id}) {
  const fileInputRef = useRef(null); // 이미지 파일 아이콘 연결
  const [ imgFile, setImgFile ] = useState(null); // 이미지 파일 선택
  const [ clickRating, setClickRating ] = useState(reviewModalData.review_star); // 리뷰 별점 평점
  const [ imgData, setImgData ] = useState(reviewModalData.review_img); // 리뷰 선택 이미지
  const [ contentText, setContentText ] = useState({ content: reviewModalData.review_content }); // 리뷰 내용
  const [ isValidRegistration, setIsValidRegistration ] = useState(true); // form 유효성 통과 + 버튼의 비활성화
  const [ imgModal, setImgModal ] = useState(false); // 이전 리뷰 선택 이미지 미리보기 모달

  useEffect(() => {
    // 처음 undefined로 useState 초기 세팅 필요
    setContentText({ content: reviewModalData.review_content });
    setClickRating(reviewModalData.review_star);
    setImgData(reviewModalData.review_img);
  }, [reviewModalData.review_content, reviewModalData.review_star, reviewModalData.review_image]);

  // 리뷰 등록 form 유효성 + 버튼 활성화 체크
  const validRegistration = () => {
    if ( !imgFile && !imgData ) {
      return setIsValidRegistration(false);
    } else if (contentText.content.length < 50 || contentText.content.length > 500 ) {
      return setIsValidRegistration(false);
    } else if ( clickRating < 0 ) {
      return setIsValidRegistration(false);
    } else {
      return setIsValidRegistration(true);
    }
  }

  //리뷰 등록 form 유효성 + 버튼 활성화 체크 실행
  useEffect(() => {
    validRegistration();
  }, [clickRating, imgFile, contentText])

  // 버튼 수정 완료 클릭시 alert 알림창 추가 유효성 체크 진행
  const validateSubmit = () => {
    if ( !imgFile && !imgData ) {
      alert('이미지 파일을 선택해주세요');
      return setIsValidRegistration(false);
    } else if (contentText.content.length < 50 || contentText.content.length > 500 ) {
      alert('리뷰 내용은 50자 이상 500자 이하로 작성해주세요')
      return setIsValidRegistration(false);
    } else if ( clickRating < 0 ) {
      alert('별점을 선택해주세요');
      return setIsValidRegistration(false);
    } else {
      return setIsValidRegistration(true);
    }
  }

  // 이미지 파일 선택 핸들링
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  }

  // 이미지 파일 아이콘 클릭 핸들링
  const handleClickFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  }

  // 이미지 보기 아이콘 클릭 핸들링
  const handleClickImg = () => {
    setImgModal(true);
  }

  // 별 클릭 핸들링
  const handleClickRating = (value) => {
    setClickRating(value);
  }

  // content 입력 핸들링
  const handleChangeText = (e) => {
    setContentText({...contentText, [e.target.name] : e.target.value});
  }

  // 리뷰 수정 모달창 닫기 버튼 핸들링
  const handleClickClose = () => {
    setReviewModal(false);
  }

  // 리뷰 수정 모달창 수정 완료 버튼 핸들링 : ing
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    validateSubmit();
    if ( isValidRegistration ) {
      const isRegisterConfirm = window.confirm('등록하시겠습니까?');
      if ( isRegisterConfirm ) {
        // update 가능 : 리뷰 수정 진행 
        const formData = new FormData();
        formData.append('review_id', review_id);
        formData.append('room_id', reviewModalData.room_id);
        formData.append('user_id', user_id);
        imgFile ? formData.append('review_file', imgFile) : formData.append('review_img', imgData);
        formData.append('review_content', contentText.content);
        formData.append('review_star', clickRating);
        formData.append('checkin', reviewModalData.checkin);
        formData.append('checkout', reviewModalData.checkout);

        axiosAuth({
          // url : `http://localhost:8000/room/review/mypage/update`,
          method : 'post',
          data : formData
        })
        .then(result => {
          console.log(result);
          if(result.data === 'update ok') {
            alert('리뷰 수정이 완료되었습니다');
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
      } else {
        validateSubmit();
      }
    }
  }

  return(
    <div className='bg_modal'>
      <div className='review_modal'>
        <div className='logo_wrap'>
          <img src='/assets/images/logo_white.png' alt='onstayhouse 로고 이미지' />
        </div>
        <form className='modal_form'>
          <div className='date_wrap'>
            <label htmlFor='reservation_date'>Date</label>
              <input 
                id='reservation_date'
                value={`${reviewModalData.checkin?.toLocaleString().split('T')[0]} ~ ${reviewModalData.checkout?.toLocaleString().split('T')[0]}`} />
          </div>
          <div className="img_wrap">
            { imgModal && <MyReviewImg setImgModal={setImgModal} review_image={imgData} />}
            <label htmlFor='file'>File</label>
            <input 
              type='file' 
              id='file' 
              name='file' 
              accept='image/*'
              ref={fileInputRef}
              onChange={handleChangeFile} />
            <div className='icon_wrap'>
              {
                !imgFile
                ? <p className='icon_text'>사진 : 이전 리뷰 이미지 / 카메라 : 이미지 변경</p>
                : <p>선택된 파일 : {imgFile?.name}</p>
              }
              <div className='icon_box'>
                <button
                  type='button'
                  className='img_icon_btn'
                  onClick={handleClickImg}>
                  <FaImages />
                </button>
                <button
                  type='button'
                  className='file_icon_btn'
                  onClick={handleClickFile}>
                  <BsCameraFill />
                </button>
              </div>
            </div>
          </div>
          <div className='star_container'>
            <p>Rating</p>
            <div className='star_content'>
              <RegisterStar setClickRating={setClickRating} 
                            handleClickRating={handleClickRating} 
                            initialRating={clickRating} />
              <span>{clickRating}점</span>
            </div>
          </div>
          <div className="content_wrap">
            <label htmlFor='content'>Content</label>
            <textarea 
              name='content'
              id='content'
              maxLength='500'
              onChange={handleChangeText}
              value={contentText.content}
              placeholder='50자 이상 - 500자 이하로 작성해주세요'/>
          </div>
          <div className='text_length'>
            <span>{contentText.content?.length}/</span>
            <span>500</span>
          </div>
          <div className='btn_wrap'>
            <button className='close_btn' 
                    type='button'
                    onClick={handleClickClose}>닫기 ｘ</button>
            <button className='insert_btn'
                    disabled={!isValidRegistration}
                    onClick={handleSubmitRegister}>수정 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}