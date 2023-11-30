import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "./cookie"

// 유저 정보를 가져오는 커스텀 훅
const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({user_id:null, user_name:null, isAdmin:null});
  useEffect(()=>{
    const storedUserInfo = JSON.parse(localStorage.getItem('user_info'));
    // 로컬스토리지가 유실되거나, 액세스 토큰이 만료된 경우 재발급api 호출
    if (!storedUserInfo || !getCookie('auth_access_token')) { 
       axios({
        url : 'http://localhost:8000/member/tokenCheck',
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
      })
    } else {
      setUserInfo(storedUserInfo)
    }
  },[])

  return userInfo
}

export default useUserInfo