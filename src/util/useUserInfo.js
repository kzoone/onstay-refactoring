import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../global/LoginContext";
import { jwtDecode } from "jwt-decode";

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

// 유저 정보를 가져오는 커스텀 훅
const useUserInfo = (option = {blockAccessByAuth : false, adminRequired : false}) => {
  const {userInfo, setUserInfo, accessToken, setAccessToken} = useContext(LoginContext)
  const navigate = useNavigate();

  useEffect(()=>{
    let isTokenExpired;
    try {
      const tokenInfo = jwtDecode(accessToken)
      const expireDate = new Date(tokenInfo.exp*1000)
      const now = new Date();
      const timeDiff = expireDate.getTime() - now.getTime();
      isTokenExpired = (timeDiff/(60*1000) < 3) ? true : false; // 3분 남으면 리프레쉬 하도록
    } catch {
      isTokenExpired = true
    }   

    if((localStorage.getItem('isLoggedIn') && isTokenExpired) || option.blockAccessByAuth) {
      axios({
       url : `${apiBaseUrl}/member/tokenCheck`,
       method : 'post',
       headers : {Authorization : `Bearer ${accessToken}`},
       withCredentials : true
     })
     .then(res => {
       localStorage.setItem('isLoggedIn', 1)
       setUserInfo(res.data.userInfo)
       setAccessToken(res.data.accessToken)
       return res.data.userInfo
     })
     .then(userInfo => {
       if (option.blockAccessByAuth && option.adminRequired && !userInfo.isAdmin) {
         alert('관리자만 접근할 수 있는 페이지입니다. 홈으로 이동합니다.')
         setTimeout(()=>{navigate('/')},300)
       }
     })
     .catch(err=> {
       localStorage.removeItem('isLoggedIn');
       setUserInfo({user_id:null, user_name:null, isAdmin:null})
       setAccessToken('');
       if (option.blockAccessByAuth) { // 옵션으로 유저 null일 시 자동으로 리다이렉트 하도록
         alert('권한이 없습니다. 로그인 페이지로 이동합니다.')
         setTimeout(()=>{navigate('/login')},300)
       }
     })
    }
  },[])

  return userInfo
}

export default useUserInfo