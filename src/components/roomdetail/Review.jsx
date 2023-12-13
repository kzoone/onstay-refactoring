import React, { useEffect, useState } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import axios from 'axios';
import ReviewStar from './ReviewStar';
import ReviewModal from './reviewmodal/ReviewModal';
import useUserInfo from '../../util/useUserInfo';

export default function Review({roomid}) {
  const [ reviewData, setReviewData ] = useState([]);
  const [ reservationCnt, setReservationCnt ] = useState([]);
  const [ reviewModal, setReviewModal ] = useState(false);
  const userInfo = useUserInfo();
  const userid = userInfo.user_id;

  useEffect(() => {
    // 객실에 해당하는 리뷰 리스트 조회
    axios.get(`http://localhost:8000/room/review/${roomid}`)
    .then(result => {
      setReviewData(result.data);
    })
    .catch(error => console.log(error));

    // 예약 리스트에 회원 && 객실 리스트 조회
    axios.get(`http://localhost:8000/room/${roomid}/${userid}`)
    .then(result => {
      setReservationCnt(result.data.cnt);
    })
    .catch(error => console.log(error));
  }, [roomid, userid]);
  

  // 리뷰 내역에서 해당하는 아이디가 있는지 체크 : some으로 고칠지 고민 중
  const matchReview = reviewData.find(review => review.user_id === userInfo.user_id);

  const handleClickRegister = () => {
    setReviewModal(true);
  };

  return(
    <div className='review_container'>
      { (reservationCnt && matchReview && userid) ? // 등록하기 나오도록 테스트용
      // { (reservationCnt && !matchReview && userid ) ?
        <div className='register_wrap'>
          <div className='btn_wrap'>
            <FaFileCirclePlus />
            <button className='register_btn' onClick={handleClickRegister}>등록하기</button>
          </div>
          { reviewModal && <ReviewModal /> }
        </div>
        : null
      }
      <div className='review_wrap'>
        { reviewData.map(review => (
          <React.Fragment key={review.review_id}>
            <div className='review_content'>
              <img src={`/assets/images/room/${review.review_img}`} alt='숙소 이미지' />
              <div className='star_info'>
                <ReviewStar rating={review.review_star}/>
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
    </div>
  );
}



