import { useMemo, useContext } from "react";
import { LoginContext } from './../global/LoginContext';
import axios from 'axios';

export default function useAxiosAuth() {
  const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;
  const source = axios.CancelToken.source();
  const {setUserInfo, accessToken, setAccessToken} = useContext(LoginContext)

  const axiosAuth = useMemo(() => {

    const instance = axios.create({
      cancelToken: source.token,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        return axios({
          url: `${apiBaseUrl}/member/tokenCheck`,
          method: 'post',
          withCredentials: true,
          headers : {Authorization : `Bearer ${accessToken}`}
        })
          .then(res => {
            localStorage.setItem('isLoggedIn', 1)
            setUserInfo(res.data.userInfo)
            setAccessToken(res.data.accessToken)
            return config;
          })
          .catch((err) => {
            source.cancel('토큰 만료로 인한 요청 취소');
            localStorage.removeItem('isLoggedIn')
            setUserInfo({user_id:null, user_name:null, isAdmin:null})
            setAccessToken('')
            alert('토큰이 만료되어 로그인 페이지로 이동합니다.');
            window.location.href = '/login';
            return Promise.reject(err);
          });
      },
      (err) => {
        console.log('no user');
        // console.error('토큰 체크 요청 실패', err);
        return Promise.reject(err);
      }
    );

    return instance;
  }, [])

  return axiosAuth
}