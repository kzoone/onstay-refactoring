// RefundPolicy.js
import React from 'react';

const RefundPolicy = () => {
  return (
    <div>
      <div className='content_title'>환불 규정</div>
      <div className='content_explain'>
        <div className='content_subtitle'>환불 규정</div>
        <div className='content_subcontent'>
          <table className='content_table'>
            <thead className='content_thead'>
              <tr className='content_tr'>
                <th className='content_th'>이용 10일 전까지</th>
                <th>총 결제금액의 100% 환불</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이용 9일 전까지</td>
                <td>총 결제금액의 90% 환불</td>
              </tr>
              <tr>
                <td>이용 8일 전까지</td>
                <td>총 결제금액의 80% 환불</td>
              </tr>
              <tr>
                <td>이용 7일 전까지</td>
                <td>총 결제금액의 70% 환불</td>
              </tr>
              <tr>
                <td>이용 6일 전까지</td>
                <td>총 결제금액의 60% 환불</td>
              </tr>
              <tr>
                <td>이용 5일 전까지</td>
                <td>총 결제금액의 50% 환불</td>
              </tr>
              <tr>
                <td>이용 4일 전까지</td>
                <td>총 결제금액의 40% 환불</td>
              </tr>
              <tr>
                <td>이용 3일 전까지</td>
                <td>총 결제금액의 30% 환불</td>
              </tr>
              <tr>
                <td>이용 2일 전까지</td>
                <td>총 결제금액의 20% 환불</td>
              </tr>
              <tr>
                <td>이용 1일 전까지</td>
                <td>총 결제금액의 10% 환불</td>
              </tr>
              <tr>
                <td>이용 당일</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
