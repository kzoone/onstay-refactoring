// ReservationInfo.js
import React from 'react';
import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const ReservationInfo = () => {
  const [reserveInfo, setReserveInfo] = useState([]);
  const {accid} =useParams();

  useEffect(()=>{
    axios
    .get(`http://localhost:8000/findstay/acc/${accid}/reserve`)
    .then((result) =>{
      setReserveInfo(result.data)
    })
    .catch((error) => console.log(error));
  },[accid]);
  
  return (
    <div>
      <div className='content_title'>예약 안내</div>
      <div className='content_explain'>
        <div className='content_subtitle'>요금기준</div>
        <div className='content_subcontent'>
          <div className='content_comment'>정확한 객실 요금은 일정 선택 후 확인할 수 있습니다.</div>
          <table className='content_table'>
            <thead className='content_thead'>
              <tr className='content_tr'>
                <th className='content_th'>객실</th>
                <th>인원(기준/최대)</th>
                <th>요금</th>
              </tr>
            </thead>
            <tbody>
            {reserveInfo.map((info) => (
            <tr key={info.room_name}>
              <td>{info.room_name}</td>
              <td>{info.min_capa} / {info.max_capa}</td>
              <td>{info.room_price}~</td>
            </tr>
            ))}
            </tbody>
          </table>
          <ul>
            <li className='content_comment'>기준 인원은 {reserveInfo.length > 0 && reserveInfo[0].min_capa}명이며, 최대인원 {reserveInfo.length > 1 && reserveInfo[1].max_capa}인까지 이용 가능한 숙소입니다.</li>
            <li className='content_comment'>인원 추가시 1인당 5만원의 추가 요금이 발생합니다.</li>
          </ul>
        </div>
      </div>
      <div className='content_explain'>
        <div className='content_subtitle'>문의하기</div>
        <div className='content_subcontent'>
          <ul>
            <li className='content_comment'>예약과 이용 문의 {reserveInfo.length > 0 && reserveInfo[0].tel}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;