import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import ConfirmModal from '../common/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function LoveButton({ acc, userId, userLoved, getUserIsLovedAccs, onLoveCount }){
    const [ isModal, setIsModal ] = useState(false);
    const navigate = useNavigate();
    
    /**
     * 관심스테이에 담기
     */
    const handleLoveClick = () => { 
        if(userId !== null){
            const accId = acc.acc_id;
            if(userLoved === true){ //유저가 좋아요 한 숙소 리스트에 이미 있다면
                //관심스테이 테이블에서 삭제
                axios  
                .delete(`${apiBaseUrl}/findstay/love`,{
                    data : {
                        userId,
                        accId
                    }
                })
                .then((res) => {
                    if(res.data.result === 'ok'){
                        getUserIsLovedAccs();
                        onLoveCount(res.data.loveCount);
                    }
                })
                .catch((error) => {
                    console.error('axios delete 에러 발생 => ', error);
                })

            }else{  //유저가 좋아요 한 숙소리스트에 없으면
                //관심스테이 테이블에 추가 && 숙소테이블의 좋아요 수 +1
                axios({
                    url : `${apiBaseUrl}/findstay/love`,
                    method : 'post',
                    data : {userId, accId}
                })
                .then((res) => {
                    if(res.data.result === 'ok'){
                        getUserIsLovedAccs();
                        onLoveCount(res.data.loveCount);
                    }
                })
                .catch((error) => {
                    console.error('axios post 에러 발생 => ', error);
                });
            }
        }else{
            setIsModal(true);
        }
    }

     // 모달 함수 : 로그인 버튼 클릭시
    const handleConfirm = (e) => {
        navigate('/login');
    };
    
    // 모달 함수 : 닫기 클릭
    const handleModal = (e)  => {
        setIsModal(false);
    };
    if(isModal){
        document.querySelector('.header').style.zIndex = '9';
    }else{
        document.querySelector('.header').style.zIndex = '10';
    }
    
    return(
        <>
        <FaHeart 
            onClick={handleLoveClick}
        />
        {isModal &&
        <ConfirmModal handleModal={handleModal} 
                    handleConfirm={handleConfirm} 
                    noti_1='로그인이 필요한 서비스입니다' 
                    noti_2='로그인 창으로 이동하시겠습니까?'/>
        }
        </>
    )
}