import React from 'react';

export default function PageTitle({title, subtitle}) {
  return(
    <div className='page_title_container'>
      <p className='title'>{title}</p>
      { subtitle ? <p className='sub_title'>{subtitle}</p> : null }
    </div>
  );
}