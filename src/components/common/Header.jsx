import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
    const handleLogout = () => {
        alert('로그아웃 모달 띄울 예정');
    }

    return(
        <div className='header'>
            <div className='header_left'>
                <Link to='/'>
                    <img className='main_logo' src='assets/images/main_logo.png' />
                </Link>
            </div>
            <div className='header_right'>
                <nav>
                    <Link className='menu' to='/findstay'>FIND STAY</Link>
                    <Link className='menu' to='/newstay'>NEW-STAY</Link>
                    <Link className='menu' to='#'>JOURNAL</Link>
                    <Link className='menu' to='/notice'>NOTICE</Link>
                </nav>
                <div className='my'>
                    <Link className='mypage' to='/mypage'><FaRegUser /> MY PAGE</Link>
                    <button type='button' className='logout' onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
        </div>
    );
}