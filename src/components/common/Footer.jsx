import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { TbBrandYoutubeFilled } from "react-icons/tb";


export default function Footer() {
    return(
        <div className='footer'>
            <div className='footer_top'>
                <div className="left">
                    <img className='main_logo' src='assets/images/main_logo.png' />
                </div>
                <div className="right">
                    <div className="sns">
                        <a href='#'><FaFacebookF /></a>
                        <a href='#'><BsInstagram /></a>
                        <a href='#'><SiNaver /></a>
                        <a href='#'><RiKakaoTalkFill /></a>
                        <a href='#'><TbBrandYoutubeFilled /></a>
                    </div>
                    <div className="copyright">
                        Copyright©onstayhouse
                    </div>
                </div>
            </div>
            <div className='footer_bottom'>
                <p>
                    상호명 (주) 스테이폴리오 | 대표자 이상묵 | 주소 서울특별시 종로구 자하문로9길 24, 2층(통인동) | 전화 1670-4123 | help@stayfolio.com
                </p>
                <p>
                    사업자등록번호 676-87-00055 | 통신판매업신고 제2015-서울종로-0499호[사업자정보확인] | 관광사업자등록 일반여행업 2018-000049호(종로구청)
                </p>
                <p>
                    (주)스테이폴리오는 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
                </p>
            </div>
        </div>
    );
}