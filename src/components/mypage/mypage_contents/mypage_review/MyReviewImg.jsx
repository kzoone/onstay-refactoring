import React from 'react';

export default function MyReviewImg({review_image, setImgModal}) {

  // 닫기 버튼 핸들링
  const handleModalClose = () => {
    setImgModal(false);
  }

  return(
    <div className='img_modal_container'>
      <div className='modal_content'>
        { <img src={`http://localhost:8000/getimg/reviewimg/${review_image}`} alt='리뷰 이미지' /> }
        <div className='btn_wrap'>
          <button
              type='button'
              className='img_modal_close_btn'
              onClick={handleModalClose}
            >닫기</button>
        </div>
      </div>
    </div>
  );
}