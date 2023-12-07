// AccAbout.js
import React, { useState } from 'react';
import ContentDisplay from './ContentDisplay';

const AccAbout = () => {
  const [selectedContent, setSelectedContent] = useState("예약 안내");

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className='about_frame'>
      <div className='about-section'>
          <div className='about_btn'>
            <div><button className='reserve_btn' onClick={() => handleButtonClick("예약 안내")}>예약 안내</button></div>
            <div><button className='usage_btn' onClick={() => handleButtonClick("이용 안내")}>이용 안내</button></div>
            <div><button className='refund_btn' onClick={() => handleButtonClick("환불 규정")}>환불 규정</button></div>
          </div>
          <div className='content_display'>
            <ContentDisplay selectedContent={selectedContent} />
          </div>
        </div>
    </div>
  );
};

export default AccAbout;

