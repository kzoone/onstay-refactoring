import React from 'react';
import { MdOutlinePets } from 'react-icons/md';

export default function RservationGuide({roomContent, otherContent}) {
  return(
    <div className='guide_content_wrap reservation_guide'>
      <div className='content_box price'>
        <p className='title'>요금 기준</p>
        <div className='content'>
          <p>정확한 객실 요금은 일정 선택 후 확인하실 수 있습니다</p>
          <table>
            <thead>
              <tr>
                <th scope='col'>객실</th>
                <th scope='col'>인원 (기준/최대) </th>
                <th scope='col'>요금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{otherContent.room_name}</td>
                <td>인원({otherContent.min_capa}/{otherContent.max_capa})</td>
                <td>{otherContent.room_price ? `${otherContent.room_price.toLocaleString()}~` : '직접 문의'}</td>
              </tr>
              <tr>
                <td>{roomContent.room_name}</td>
                <td>인원({roomContent.min_capa}/{roomContent.max_capa})</td>
                <td>{otherContent.room_price ?  `${roomContent.room_price.toLocaleString()}~` : '직접 문의'}</td>
              </tr>
            </tbody>
          </table>
          <p>- 예약 접수 후 영업시간 기준 48시간 이내에 예약 가능 여부를 안내드립니다</p>
          <p>- 해당 날짜에 예약이 불가능할 경우 예약이 취소될 수 있으면 전액 환불됩니다</p>
          <p>- 최대인원을 초과하는 인원은 숙박이 불가합니다</p>
        </div>
      </div>
      <div className='content_box'>
        <p className='title'>반려 동물</p>
        {
          roomContent.pet
          ? <p className='info_text'>
              <MdOutlinePets />
            반려 동물 동반이 가능한 숙소입니다
            </p>
          : <p className='info_text'>반려 동물 동반이 불가능한 숙소입니다</p>
        }
      </div>
    </div>
  );

}