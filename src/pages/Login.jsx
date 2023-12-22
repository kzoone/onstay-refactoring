import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useState } from 'react';
import axios from 'axios';
import useUserInfo from '../util/useUserInfo';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function Login() {
    const [form, setForm] = useState({ user_id: '', user_pw: '' })
    const navigate = useNavigate()
    const userInfo = useUserInfo()

    const alreadyLogin = () => {
        alert('이미 로그인 상태입니다.')
        window.location.href = '/'
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.user_id === '') return alert('아이디를 입력해주세요.')
        else if (form.user_pw === '') return alert('비밀번호를 입력해주세요.')

        axios({
            url: `${apiBaseUrl}/member/login/`,
            method: 'post',
            data: form,
            withCredentials: true
        })
        .then(res => {
            localStorage.setItem('isLoggedIn', 1)
            alert('로그인 성공하였습니다.')
            const prevPage = localStorage.getItem('prev_page');
            localStorage.removeItem('prev_page')
            window.location.href = prevPage || '/'
        })
        .catch((err) => {
            if (err.response.data === 'not exist') {
                    alert('존재하지 않는 유저 아이디입니다. 아이디를 확인해주세요.')
            } else if (err.response.data === 'wrong pw') {
                    alert('로그인에 실패하였습니다. 비밀번호를 확인해주세요.')
            }
        })
    }

    return (
        <main className='member login'>
            <PageTitle title={'LOGIN'} subtitle={'로그인'} />
            {userInfo.user_id ? alreadyLogin() :
                <form onSubmit={handleSubmit} className="login_form member_form" action="">
                    <p>
                        <input type="text" name="user_id" id="user_id" onChange={handleChange} value={form.user_id} placeholder='아이디' aria-label='아이디' autoComplete='username'/>
                    </p>
                    <p>
                        <input type="password" name="user_pw" id="user_pw" onChange={handleChange} value={form.user_pw} placeholder='비밀번호' aria-label='비밀번호' autoComplete='current-password'/>
                    </p>
                    <button className='login_btn black_box'>로그인</button>
                    <button onClick={()=>{navigate('/join')}} className="join_link white_box">회원가입</button>
                    <div className='find_links_box'>
                        <Link to='/find/id'>아이디 찾기</Link>
                        <Link to='/find/pw'>비밀번호 찾기</Link>
                    </div>
                </form>}
        </main>
    )
}