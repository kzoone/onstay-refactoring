import React, { useEffect, useState } from 'react';
import { TbRectangularPrismPlus } from 'react-icons/tb';
import { TbMoodHeart, TbMoodEdit } from 'react-icons/tb';
import PagiNation from 'react-js-pagination';
import axios from 'axios';
import ReviewStar from './ReviewStar';
import ReviewModal from './reviewmodal/ReviewModal';
import getImgPath from '../../util/getImgPath';

export default function Review({roomid, user_id}) {
  const [ reviewData, setReviewData ] = useState([]);
  const [ registerData, setRegisterData ] = useState([]);
  const [ reviewModal, setReviewModal ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(() => {
    // 페이지네이션 요청할 리뷰 리스트 요청 : 작성일 최신순
    axios.get(`http://localhost:8000/room/review/${roomid}/${currentPage}`)
    .then(result => {
        setReviewData(result.data);
    })
    .catch(error => console.log(error));

    // 리뷰 가능 여부 요청
    if (user_id) {
      axios.get(`http://localhost:8000/room/${roomid}/${user_id}`)
      .then(result => {
        if (result.data.message === '일치하는 예약 정보가 없습니다') {
          setRegisterData([]);
        } else {
          setRegisterData(result.data);
        }
      })
      .catch(error => console.log(error));
    }
  }, [roomid, user_id, currentPage]);

  // 페이지네이션 페이지 클릭 핸들링
  const handlePageChange = (pageClickNum) => {
    setCurrentPage(pageClickNum);
  }

  // 리뷰 등록하기 버튼 클릭 핸들링
  const handleClickRegister = () => {
    setReviewModal(true);
  };

  // 등록된 예약 내역이 있을 경우 보여지는 화면
  const reviewContainer = (
    <div className='review_container'>
      <div className='total_review_register'>
    { ( registerData.length > 0 && user_id ) ?
      <div className='register_wrap'>
        <div className='btn_wrap'>
          <TbRectangularPrismPlus />
          <button className='register_btn'
                  type='button'
                  onClick={handleClickRegister}>등록하기</button>
        </div>
      </div>
      : null
      }
        <div className='total_review_info'>
          <div className='total_review_inner'>
            <div className='avg_wrap'>
            <TbMoodHeart />
              <p className='avg_text'>리뷰 평점</p>
              <ReviewStar rating={reviewData[0]?.avg_star} />
              <p className='total_avg'>{reviewData[0]?.avg_star}</p>
            </div>
            <span>﹒</span>
            <div className='cnt_wrap'>
              <TbMoodEdit />
              <p className='cnt_text'>총 리뷰</p>
              <p className='total_cnt'>{reviewData[0]?.total_cnt}개</p>
            </div>
          </div>
        </div>
      </div>

      <div className='review_wrap'>
        { reviewData.map(review => (
          <React.Fragment key={review.review_id}>
            <div className='review_content'>
              <div className='review_img'>
                <img src={getImgPath.review(review.review_img)} alt='숙소 리뷰 이미지' />
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
          </React.Fragment>
          ))
        }
      </div>
      <PagiNation
        activePage={currentPage}
        itemsCountPerPage={4}
        totalItemsCount={reviewData.length > 0 ? reviewData[0].total_cnt : 0}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText='<'
        nextPageText='>'
      />
    { reviewModal && <ReviewModal
                  user_id={user_id}
                  roomid={roomid}
                  setReviewModal={setReviewModal}
                  registerData={registerData} /> }
    </div>
  );

  // 등록된 예약 내역이 없을 경우 보여지는 화면
  const emptyReview = (
    <div className='review_container empty'>
      { ( registerData.length > 0 && user_id ) ?
        <div className='register_wrap empty'>
          <div className='btn_wrap'>
            <TbRectangularPrismPlus />
            <button className='register_btn'
                    type='button'
                    onClick={handleClickRegister}>등록하기</button>
          </div>
        </div>
        : null
      }
      <div className='content_wrap'>
        <img src='/assets/images/logo_gray.png' alt='onstayhouse 로고 이미지' />
        <p>등록된 리뷰가 없습니다.</p>
        <p>숙소 이용 후 리뷰를 남겨보세요 :)</p>
      </div>
      { reviewModal && <ReviewModal
                              user_id={user_id}
                              roomid={roomid}
                              setReviewModal={setReviewModal}
                              registerData={registerData} /> }
    </div>
  );

  return reviewData.length > 0 ? reviewContainer : emptyReview;
}


