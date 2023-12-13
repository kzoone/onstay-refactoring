// UsageInfo.js
import React from 'react';

const UsageInfo = () => {
  return (
    <div className='content_whole_frame'>
      <div className='content_title'>이용 안내</div>
      <div className='content_explain'>
        <div className='content_subtitle'>이용 규칙</div>
          <div className='content_subcontent'>
            <ul>
              <li className='content_comment'>모든 공간에서 절대 금연입니다. 위반 시 특수청소비가 청구됩니다.</li>
              <li className='content_comment'>화재의 위험으로 모든 공간에서 화기 사용을 엄격히 금지합니다.</li>
              <li className='content_comment'>취사가 가능한 숙소이나, 연기와 냄새가 나는 음식의 조리를 금지합니다.</li>
              <li className='content_comment'>침구나 비품에 심각한 오염이 발생한 경우, 파손 및 분실 등에 변상비가 청구됩니다.</li>
              <li className='content_comment'>환경 보호의 일환으로 일회용품이 제공되지 않으니 개인 위생용품을 준비해 주시기 바랍니다.</li>
              <li className='content_comment'>협의되지 않은 상업 사진 및 영상 촬영, 드론 촬영은 불가합니다.</li>
              <li className='content_comment'>이웃집이 가깝게 위치하고 있어 늦은 시간 외부로 소음이 발생하지 않도록 배려해 주시기 바랍니다.</li>
              <li className='content_comment'>전문 방역 업체를 통해 주기적으로 소독과 방역을 진행하고 있으나 주변환경의 특성상 벌레가 유입될 수 있습니다. 이로 인한 환불은 불가합니다.</li>
            </ul>
          </div>
        </div>
      <div className='content_explain'>
        <div className='content_subtitle'>중간 청소</div>
        <div className='content_subcontent'>
          <ul>
            <li className='content_comment'>3박 이상 숙박에는 중간 청소가 제공됩니다.</li>
            <li className='content_comment'>2박 이하 숙박에는 중간 청소가 제공되지 않습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsageInfo;
