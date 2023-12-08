import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useState } from 'react';
import axios from 'axios';
import useUserInfo from '../util/useUserInfo';

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
            url: 'http://192.168.50.76:8000/member/login/',
            method: 'post',
            data: form,
            withCredentials: true
        })
            .then(res => {
                // 서버단에서 액세스 토큰, 리프레쉬 토큰을 각각 쿠키에 직접 세팅해줌 (refresh만 httponly)
                // 또한 간단한 유저 정보(아이디, 이름)은 json 객체로 받아 로컬 스토리지에 저장해둠
                localStorage.setItem('user_info', JSON.stringify(res.data.userInfo))
                alert('로그인 성공하였습니다.')
                window.location.href = '/'
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
                        <input type="text" name="user_id" id="user_id" onChange={handleChange} value={form.user_id} placeholder='아이디' aria-label='아이디' />
                    </p>
                    <p>
                        <input type="password" name="user_pw" id="user_pw" onChange={handleChange} value={form.user_pw} placeholder='비밀번호' aria-label='비밀번호' />
                    </p>
                    <button className='login_btn black_box'>로그인</button>
                    <Link to='/join' className='join_link white_box'>회원가입</Link>
                    <div className='find_links_box'>
                        <Link to='/findId'>아이디 찾기</Link>
                        <Link to='/findPw'>비밀번호 찾기</Link>
                    </div>
                </form>}
        </main>
    )
}