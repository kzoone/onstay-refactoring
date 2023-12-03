import React from 'react';

export default function Agreement() {
  return(
    <div className='agreement_container'>
      <p>이용자 약관 동의</p>
      <div className='all_checkbox'>
        <input type='checkbox' id='all_check'/>
        <label htmlFor='all_check'>사용자 약관 전체 동의</label>
      </div>
      <div>
        <input type='checkbox' id='personal_check'/>
        <label htmlFor='personal_check'>개인정보 제 3자 제공 동의 (필수)</label>
      </div>
      <div>
        <input type='checkbox' id='minor_check'/>
        <label htmlFor='minor_check'>미성년자(청소년) 투숙 기준 동의 (필수)</label>
      </div>
      <div>
        <input type='checkbox' id='room_check'/>
        <label htmlFor='room_check'>환불규정에 대한 동의 (필수)</label>
      </div>
    </div>
  );
}