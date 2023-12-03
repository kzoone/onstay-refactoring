import React, { useState, useEffect }  from 'react';
import axios from 'axios';

export default function FormInfo(props) {
  let { roomInfoData, isValidDate, 
        startDate, endDate,
        price, nightCnt, payPrice,
        totalPayPrice, setTotalPayPrice, seletedCouponId, setSeletedCouponId } = props;
  const [ userData, setUserData ] = useState([]);
  const [ couponPrice, setCouponPrice ] = useState('');
  const isValidDateText = <p>-</p>;
  const userInfo = {id : 'user'}; // 테스트용

  // user﹒user coupon 리스트 조회
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/reservation/user/${userInfo.id}`)
      .then(result => {
        setUserData(result.data);
      })
      .catch(error => console.log(error));
  }, [])

  // 선택한 날짜 문자열로 형식 변환 : 2023-12-02
  const formatData = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);

    return year + '-' + month + '-' + day;
  }

  startDate && (startDate = formatData(startDate));
  endDate && (endDate = formatData(endDate));


  // select coupon change 이벤트
  const handleSelectChange = (e) => {
    if (isValidDate) {
      // 선택한 쿠폰 가격 number 타입으로 변경
      const selectedOption = e.target.options[e.target.selectedIndex];
      const parsedValue = parseInt(selectedOption.dataset.price);
      setCouponPrice(isNaN(parsedValue) ? '' : parsedValue);
      setSeletedCouponId(e.target.value); // 쿠폰 id state 설정

      // 쿠폰 선택에 따른 가격 적용
      (e.target.value !== 'false')  ? setTotalPayPrice(payPrice - parsedValue) : setSeletedCouponId('');
    } else {
      alert('체크인 체크아웃 날짜를 모두 선택 후 적용시켜주세요');
      e.target.value = seletedCouponId;
    }
  };

  // 쿠폰 선택 여부, 날짜 선택 관련 변동에 따른 최종 가격 텍스트 조건문에 따른 리턴
  const fntotalView = () => {
    return isValidDate ? `₩${seletedCouponId ? totalPayPrice.toLocaleString() : payPrice.toLocaleString()}` : '-';
  };
  
    // 숙소 최대 인원에 맞춘 select option 태그 출력
    const capaOption = Array(roomInfoData.max_capa).fill().map((_, idx) => (
      <React.Fragment key={idx}>
        <option value={`${idx + 1}명`}>{`${idx + 1}명`}</option>
      </React.Fragment>
    ));

  return(
    <>
      <dl className='form_info_container'>
        <div className='room_box'>
          <dt>예약스테이</dt>
          <dd>{roomInfoData.room_name}</dd>
        </div>
        <div className='reservation_box'>
          <dt>예약일</dt>
          <dd>
            { isValidDate ? (
              <>
                <p>{`${startDate} ~ ${endDate}`}</p>
                <span>|</span>
                <p>{`${nightCnt}박`}</p>
              </> 
            ) :  isValidDateText }
          </dd>
        </div>
        <div className='name_box'>
          <dt>이름</dt>
          <dd>
            <label htmlFor='name' className='hidden_label'>이름</label>
            {userData.length > 0 && <input type='text' id='name' readOnly value={userData[0].user_name} />}
          </dd>
        </div>
        <div className='phone_box'>
          <dt>휴대전화</dt>
          <dd>
            <label htmlFor='phone' className='hidden_label'>휴대전화</label>
            {userData.length > 0 && <input type='tel' id='phone' readOnly value={userData[0].user_phone} />}
          </dd>
        </div>
        <div className='email_box'>
          <dt>이메일</dt>
          <dd>
            <label htmlFor='email' className='hidden_label'>이메일</label>
            {userData.length > 0 && <input type='email' id='eamil' readOnly value={userData[0].user_email} />}
          </dd>
        </div>
        <div className='capa_box'>
          <dt>
            인원
            <span>{`최대 (${roomInfoData.max_capa}명)`}</span>
          </dt>
          <dd>
            <label htmlFor='capa' className='hidden_label'>인원</label>
            <select name='capa' id='capa'>
              {capaOption}
            </select>
          </dd>
        </div>
        <div className='coupon_box'>
          <dt>할인 혜택</dt>
          <dd>
            <div className='coupon_select'>
              <label htmlFor='coupon'>쿠폰할인</label>
              <select name='coupon' id='coupon' value={seletedCouponId} onChange={handleSelectChange}>
                <option value='false'>선택 안함</option>
                { userData.length > 0 && userData[0].coupon_id ? (
                  userData.map(coupon => (
                    <React.Fragment key={coupon.coupon_id}>
                      <option value={coupon.coupon_id} data-price={coupon.discount_price}>{coupon.coupon_name}</option>
                    </React.Fragment>
                  )))
                  : <option disabled>선택 가능한 쿠폰이 없습니다</option>
                }
              </select>
            </div>
            <div className='coupon_price'>
              <p>총 할인금액</p>
              { seletedCouponId && isValidDate ? <p>{`- ${couponPrice.toLocaleString()}`}</p> : isValidDateText }
            </div>
          </dd>
        </div>
        <div className='payment_box'>
          <dt>예상 결제금액</dt>
          <dd>
            <div className='room_price'>
              <div>
                <p>객실요금</p>
              { isValidDate ? <p>{`${roomInfoData.room_name} / ₩${price.toLocaleString()} * ${nightCnt}박`}</p> : null}
              </div>
              { isValidDate ? <p>{`₩${payPrice.toLocaleString()}`}</p> : isValidDateText }
            </div>
            <div className='room_discount'>
              <p>할인금액</p>
              { seletedCouponId && isValidDate ? <p>{`- ${couponPrice.toLocaleString()}`}</p> : isValidDateText }
            </div>
            <div className='total_box'>
              <p>총 결제 금액</p>
                <p className='total_price'>
                    {fntotalView()}
                </p> 
            </div>
          </dd>
        </div>
      </dl>
    </>
  );
}