import { FaHeart } from "react-icons/fa";
import useUserInfo from '../../util/useUserInfo';
import { useState, useEffect } from "react";
import axios from "axios";

export default function LoveButton({ acc }){
    // /**
    //  * 좋아요 기능
    //  */
    // const userId = useUserInfo().user_id;   //유저 ID
    // const [isLoveAccs, setIsLoveAccs] = useState([]); //유저가 좋아요 한 숙소 리스트
    
    // //유저가 좋아요 한 숙소 리스트 가져오기
    // const getUserLoveAccs = () => {
    //     axios
    //     .get('http://localhost:8000/findstay/')
    //     .then((res) => {
    //         setIsLoveAccs(res.data);
    //         console.log('유저가 좋아요 한 숙소 리스트 가져와서 isLoveAccs에 담았음')
    //     })
    //     .catch((err) => {
    //         console.error('axios get 에러 발생 => ' + err);
    //     })
    // }

    // //좋아요 버튼 클릭
    // const handleLoveClick = () => { 
    //     const accId = acc.acc_id;
    //     console.log(accId);
    //     if(isLoveAccs.includes(accId)){ 
    //         // 유저가 좋아요 한 숙소리스트가 해당 acc_id를 가지고 있으면
    //         //관심스테이 테이블에서 삭제
    //         axios  
    //         .delete('http://localhost:8000/findstay/love',{
    //             data : {
    //                 userId,
    //                 accId
    //             }
    //         })
    //         .then((res) => {
    //             if(res.data === 'ok'){
    //                 console.log('관심스테이 테이블에서 삭제됨');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('axios delete 에러 발생 => ', error);
    //         })
    //     }else{  
    //         // 유저가 좋아요 한 숙소리스트가 해당 acc_id를 가지고 있지 않으면
    //         //관심스테이 테이블에 추가 && 숙소테이블의 좋아요 수 +1
    //         axios({
    //             url : 'http://localhost:8000/findstay/love',
    //             method : 'post',
    //             data : {userId, accId}
    //         })
    //         .then((res) => {
    //             if(res.data === 'ok'){
    //                 console.log('관심스테이 테이블에 추가 , 숙소테이블의 좋아요 수 +1');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('axios post 에러 발생 => ', error);
    //         });
    //     }
    // }
    
    return(
        <FaHeart 
            // onClick={handleLoveClick}
        />
    )
}