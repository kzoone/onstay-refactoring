import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { SlMagnifier } from 'react-icons/sl';
import { SlHome } from 'react-icons/sl';
import { IoBookOutline } from 'react-icons/io5';
import { SlBell } from 'react-icons/sl';
import { SlMenu } from 'react-icons/sl';
import { TfiClose } from 'react-icons/tfi';
import { LuLogIn } from 'react-icons/lu';
import useUserInfo from '../../util/useUserInfo.js'
import $ from 'jquery';
import ConfirmModal from './ConfirmModal.jsx';
import axios from 'axios';
import {DEFAULT_PROFILE_IMG} from '../../constants/constants.js'

export default function Header() {
    const user = useUserInfo();
    let [showModal, setShowModal] = useState(false);
    let [userProfile, setUserProfile] = useState('')

    useEffect(()=>{
        if (user.user_id) {
            axios.get('http://localhost:8000/member/userinfo/' + user.user_id)
            .then(res=>{
                setUserProfile(res.data.user_img)
            })
            .catch(err => console.log(err))
        } 
    },[user.user_id])

    /* menubar 제어 */
    function menubarOpen(){ //menubar 버튼을 누르면 menubar_list를 OPEN
            document.querySelector('.menubar_list').classList.add('open');
    }
    function menubarClose(){    //close 버튼을 누르면 menubar_list를 CLOSE
            document.querySelector('.menubar_list').classList.remove('open');
    }

    document.addEventListener('click', (e) => {  // 문서 전체를 클릭 이벤트로 감지시킴

        const isMenubarListArea = document.querySelector('.menubar_list').contains(e.target);
        const isMenubarBtnArea = document.querySelector('.menubar').contains(e.target);
        
        if (!isMenubarListArea && !isMenubarBtnArea) { //menubar_list 영역 외부를 클릭한 경우에만 menubarClose 함수가 실행
            menubarClose();
        } 

        
        //menubar_list가 open되었을때 배경 어둡게, 스크롤바 사라짐
        if(document.querySelector('.menubar_list').classList.contains('open')){
            document.querySelector('.menubar_bg').style.display = 'block';
            document.querySelector('html').style.overflow = 'hidden';
        }else{
            document.querySelector('.menubar_bg').style.display = 'none';
            document.querySelector('html').style.overflow = 'scroll';
        }
    })

    try {
        document.querySelector('.menu_login').addEventListener('click',() => {
            menubarClose();
        })
        document.querySelector('.menu_join').addEventListener('click',() => {
            menubarClose();
        })
    } catch {
        
    }


    /* LOGOUT 버튼 눌렀을 때 */
    const handleModal = () => {
        setShowModal(!showModal)
    }
    
    const handleLogout = () => {
        axios({
            url : 'http://localhost:8000/member/logout/',
            method : 'post',
            data : { user_id :user.user_id},
            withCredentials : true
        })
        .then(res => {
            localStorage.removeItem('isLoggedIn')
            alert('로그아웃 되었습니다.')
            window.location.href = '/'
        })
        .catch(err => {
           console.log(err);
        })
    }

    /* 스크롤 모션 */
    const location = useLocation();

    $(function(){
        var scrollMotion = function(){

            /* 메인페이지에서 작은사이즈 브라우저 헤더의 offsetTop이 0이 되면 header 배경색이 사라지도록 구현 */
            var offtHeader = $('.header').offset().top;
            if((window.location.pathname === '/') && ($(window).width() <= 430) && (offtHeader === 0)){
                $('.header').css({'background':'none'});
                $('.header .main_logo').css({'display':'none'});
                $('.header .main_logo_white').css({'display':'block'});
                $('.menubar svg').css({'fill':'#FFF'});
            }else{
                $('.header').css({'background':'#FFF'});
                $('.header .main_logo').css({'display':'block'});
                $('.header .main_logo_white').css({'display':'none'});
                $('.menubar svg').css({'fill':'#000'});
            }

            if(!$('main').hasClass('home') && (location.pathname !== '/')){
                $('body').css({'padding-top':'70px'});
            }else{
                $('body').css({'padding-top':'0'});
            }

            /* menubar가 open된 상태로 화면높이가 줄어들때
            로그아웃 버튼의 높이위치도 같이 줄어들다가 특정 위치까지 올라오면 고정시키는코드 */
            if ($('.logout_area').length > 0) {
                let winH = window.innerHeight; //브라우저 높이 (변동)
                let logoutAreaOffset = $('.logout_area').offset().top; 
                let logoutOffset = $('.menubar_list .logout').offset().top;
                let logoutH = document.querySelector('.menubar_list .logout').offsetHeight; 
                if(logoutAreaOffset && logoutOffset){
                    if(logoutOffset <= logoutAreaOffset && logoutH){
                        $('.menubar_list .logout').css({'bottom': `${winH-logoutAreaOffset-logoutH}px`});
                    }else if(logoutOffset > logoutAreaOffset){
                        $('.menubar_list .logout').css({'bottom': '80px'});
                    }
                }
            }
        }
        scrollMotion()
        $(window).scroll(function(){
            scrollMotion()
        }).resize(function(){
            scrollMotion()
        })
    })

    return(
        <>
            {showModal && <ConfirmModal handleModal={handleModal}
                                        handleConfirm={handleLogout} 
                                        noti_1={`${user.user_name}님, 아직 둘러볼 한옥 스테이가 많아요!`} 
                                        noti_2={`정말 로그아웃 하실거에요?`}/>}
        <div className='header'>
            <div className='header_left'>
                <Link to='/'>
                    <img className='main_logo' src='/assets/images/main_logo.png' />
                    <img className='main_logo_white' src='/assets/images/logo_white.png' />
                </Link>
            </div>
            <div className='header_right'>
                <nav>
                    <ul>
                        <li><a className='menu' href='/findstay'>FIND STAY</a></li>
                        <li><a className='menu' href='/newstay'>NEW-STAY</a></li>
                        <li><Link className='menu' to='#'>JOURNAL</Link></li>
                        <li><Link className='menu' to='/notice'>NOTICE</Link></li>
                    </ul>
                </nav>
                <div className='my'>
                    {/* 일반 회원 로그인 시 */}
                    {(user.user_id && !user.isAdmin) && <> 
                    <Link className='mypage' to='/mypage'><FaRegUser />&nbsp;MY PAGE</Link>
                    <button type='button' className='logout' onClick={handleModal}>LOGOUT</button>
                    </>}
                    {/* 관리자 로그인 시 */}
                    {(user.user_id && user.isAdmin) && <> 
                    <Link className='adminpage' to='/adminpage'><FaRegUser />&nbsp;ADMIN</Link>
                    <button type='button' className='logout' onClick={handleModal}>LOGOUT</button> 
                    </>}
                    {/* 비로그인 시 */}
                    { !user.user_id && <>
                    <Link className='login' to='/login'><LuLogIn  />&nbsp;LOGIN</Link>
                    <Link className='join' to='/join'>&nbsp;JOIN</Link> 
                    </>}
                </div>
            </div>
            <button className='menubar' onClick={menubarOpen}>
                <SlMenu />
            </button>
            <div className='menubar_bg' />
            <div className='menubar_list'>
                <div className='my_info'>
                    <div className='profile'>
                        {/* 회원 로그인 시에만 */}
                        {(user.user_id && !user.isAdmin) && <>
                            <div className='profile_img'>
                                <img 
                                src={userProfile ? 'http://localhost:8000/getimg/userprofile/' + userProfile : DEFAULT_PROFILE_IMG} alt="" />
                            </div>
                            <div className='name'>{user.user_name} 님</div>
                        </>}

                        {/* 관리자 로그인 시 */}
                        {(user.user_id && user.isAdmin) && <> 
                            <div className='name'>ADMIN</div>
                        </>}

                        {/* 비로그인 시 */}
                        {!user.user_id && <>
                            <div className='non_login'>
                                <p>로그인 후 서비스를 이용해보세요</p>
                             </div>
                        </>}
                    </div>
                    <div className='close_btn'>
                        <button type='button' className='close' onClick={menubarClose}><TfiClose /></button>
                    </div>
                </div>
                <div className='mypage_list'>
                    {/* 회원 로그인 시 */}
                    {(user.user_id && !user.isAdmin) && <>
                        <ul>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyReservation'>예약 정보</a>
                            </li>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyReview'>리뷰 관리</a>
                            </li>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyCoupon'>보유 쿠폰</a>
                            </li>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyLoveStay'>관심 스테이</a>
                            </li>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyEdit'>회원 정보 수정</a>
                            </li>
                            <li>
                                <a className='menu' href='/mypage?showContent=MyQNA'>1:1 문의</a>
                            </li>
                        </ul>
                        <div className='logout_area'>
                            <button type='button' className='logout' onClick={handleModal}>로그아웃</button>
                        </div>   
                    </>}

                    {/* 관리자 로그인 시 */}

                    {(user.user_id && user.isAdmin) && <> 
                    <ul>
                        <li><a className='menu' href='/adminpage?showContent=ManageMember'>회원 관리</a></li>
                        <li><a className='menu' href='/adminpage?showContent=ManageQNA'>1:1 문의글 관리</a></li>
                        <li><a className='menu' href='/adminpage?showContent=ManageAcc'>숙소 관리</a></li>
                    </ul>
                    <div className='logout_area'>
                        <button type='button' className='logout' onClick={handleModal}>로그아웃</button>
                    </div>
                    </>}
                   
                    {/* 비로그인 시 */}
                    { !user.user_id && 
                      <ul>
                        <li><Link className='menu menu_login' to='/login'>로그인</Link></li>
                        <li><Link className='menu menu_join' to='/join'>회원가입</Link></li>
                     </ul>
                    }
                </div>
            </div>
        </div>
        <div className='header_mobile'>
            <nav>
                <ul>
                    <li>
                        <a className='menus_mobile' href='/findstay'>
                            <span className='icon_mobile'><SlMagnifier /></span>
                            <span className='menu_mobile'>FIND STAY</span>
                        </a>
                    </li>
                    <li>
                        <a className='menus_mobile' href='/newstay'>
                            <span className='icon_mobile'><SlHome /></span>
                            <span className='menu_mobile'>NEW-STAY</span>
                        </a>
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