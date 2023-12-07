import React from 'react';

export default function RefundGuide() {
  return(
    <div className='guide_content_wrap refund_guide'>
      <div className='content_box price'>
        <p className='title'>환불 규정</p>
        <div className='content'>
          <p>정확한 객실 요금은 일정 선택 후 확인하실 수 있습니다</p>
          <table>
            <thead>
              <tr>
                <th scope='col'>기준일</th>
                <th scope='col'>환불 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이용 4일전까지</td>
                <td>총 결제금액의 100% 환불</td>
              </tr>
              <tr>
                <td>이용 3일전까지</td>
                <td>총 결제금액의 50% 환불</td>
              </tr>
              <tr>
                <td>이용 2일전까지</td>
                <td>변경 / 환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='content_box'>
        <p className='title'>숙박권 양도</p>
        <p className='info_text'>숙박권의 재판매를 비롯하여 양도, 양수, 교환을 금지합니다</p>
      </div>
    </div>
  );
}