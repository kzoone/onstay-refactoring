// AccAbout.js
import React, { useState } from 'react';
import ContentDisplay from './ContentDisplay';

const AccAbout = () => {
  const [selectedContent, setSelectedContent] = useState("예약 안내");

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className='about_whole_frame'>
      <div className='about_frame'>
        <div className='about_title'>
          <p>안내사항</p>
          <p>숙소이용에 대한 상세한 안내를 확인해 보세요</p>
        </div>
        <div className='about-section'>
          <div className='about_btn'>
            <div><button className={`reserve_btn ${selectedContent === "예약 안내" ? 'selected' : ''}`} onClick={() => handleButtonClick("예약 안내")}>예약 안내</button></div>
            <div><button className={`usage_btn ${selectedContent === "이용 안내" ? 'selected' : ''}`} onClick={() => handleButtonClick("이용 안내")}>이용 안내</button></div>
            <div><button className={`refund_btn ${selectedContent === "환불 규정" ? 'selected' : ''}`} onClick={() => handleButtonClick("환불 규정")}>환불 규정</button></div>
          </div>
          <div className='content_display'>
            <ContentDisplay selectedContent={selectedContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccAbout;
