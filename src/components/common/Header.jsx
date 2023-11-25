import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import { SlHome } from "react-icons/sl";
import { IoBookOutline } from "react-icons/io5";
import { SlBell } from "react-icons/sl";
import { SlMenu } from "react-icons/sl";
import { TfiClose } from "react-icons/tfi";
import $ from 'jquery';

export default function Header() {

    /* LOGOUT 버튼 눌렀을 때 */
    const handleLogout = () => {
        alert('로그아웃 모달 띄울 예정');
    }

    /* 스크롤 모션 */
    $(function(){
        var scrollMotion = function(){

            /* 메인페이지에서 작은사이즈 브라우저 헤더의 offsetTop이 0이 되면 header 배경색이 사라지도록 구현 */
            var offtHeader = $('.header').offset().top;
            if((window.location.pathname === '/') && ($(window).width() <= 430) && (offtHeader === 0)){
                $('.header').css({'background':'none'});
                $('body').css({'padding-top':'0'});
            }else{
                $('.header').css({'background':'#FFF'});
                $('body').css({'padding-top':'70px'});
            }

            /* menubar가 open된 상태로 화면높이가 줄어들때
            로그아웃 버튼의 높이위치도 같이 줄어들다가 특정 위치까지 올라오면 고정시키는코드 */
            let winH = window.innerHeight; //브라우저 높이 (변동)
            let logoutAreaOffset = $('.logout_area').offset().top; 
            let logoutOffset = $('.menubar_list .logout').offset().top;
            let logoutH = document.querySelector('.menubar_list .logout').offsetHeight; 
            if(logoutOffset <= logoutAreaOffset){
                $('.menubar_list .logout').css({'bottom': `${winH-logoutAreaOffset-logoutH}px`});
            }else if(logoutOffset > logoutAreaOffset){
                $('.menubar_list .logout').css({'bottom': '80px'});
            }
        }
        scrollMotion()
        $(window).scroll(function(){
            scrollMotion()
        }).resize(function(){
            scrollMotion()
        })
    })

    /* menubar 버튼을 누르면 menubar_list를 OPEN */
    function menubarOpen(){
            document.querySelector('.menubar_list').classList.add('open');
    }
    /* close 버튼을 누르면 menubar_list를 CLOSE */
    function menubarClose(){
            document.querySelector('.menubar_list').classList.remove('open');
    }

    return(
        <>
        <div className='header'>
            <div className='header_left'>
                <Link to='/'>
                    <img className='main_logo' src='assets/images/main_logo.png' />
                </Link>
            </div>
            <div className='header_right'>
                <nav>
                    <ul>
                        <li><Link className='menu' to='/findstay'>FIND STAY</Link></li>
                        <li><Link className='menu' to='/newstay'>NEW-STAY</Link></li>
                        <li><Link className='menu' to='#'>JOURNAL</Link></li>
                        <li><Link className='menu' to='/notice'>NOTICE</Link></li>
                    </ul>
                </nav>
                <div className='my'>
                    <Link className='mypage' to='/mypage'><FaRegUser />&nbsp;MY PAGE</Link>
                    <button type='button' className='logout' onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
            <button className='menubar' onClick={menubarOpen}>
                <SlMenu />
            </button>
            <div className='menubar_list'>
                <div className='my_info'>
                    <div className='profile'>
                        <div className='profile_img' />
                        <div className='name'>닉네임 님</div>
                    </div>
                    <div className='close_btn'>
                        <button type='button' className='close' onClick={menubarClose}><TfiClose /></button>
                    </div>
                </div>
                <div className='mypage_list'>
                    <ul>
                        <li><Link className='menu' to='/mypage'>예약 정보</Link></li>
                        <li><Link className='menu' to='/mypage'>보유 쿠폰</Link></li>
                        <li><Link className='menu' to='/mypage'>관심 스테이</Link></li>
                        <li><Link className='menu' to='/mypage'>회원 정보 수정</Link></li>
                        <li><Link className='menu' to='/mypage'>1:1 문의</Link></li>
                    </ul>
                    <div className='logout_area'>
                        <button type='button' className='logout' onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='header_mobile'>
            <nav>
                <ul>
                    <li>
                        <Link className='menus_mobile' to='/findstay'>
                            <span className='icon_mobile'><SlMagnifier /></span>
                            <span className='menu_mobile'>FIND STAY</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='menus_mobile' to='/newstay'>
                            <span className='icon_mobile'><SlHome /></span>
                            <span className='menu_mobile'>NEW-STAY</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='menus_mobile' to='#'>
                            <span className='icon_mobile'><IoBookOutline /></span>
                            <span className='menu_mobile'>JOURNAL</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='menus_mobile' to='/notice'>
                            <span className='icon_mobile'><SlBell /></span>
                            <span className='menu_mobile'>NOTICE</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
}