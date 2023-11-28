import axios from 'axios';

export const tokenCheck = () => {
  return axios({
    url: 'http://localhost:8000/member/tokenCheck',
    method: 'get',
    withCredentials: true,
  })
    .then(res => {
      const userInfo = res.data.userInfo;
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      return userInfo;
    })
    .catch(err => {
      console.error(err);
    });
};

export default tokenCheck