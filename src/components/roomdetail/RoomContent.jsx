import React from 'react';
import ContentWrap from './ContentWrap';
import RoomInfo from './RoomInfo';
import RoomSwiper from './RoomSwiper';
import ReservationDate from './ReservationDate';
import AdditionalList from './AdditionalList';
import OtherRoom from './OtherRoom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RoomContent() {
  const [ roomContent, setRoomContent ] = useState({});
  const [ otherContent, setOtherContent ] = useState({});
  let { roomid } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/room/${roomid}`)
    .then(result => {
      if(result.data[0].room_id === roomid) {
        setRoomContent(result.data[0]);
        setOtherContent(result.data[1]);
      } else {
        setRoomContent(result.data[1]);
        setOtherContent(result.data[0]);
      }
    })
    .catch(error => console.log(error));
  }, [roomid])
  

  return(
    <ContentWrap>
      <p className='acc_name'>{roomContent.acc_name}</p>
      <div className='content_container'>
        <RoomInfo data={roomContent}/>
        <div className='room_swiper_container'>
        <RoomSwiper img1={roomContent.room_img1} img2={roomContent.room_img2} img3={roomContent.room_img3} name={roomContent.room_name} acc={roomContent.acc_name} />
        <ReservationDate param={roomid} price={roomContent.room_price}/>
        </div>
      </div>
      <AdditionalList featureCodes={roomContent.feature_codes} amenities={roomContent.amenities}/>
      <OtherRoom data={otherContent} />
    </ContentWrap>
  );
}