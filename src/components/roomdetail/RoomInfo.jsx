import React from 'react';

export default function RoomInfo(props) {
  return(
    <div className='room_info_container'>
      <div className='info_top_wrap'>
        <p className='info_title'>ROOM INFORMAION</p>
        <p className='room_name'>{props.data.room_name}</p>
        <span className='line'>-</span>
        <p className='acc_summary'>{props.data.acc_summary1}</p>
      </div>
      <div className='info_bottom_wrap'>
        <p className='time'>
          <span>체크인 {props.data.acc_checkin} / </span>
          <span>체크아웃 {props.data.acc_checkout}</span>
        </p>
        <p className='capa'>
          <span className='min_capa'>기준인원 {props.data.min_capa}명</span>
          <span className='max_capa'>( 최대인원 {props.data.max_capa}명 )</span>
        </p>
      </div>
    </div>
  );
}