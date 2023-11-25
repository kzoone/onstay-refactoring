import React, { useState } from 'react';

export default function CheckDate() {
  const [ input, setInput ] = useState({ checkin: '', checkout: ''})
  let dateString = '';

  const checkinDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
  
    return dateString = year + '-' + month  + '-' + day;
  }

  checkinDate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name] : value})
  }
  
  return(
    <div className='checkdate_container'>
      <div className='input_wrap'>
        <label htmlFor="checkin"></label>
        <input type='date' name='checkin' id='checkin' placeholder='체크인' min={dateString} className='checkin' onChange={handleChange} style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}/>
        <label htmlFor="checkout"></label>
        <input type='date' name='checkout' id='checkout' placeholder='체크아웃' className='checkout' onChange={handleChange} style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}/>
      </div>
      <button className='reservation_btn' state={{...input, 'room_name': '글림스'}}>예 약 하 기</button>
    </div>
  );
}