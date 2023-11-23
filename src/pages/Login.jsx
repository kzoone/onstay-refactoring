import { Link } from 'react-router-dom';

export function Login() {
    return (
        <div style={{ margin: '0 auto', width: '43vh', padding: '0 2vh', paddingBottom: '5vh' }}>
            <div className="member_title">
                <h2>LOGIN</h2>
                <span>로그인</span>
            </div>
            <form className="login_form member_form" action="">
                <input type="text" name="user_email" id="user_email" placeholder='이메일 아이디' />
                <input type="password" name="user_pw" id="user_pw" placeholder='비밀번호' />
                <button className='login_btn black_btn'>LOGIN</button>
                <button className='join_btn white_btn'>회원가입</button>
                <div className='login_form_links'>
                    <Link>아이디 찾기</Link>
                    <Link>비밀번호 찾기</Link>
                </div>
            </form>
        </div>
    );
}