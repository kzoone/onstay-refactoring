import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

export function Login() {

    return (
        <main className='member login'>
            <PageTitle title={'LOGIN'} subtitle={'로그인'}/>
            <form className="login_form member_form" action="">
                <p>
                    <input type="text" name="user_id" id="user_id" placeholder='아이디' aria-label='아이디' />
                </p>
                <p>
                    <input type="password" name="user_pw" id="user_pw" placeholder='비밀번호' />
                </p>
                <button className='login_btn black_box'>로그인</button>
                <Link to='/join' className='join_link white_box'>회원가입</Link>
                <div className='find_links_box'>
                    <Link to='/findId'>아이디 찾기</Link>
                    <Link to='/findPw'>비밀번호 찾기</Link>
                </div>
            </form>
        </main>
    );
}