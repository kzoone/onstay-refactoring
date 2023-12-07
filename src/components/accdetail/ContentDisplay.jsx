// ContentDisplay.js
import React from 'react';
import ReservationInfo from './ReservationInfo';
import UsageInfo from './UsageInfo';
import RefundPolicy from './RefundPolicy';

const ContentDisplay = ({ selectedContent }) => {
  switch (selectedContent) {
    case '예약 안내':
      return <ReservationInfo />;
    case '이용 안내':
      return <UsageInfo />;
    case '환불 규정':
      return <RefundPolicy />;
    default:
      return null;
  }
};

export default ContentDisplay;
