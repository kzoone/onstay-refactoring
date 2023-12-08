import React from 'react';
import { Link } from 'react-router-dom';

export default function NoAccess() {
  return (
    <div className='noaccess' style={{paddingLeft : '2em'}}>
      <h1 style={{fontSize:'5rem'}}>권한이 없습니다.</h1>
      <p style={{fontSize:'3em'}}>이 페이지에 접근할 권한이 없습니다.</p>
      <p style={{fontSize:'3em'}}>
        로그인이 필요하다면 <Link to="/login" style={{cursor:'pointer', textDecoration:'underline', color:'blue'}}>여기</Link>를 클릭하여
        로그인하세요.
      </p>
    </div>
  );
}
