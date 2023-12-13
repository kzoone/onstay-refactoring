import React, { useState } from 'react';
import ReservationGuide from './roomguide/ReservationGuide';
import UseGuide from './roomguide/UseGuide';
import RefundGuide from './roomguide/RefundGuide';

export default function RoomGuide(pros) {
  const [ showContent, setShowContent ] = useState('reservation');
  
  const handleClickContent = (e) => {
    setShowContent(e.target.dataset.content);
  };

  return(
    <div className='guide'>
      <div className='room_guide_container'>
        <div className='title_wrap'>
          <p>안내사항</p>
          <p>숙소 이용에 대한 상세한 안내를 확인해 보세요</p>
        </div>
        <div className='info_wrap'>
          <div className='info_nav'>
            <button type='button' onClick={handleClickContent} data-content='reservation' className={showContent === 'reservation' ? 'active' : '' }>예약 안내</button>
            <button type='button' onClick={handleClickContent} data-content='use' className={showContent === 'use' ? 'active' : '' }>이용 안내</button>
            <button type='button' onClick={handleClickContent} data-content='refund' className={showContent === 'refund' ? 'active' : '' }>환불 규정</button>
          </div>
          { showContent === 'reservation' && <ReservationGuide roomContent={pros.roomContent} otherContent={pros.otherContent} /> }
          { showContent === 'use' && <UseGuide /> }
          { showContent === 'refund' && <RefundGuide /> }
        </div>
      </div>
    </div>
  );
}