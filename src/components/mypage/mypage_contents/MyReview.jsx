import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiFileEditLine, RiFileCloseLine } from 'react-icons/ri';
import axios from 'axios';
import PagiNation from 'react-js-pagination';
import ReviewStar from '../../roomdetail/ReviewStar';
import MyReviewModal from './mypage_review/MyReviewModal';
import axiosAuth from '../../../services/axiosAuth';
import ConfirmModal from '../../common/ConfirmModal';

export default function MyReview({user_id}) {
  const [ reviewData, setRivewData ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ reviewModal, setReviewModal ] = useState(false); // 수정 눌렀을 때 form 모달
  const [ reviewModalData, setReviewModalData ] = useState({}); // 해당하는 리뷰 모달 입력 데이터
  const [ isDeleteModal, setIsDeleteModal ] = useState(false); // 삭제하기 확인 모달
  const [ isCompleteModal, setIsCompleteModal] = useState(false); // 삭제 완료 알림 모달
  const [ reviewId, setReviewId ] = useState(''); // 삭제할 review id
  const navigate = useNavigate();

  // 회원이 작성한 리뷰 리스트 조회
  useEffect(() => {
    axios.get(`http://localhost:8000/mypage/review/${user_id}/${currentPage}`)
    .then(result => {
      setRivewData(result.data);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
    .catch(error => console.log(error));
  }, [user_id, currentPage]);


  // 수정하기 버튼 핸들링
  const handleClickUpdate = (review_id) => {
    // 해당하는 리뷰 조회 ( 모달 )
    axiosAuth.get(`http://localhost:8000/mypage/review/${review_id}`)
    .then(result => {
      setReviewModalData(result.data);
    })
    .catch(error => console.log(error));
    setReviewModal(true);
  };

  // 삭제하기 버튼 핸들링
  const handleClickDelete = (review_id) => {
    setIsDeleteModal(true);
    setReviewId(review_id);
  };

  // 페이지네이션 버튼 핸들링
  const handlePageChange = (pageClickNum) => {
    setCurrentPage(pageClickNum);
  };

  // 삭제 확인 모달창 닫기 버튼
  const handleDeleteModal = () => {
    setIsDeleteModal(false);
  }

  // 삭제 확인 모달창 삭제 버튼 : delete
  const handleDeleteConfirm = () => {
    axiosAuth({
      url : 'http://localhost:8000/mypage/review/delete',
      method : 'delete',
      data : {user_id, review_id : reviewId}
    })
    .then(result => {
      if(result.data === 'delete ok') {
        setIsCompleteModal(true);
      }
    })
    .catch(error => console.log(error));
  }

  // 삭제 완료 알림 모달창 : 닫기 
  const handleCompleteModal = () => {
    window.location.reload();
  }

  // 삭제 완료 알림 모달창 : 홈으로
  const handleCompleteConfirm = () => {
    navigate('/');
  }

  // 작성한 리뷰가 있을 경우 화면
  const reviewContainer = (
    <>
      <div className='review_container'>
        <p>| 작성한 리뷰</p>
        <div className='review_wrap'>
        { reviewData.length > 0 &&
            reviewData.map(review => (
              <React.Fragment key={review.review_id}>
                <div className='review_inner'>
                  <div className='btn_wrap'>
                    <button 
                        className='update_btn'
                        type='button'
                        onClick={() => handleClickUpdate(review.review_id)}>
                        <RiFileEditLine /> 수정
                    </button>
                    { reviewModal &&
                      <MyReviewModal 
                        setReviewModal={setReviewModal} 
                        reviewModalData={reviewModalData}
                        user_id={user_id} />
                    }
                    <button 
                        className='delete_btn'
                        type='button'
                        onClick={() => handleClickDelete(review.review_id)}>
                        <RiFileCloseLine />삭제</button>
                  </div>
                  <div className='review_content'>
                    <div className='review_img'>
                      <img src={`http://localhost:8000/getimg/reviewimg/${review.review_img}`} alt='숙소 리뷰 이미지' />
                    </div>
                    <div className='star_info'>
                      <ReviewStar rating={review.review_star} />
                      <span>{review.review_star}</span>
                    </div>
                    <div className='review_info'>
                      <p>{review.user_name}</p>
                      <p>{review.register_date?.slice(0,10)}</p>
                    </div>
                    <p className='review_text'>
                      {review.review_content}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))
        }
        </div>
        <PagiNation
          activePage={currentPage}
          itemsCountPerPage={2}
          totalItemsCount={reviewData.length > 0 ? reviewData[0].total_cnt : 0}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText='<'
          nextPageText='>'
        />
      </div>
      {
        isDeleteModal &&
          <ConfirmModal 
              handleModal={handleDeleteModal} 
              handleConfirm={handleDeleteConfirm} 
              noti_1='선택한 리뷰를' 
              noti_2='삭제하시겠습니까?'
              btnText='삭제하기' />
      }
      {
        isCompleteModal &&
          <ConfirmModal 
              handleModal={handleCompleteModal} 
              handleConfirm={handleCompleteConfirm} 
              noti_1='선택한 리뷰가' 
              noti_2='삭제되었습니다'
              btnText='홈으로' />
      }
    </>
  )

  // 작성한 리뷰가 없을 경우 화면
  const emptyReview = (
    <div className='empty_review_container'>
      <div className='content_wrap'>
        <img src='/assets/images/logo_gray.png' alt='onstayhouse 로고 이미지' />
        <p>등록된 리뷰가 없습니다.</p>
        <p>숙소 이용 후 리뷰를 남겨보세요 :)</p>
      </div>
    </div>
  );

  return reviewData.length > 0 ? reviewContainer : emptyReview;
}