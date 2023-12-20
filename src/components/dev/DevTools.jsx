import { useEffect } from 'react';
import useUserInfo from './../../util/useUserInfo';
import axiosAuth from './../../services/axiosAuth';
import { useLocation } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN

export default function DevTools() {
  const location = useLocation()
  const user = useUserInfo();
  
  
  const handleClick = e => {
    if (e.target.getAttribute('class')==='active') return alert(`이미 ${e.target.innerText} 권한입니다.`)
    
    axiosAuth({
      url : `${apiBaseUrl}/member/dev/setauth`,
      method : 'post',
      data : {user_id : user.user_id, auth : e.target.dataset.auth}
    })
    .then(res => {
      window.location.href = location.pathname + location.search
    })
    .catch(err => console.log(err))
  }



return (
    <div className={`dev_tools_container ${user.user_id ? 'loggedin' : 'unloggedin'}`}>
      <div className='dev_tools'>
        <button onClick={handleClick} data-auth='admin' className={(user.user_id && user.isAdmin) ? 'active' : ''}>관리자</button>
        <button onClick={handleClick} data-auth='user' className={(user.user_id && !user.isAdmin) ? 'active' : ''}>회원</button>
      </div>
    </div>
    );
}