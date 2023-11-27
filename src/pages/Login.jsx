import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { useState } from 'react';
import axios from 'axios';
import { removeCookie, setCookie } from '../util/cookie';
import { jwtDecode } from 'jwt-decode';

export function Login() {
    const [form, setForm] = useState({user_id : '', user_pw : ''})

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.user_id === '') return '아이디를 입력해주세요.'
        else if (form.user_pw==='') return '비밀번호를 입력해주세요.'

        axios({
            url : 'http://localhost:8000/member/login/',
            method : 'post',
            data : form,
            withCredentials : true
        })
        .then(res=>{
            const {accessToken} = res.data;
            console.log(accessToken);
            console.log(jwtDecode(accessToken));
        })
        .catch((err)=>{
            if (err.response?.data === 'not exist') {
                alert('존재하지 않는 유저 아이디입니다. 아이디를 확인해주세요.')
            } else if (err.response?.data === 'wrong pw') {
                alert('로그인에 실패하였습니다. 비밀번호를 확인해주세요.')
            }
        })
    }

    return (
        <main className='member login'>
            <PageTitle title={'LOGIN'} subtitle={'로그인'}/>
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
                    <button type='button' onClick={()=>{removeCookie('accessToken')}}>sdsd</button>
                </div>
            </form>
        </main>
    );
}