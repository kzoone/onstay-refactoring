import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function FixDate(props) {
  const { roomInfoData, reservationData,
          startDate, setStartDate, endDate, setEndDate, btnText } = props;  

  const userInfo = { 'id' : 'user' }; // 테스트용 

  // 날짜 비활성화 
  const filterReverseDate = (date) => {
    const isReserved = reservationData.some(reservation => {
      const checkinDate = reservation.checkin;
      const checkoutDate = reservation.checkout;
      return date >= checkinDate && date < checkoutDate;
    });
    return !isReserved
  };

  // 선택한 날짜 담기도록 state 값 수정 진행
  const handleChangeCheckin = (date) => {
    setStartDate(date);
  };

  const handleChangeCheckout = (date) => {
    setEndDate(date);
  };

  const CustomCheckinInput = forwardRef(({ value, onClick, onChange }, ref) => {
    return (
      <input
        type='text'
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        placeholder='체크인'
        readOnly
        style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
      />
    );
  });
  
  const CustomCheckoutInput = forwardRef(({ value, onClick, onChange }, ref) => {
    return (  
      <input
        type='text'
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        readOnly
        placeholder='체크아웃'
        style={{ backgroundImage: 'url(/assets/images/calendar.png)'}}
      />
    );
  });

  return(
    <>
      <div className='fix_date_container'>
        <p>{roomInfoData.acc_name}</p>
        <div className='checkdate_container'>
          <div className='input_wrap'>
            <DatePicker
                locale={ko}
                selected={startDate}
                onChange={handleChangeCheckin}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat='yyyy-MM-dd'
                fixedHeight 
                customInput={<CustomCheckinInput />}
                filterDate={filterReverseDate}
                isClearable
                />
            <DatePicker
                locale={ko}
                selected={endDate}
                onChange={handleChangeCheckout}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat='yyyy-MM-dd'
                fixedHeight 
                customInput={<CustomCheckoutInput />}
                filterDate={filterReverseDate}
                isClearable
                />
          </div>
          <p>{btnText}</p> 
        </div>
      </div>
    </>
  );
};