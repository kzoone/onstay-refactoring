import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import { MEMBER_REGEX, INVALID_NOTI_TEXT, INVALID_NOTI_ALERT} from '../constants/constants';
import axios from 'axios';

export default function FindPwReset() {
  let [isTokenExpired, setTokenExpired] = useState(true);
  let [form, setForm] = useState({user_pw : '', user_pw_repeat : ''})
  let [valid, setValid] = useState({user_pw : false, user_pw_repeat : false})

  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  
  useEffect(()=>{
    try {
        const tokenExpiredDate = new Date(1000 * jwtDecode(token).exp)
        const now = new Date();
        if (tokenExpiredDate > now) {
            setTokenExpired(false)
        } else {
            setTokenExpired(true)
        }
    } catch(err) { // 토큰 없이 들어온 경우
        alert('잘못된 접근입니다. 홈으로 이동합니다.')
        navigate('/')
    }
  },[])

  useEffect(()=>{
    setValid({
        user_pw : MEMBER_REGEX.user_pw.test(form.user_pw),
        user_pw_repeat : form.user_pw === form.user_pw_repeat
    })
  },[form])


  const handleChange = e => setForm({...form, [e.target.name] : e.target.value})

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!valid.user_pw) {
        return alert(INVALID_NOTI_ALERT.user_pw)
    } else if (!valid.user_pw_repeat) {
        return alert(INVALID_NOTI_ALERT.user_pw_repeat)
    } // 입력 데이터 유효성 검사
    
    axios({
        url : 'http://localhost:8000/member/find/pw/reset',
        method : 'post',
        data : {...form, token : token} 
    })
    .then(res => {
        alert('비밀번호를 성공적으로 변경하였습니다. 변경한 비밀번호로 로그인해주세요.')
        setTimeout(()=>{navigate('/login')},300)
    })
    .catch(err => {
        if (err.response.status === 403) {
            setTokenExpired(true)
        }
    })
    
  }
  
  

  return (
    <main className='find findpw member'>
        <PageTitle title='RESET PW' subtitle='비밀번호 재설정'/>
        {!isTokenExpired
        ?
        <form className='pw_reset_form member_form' onSubmit={handleSubmit} action="">
            <p>
                <label htmlFor="user_pw">새로운 비밀번호</label>
                <input onChange={handleChange} value={form.user_pw} type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" />
                    {(!valid.user_pw && form.user_pw !== '') &&
                    <small className="invalid_noti user_pw">{INVALID_NOTI_TEXT.user_pw}</small>}
                <input onChange={handleChange} value={form.user_pw_repeat} type="password" name="user_pw_repeat" id="user_pw_repeat" placeholder="비밀번호를 한번 더 입력하세요." />
                    {(!valid.user_pw_repeat && form.user_pw_repeat !== '') &&
                    <small className="invalid_noti user_pw_repeat">{INVALID_NOTI_TEXT.user_pw_repeat}</small>}
            </p>
            <button type='submit' className='black_box'>비밀번호 변경</button>
        </form>
        :
        <div className='find_result_container'>
                <div className='find_result_desc'>
                    <span>인증이 만료되었습니다.</span>
                    <span>비밀번호 찾기를 다시 시도해주세요.</span>
                </div>
            <button onClick={()=>{navigate('/find/pw')}} type='button' className='black_box'>비밀번호 찾기</button>
        </div>
        }
    </main>
  );
}
