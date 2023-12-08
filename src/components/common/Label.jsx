import React from 'react';

export default function Label(props) {

  return(
    <>
      <div className={`${props.type}`}>
        <span>{props.type}</span>
      </div>
    </>
  );
}