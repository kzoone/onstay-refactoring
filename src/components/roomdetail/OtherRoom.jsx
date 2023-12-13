import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherRoom({data}) {
  return(
    <>
    <div className='other_room_container'>
      <Link to={`/findstay/room/${data.room_id}`}>
        { data.room_id && <img src={`/assets/images/room/${data.room_img1}`} alt={`${data.acc_name}의 ${data.room_name} 이미지`} />  }
      </Link>
      <p className='room_name'>{data.room_name}</p>
      <p className='max_capa'>{`최대 인원 (${data.max_capa}명)`}</p>
    </div>
    </>
  );
}