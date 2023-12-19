import React from 'react';
import ContentWrap from './ContentWrap';
import RoomInfo from './RoomInfo';
import RoomSwiper from './RoomSwiper';
import ReservationDate from './ReservationDate';
import AdditionalList from './AdditionalList';
import OtherRoom from './OtherRoom';
import RoomGuide from './RoomGuide';
import Review from './Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useUserInfo from '../../util/useUserInfo';


export default function RoomContent() {
  const [ roomContent, setRoomContent ] = useState({});
  const [ otherContent, setOtherContent ] = useState({});
  const [ showContent, setShowContent ] = useState('review');
  let { roomid } = useParams();
  const userInfo = useUserInfo();
  const user_id = userInfo.user_id;

  // 객실 정보 리스트 조회
  useEffect(() => {
    setShowContent('review');
    axios.get(`http://localhost:8000/room/${roomid}`)
      .then(result => {
        if(result.data[0].room_id === roomid) {
          setRoomContent(result.data[0]);
          setOtherContent(result.data[1]);
        } else {
          setRoomContent(result.data[1]);
          setOtherContent(result.data[0]);
        }
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      })
      .catch(error => console.log(error));
  }, [roomid]);
  
  // review, other room 클릭 핸들링
  const handleClickContent = (e) => {
    setShowContent(e.target.dataset.content);
  }

  return(
    <ContentWrap>
      <div className="content_wrap">
          <p className='acc_name'>{roomContent.acc_name}</p>
          <div className='content_container'>
            <RoomInfo data={roomContent} />
            <div className='room_swiper_container'>
            <RoomSwiper img1={roomContent.room_img1} img2={roomContent.room_img2} img3={roomContent.room_img3} name={roomContent.room_name} acc={roomContent.acc_name} />
            <ReservationDate roomid={roomid} price={roomContent.room_price} user_id={user_id} />
            </div>
          </div>
          <AdditionalList featureCodes={roomContent.feature_codes} amenities={roomContent.amenities} />
          <div className='btn_content_container'>
            <div className='container_content'>
              <div className='btn_title'>
                <button type='button' data-content='review' onClick={handleClickContent} className={showContent === 'review'? 'active' : ''}>REVIEW</button>
                <button type='button' data-content='other' onClick={handleClickContent} className={showContent === 'other'? 'active' : ''}>OTHER  ROOM</button>
              </div>
              { showContent === 'review' && <Review roomid={roomid} user_id={user_id} /> }
              { showContent === 'other' && <OtherRoom data={otherContent} /> }
              </div>
          </div>
      </div>
      <RoomGuide roomContent={roomContent} otherContent={otherContent} />
    </ContentWrap>
  );
}