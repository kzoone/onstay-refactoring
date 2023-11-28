import axios from 'axios';

const source = axios.CancelToken.source();

/**
 * 유저 권한이 필요한 AJAX 통신일 경우 사용하는 axios 인스턴스
 */
const axiosAuth = axios.create({
  cancelToken: source.token,
});

axiosAuth.interceptors.request.use(
  (config) => {
    return axios({
      url: 'http://localhost:8000/member/tokenCheck',
      method: 'get',
      withCredentials: true,
    })
      .then(() => {
        return config;
      })
      .catch((err) => {
        source.cancel('토큰 만료로 인한 요청 취소');
        alert('토큰이 만료되어 로그인 페이지로 이동합니다.');
        window.location.href = '/login';
        return Promise.reject(err);
      });
  },
  (err) => {
    console.error('토큰 체크 요청 실패', err);
    return Promise.reject(err);
  }
);

export default axiosAuth;
