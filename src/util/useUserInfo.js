import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "./cookie"
import { useNavigate } from "react-router-dom";

// 유저 정보를 가져오는 커스텀 훅
const useUserInfo = (option = {redirectIfNoUser : false}) => {
  const [userInfo, setUserInfo] = useState({user_id:null, user_name:null, isAdmin:null});
  const navigate = useNavigate();
  useEffect(()=>{
    const storedUserInfo = JSON.parse(localStorage.getItem('user_info'));
    // 로컬스토리지가 유실되거나, 액세스 토큰이 만료된 경우 재발급api 호출
    if (!storedUserInfo || !getCookie('auth_access_token')) { 
       axios({
        url : 'http://192.168.50.76:8000/member/tokenCheck',
        method : 'get',
        withCredentials : true
      })
      .then(res => {
        localStorage.setItem('user_info', JSON.stringify(res.data.userInfo))
        setUserInfo(res.data.userInfo)
      })
      .catch(err=> {
        localStorage.removeItem('user_info')
        setUserInfo({user_id:null, user_name:null, isAdmin:null})
        if (option.redirectIfNoUser) { // 옵션으로 유저 null일 시 자동으로 리다이렉트 하도록
          alert('권한이 없습니다. 로그인 페이지로 이동합니다.')
          navigate('/login')
        }
      })
    } else {
      setUserInfo(storedUserInfo)
    }
  },[])

  return userInfo
}

export default useUserInfo