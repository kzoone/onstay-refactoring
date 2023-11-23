import React from 'react';

export default function CategoryTitle({type}){
  return(
    <>
    { type === 'only' ? <p className="title">오직 온스테이하우스에서만</p> :  <p className="title">20만원 이하 가성비 하우스</p> }
    </>
  );
}