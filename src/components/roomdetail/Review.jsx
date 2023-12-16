import React, { useEffect, useState } from 'react';
import { TbRectangularPrismPlus } from 'react-icons/tb';
import PagiNation from 'react-js-pagination';
import axios from 'axios';
import ReviewStar from './ReviewStar';
import ReviewModal from './reviewmodal/ReviewModal';
import useUserInfo from '../../util/useUserInfo';

export default function Review({roomid}) {
  const [ reviewData, setReviewData ] = useState([]);
  const [ registerData, setRegisterData ] = useState([]);
  const [ reviewModal, setReviewModal ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const userInfo = useUserInfo();
  const userid = userInfo.user_id;

  useEffect(() => {
    // 페이지네이션 요청할 리뷰 리스트 요청 : 작성일 최신순
    axios.get(`http://localhost:8000/room/review/${roomid}/${currentPage}`)
    .then(result => {
        setReviewData(result.data);
    })
    .catch(error => console.log(error));

    // 리뷰 가능 여부 요청
    axios.get(`http://localhost:8000/room/${roomid}/${userid}`)
    .then(result => {
      if (result.data.message === '일치하는 예약 정보가 없습니다') {
        setRegisterData([]);
      } else {
        setRegisterData(result.data);
      }
    })
    .catch(error => console.log(error));
  }, [roomid, userid, currentPage]);


  // 리뷰 등록하기 버튼 클릭 핸들링
  const handleClickRegister = () => {
    setReviewModal(true);
  };

  // 페이지네이션 페이지 클릭 핸들링
  const handlePageChange = (pageClickNum) => {
    setCurrentPage(pageClickNum);
  }

  // 등록된 예약 내역이 있을 경우 보여지는 화면
  const reviewContainer = (
    <div className='review_container'>
      { ( registerData.length > 0 && userid ) ?
        <div className='register_wrap'>
          <div className='btn_wrap'>
            <TbRectangularPrismPlus />
            <button className='register_btn'
                    type='button'
                    onClick={handleClickRegister}>등록하기</button>
          </div>
          { reviewModal && <ReviewModal
                              userid={userid}
                              roomid={roomid}
                              setReviewModal={setReviewModal}
                              registerData={registerData} /> }
        </div>
        : null
      }
      <div className='review_wrap'>
        { reviewData.map(review => (
          <React.Fragment key={review.review_id}>
            <div className='review_content'>
              <img src={`http://localhost:8000/getimg/reviewimg/${review.review_img}`} alt='숙소 리뷰 이미지' />
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
    </div>
  );

  // 등록된 예약 내역이 없을 경우 보여지는 화면
  const emptyReview = (
    <div className='review_container'>
      <div className='content_wrap'>
        <img src='/assets/images/logo_gray.png' alt='onstayhouse 로고 이미지' />
        <p>등록된 리뷰가 없습니다.</p>
        <p>숙소 이용 후 리뷰를 남겨보세요 :)</p>
      </div>
    </div>
  );

  return reviewData.length > 0 ? reviewContainer : emptyReview;
}


