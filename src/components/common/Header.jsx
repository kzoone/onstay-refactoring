import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import { SlHome } from "react-icons/sl";
import { IoBookOutline } from "react-icons/io5";
import { SlBell } from "react-icons/sl";
import { SlMenu } from "react-icons/sl";
// import $ from 'jquery';

export default function Header() {

    /* LOGOUT 버튼 눌렀을 때 */
    const handleLogout = () => {
        alert('로그아웃 모달 띄울 예정');
    }

    /* 스크롤 모션 */
    // $(function(){
    //     var scrollMotion = function(){
    //         var offtHeader = $('.header').offset().top;
    //         console.log(offtHeader);
    //         if((window.location.pathname === '/') && ($(window).width() <= 430) && (offtHeader === 0)){
    //             $('.header').css({'background':'none'});
    //             $('body').css({'padding-top':'0'});
    //         }else{
    //             $('.header').css({'background':'#FFF'});
    //             $('body').css({'padding-top':'70px'});
    //         }
    //     }
        
    //     scrollMotion()
    //     $(window).scroll(function(){
    //         scrollMotion()
    //     }).resize(function(){
    //         scrollMotion()
    //     })

    // })
        

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
            <div className='menubar'><SlMenu /></div>
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