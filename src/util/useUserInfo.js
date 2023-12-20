import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "./cookie"
import { useNavigate } from "react-router-dom";

// 유저 정보를 가져오는 커스텀 훅
const useUserInfo = (option = {blockAccessByAuth : false, adminRequired : false}) => {
  const [userInfo, setUserInfo] = useState({user_id:null, user_name:null, isAdmin:null});
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('isLoggedIn') || getCookie('auth_access_token') || option.blockAccessByAuth) {
      axios({
       url : 'http://localhost:8000/member/tokenCheck',
       method : 'get',
       withCredentials : true
     })
     .then(res => {
       localStorage.setItem('isLoggedIn', 1)
       setUserInfo(res.data.userInfo)
       return res.data.userInfo
     })
     .then(userInfo => {
       if (option.blockAccessByAuth && option.adminRequired && !userInfo.isAdmin) {
         alert('관리자만 접근할 수 있는 페이지입니다. 홈으로 이동합니다.')
         setTimeout(()=>{navigate('/')},300)
       }
     })
     .catch(err=> {
       localStorage.removeItem('isLoggedIn', 0)
       console.log('token expired');
       if (option.blockAccessByAuth) { // 옵션으로 유저 null일 시 자동으로 리다이렉트 하도록
         alert('권한이 없습니다. 로그인 페이지로 이동합니다.')
         setTimeout(()=>{navigate('/login')},300)
       }
     })
    } else {
      setUserInfo({user_id:null, user_name:null, isAdmin:null})
    }
  },[])

  return userInfo
}

export default useUserInfo