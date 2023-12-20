import { useEffect, useRef, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import axiosAuth from '../../../services/axiosAuth';
import RegisterStar from './RegisterStar';
import ConfirmModal from '../../common/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function ReviewModal(props) {
  const [ selectedDate, setSelectedDate ] = useState(`${props.registerData[0].checkin},${props.registerData[0].checkout}`) // 리뷰 등록 숙소 이용일 선택
  const [ clickRating, setClickRating ] = useState(0); // 별점 평점
  const fileInputRef = useRef(null); // 이미지 파일 아이콘 연결
  const [ imgFile, setImgFile ] = useState(null); // 이미지 파일 선택
  const [ contentText, setContentText ] = useState({content : ''}); // 입력한 리뷰
  const [ isValidRegistration, setIsValidRegistration ] = useState(false); // form 유효성 통과 + 버튼의 비활성화
  const [ isCreateModal, setIsCreateModal ] = useState(false); // 등록 최종 확인 모달
  const [ isCompleteModal, setIsCompleteModal ] = useState(false); // 등록 완료 알림 모달
  const navigate = useNavigate();


  // 리뷰 등록 form 유효성 + 버튼 활성화 체크
  const validRegistration = () => {
    if ( !imgFile ) {
      return setIsValidRegistration(false);
    } else if (contentText.content.length < 50 || contentText.content.length > 500 ) {
      return setIsValidRegistration(false);
    } else if ( clickRating < 0 ) {
      return setIsValidRegistration(false);
    } else {
      return setIsValidRegistration(true);
    }
  }

  // 리뷰 등록 form 유효성 + 버튼 활성화 체크 실행
  useEffect(() => {
    validRegistration();
  }, [clickRating, imgFile, contentText])

  // 버튼 등록 완료 클릭시 alert 알림창 추가 유효성 체크 진행
  const validateSubmit = () => {
    if ( !imgFile ) {
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

  // 리뷰 등록 날짜 핸들링
  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
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

  // 별 클릭 핸들링
  const handleClickRating = (value) => {
    setClickRating(value);
  }

  // content 입력 핸들링
  const handleChangeText = (e) => {
    setContentText({...contentText, [e.target.name] : e.target.value});
  }

  // 리뷰 등록 모달창 닫기 버튼 핸들링
  const handleClickClose = () => {
    props.setReviewModal(false);
  }

  // 리뷰 등록 모달창 등록 완료 버튼 핸들링
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    validateSubmit();
    if ( isValidRegistration ) {
      setIsCreateModal(true);
    }
  }

  // 리뷰 등록 확인 모달창 닫기 버튼
  const handleCreateModal = (e) => {
    setIsCreateModal(false);
  }

  // 리뷰 등록 확인 모달창 확인 버튼 insert
  const handleCreateConfirm = (e) => {
    // insert 가능 : 리뷰 등록 진행 
    const formData = new FormData();
    const selectdDateArr = selectedDate.split(',');
    formData.append('user_id', props.user_id);
    formData.append('room_id', props.roomid);
    formData.append('review_img', imgFile);
    formData.append('review_content', contentText.content);
    formData.append('review_star', clickRating);
    formData.append('checkin', selectdDateArr[0]);
    formData.append('checkout', selectdDateArr[1]);

    axiosAuth({
      url : `${apiBaseUrl}/room/review`,
      method : 'post',
      data : formData
    })
    .then(result => {
      if(result.data === 'insert ok') {
        setIsCompleteModal(true);
      }
    })
    .catch(error => console.log(error));
  }

  // 예약 완료 알림 모달창 닫기 버튼 클릭
  const handleCompleteModal = (e) => {
    navigate('/');
  }
  
  // 예약 완료 알림 모달창 확인 버튼 클릭
  const handleCompleteConfirm = (e) => {
    navigate('/mypage?showContent=MyReview');
  }

  return(
    <>
      <div className='bg_modal'>
        <div className='review_modal'>
          <div className='logo_wrap'>
            <img src='/assets/images/logo_white.png' alt='onstayhouse 로고 이미지' />
          </div>
          <form className='modal_form'>
            <div className='date_wrap'>
              <label htmlFor='reservation_date'>Date</label>
              <select 
                name='reservation_date' 
                id='reservation_date'
                value={selectedDate}
                onChange={handleChangeDate} >
              {props.registerData.map(list => 
                <option value={`${list.checkin}, ${list.checkout}`} key={list.checkout}>
                { list.remaining_days
                  ? (`${list.checkin} ~ ${list.checkout} ( D -${list.remaining_days}일 )`)
                  : (`${list.checkin} ~ ${list.checkout} ( D - DAY )`) }
                </option>
              )}
              </select>
            </div>
            <div className="img_wrap">
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
                  imgFile 
                  ? <p>선택된 파일 : {imgFile.name}</p>
                  : <p className='icon_text'>카메라 아이콘을 눌러 사진을 선택해주세요</p>
                }
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
                placeholder='50자 이상 - 500자 이하로 작성해주세요'/>
            </div>
            <div className='text_length'>
              <span>{contentText.content.length}/</span>
              <span>500</span>
            </div>
            <div className='btn_wrap'>
              <button className='close_btn' 
                      type='button'
                      onClick={handleClickClose}>닫기 ｘ</button>
              <button className='insert_btn'
                      disabled={!isValidRegistration}
                      onClick={handleSubmitRegister}>등록 완료</button>
            </div>
          </form>
        </div>
      </div>
      {
        isCreateModal &&
        <ConfirmModal 
              handleModal={handleCreateModal} 
              handleConfirm={handleCreateConfirm} 
              noti_1='작성한 리뷰를'
              noti_2='등록하시겠습니까?'
              btnText='등록하기' />
      }
      {
        isCompleteModal &&
        <ConfirmModal 
              handleModal={handleCompleteModal} 
              handleConfirm={handleCompleteConfirm} 
              noti_1='작성한 리뷰가 등록 완료 되었습니다!'
              noti_2='마이페이지 리뷰관리로 이동하시겠습니까?' />
      }
    </>
  );
}