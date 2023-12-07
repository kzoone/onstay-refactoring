import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import useUserInfo from '../../util/useUserInfo';
import { Link } from 'react-router-dom';

export default function Acc({acc, locationName}){
     // Swiper 컴포넌트의 ref를 생성
    const swiperRef = useRef(null);

    // 브라우저 리사이즈 이벤트 처리
    const handleResize = () => {
        // 스와이퍼 업데이트
        if (swiperRef.current) {
        swiperRef.current.swiper.update();
        }
    };

    // 컴포넌트가 처음 마운트될 때와 언마운트될 때 리사이즈 이벤트 핸들러 등록 및 해제
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    /* 좋아요 클릭 기능 */
    const userId = useUserInfo().user_id;
    const [isLoveAccs, setIsLoveAccs] = useState([]);   //유저가 좋아요한 숙소 목록 
    
    const getUserLoveAccs = () => {
        axios
        .get('http://localhost:8000/findstay/love', {
            userId
        })
        .then((res) => {
            setIsLoveAccs(res.data);
        })
        .catch((error) => {
            console.error('axios 에러 발생 => ', error);
        })
    }
    useEffect(()=>{
        getUserLoveAccs();
    }, [])

    const handleLoveClick = () => { // 좋아요 눌렀을때
        const accId = acc.acc_id;

        if(isLoveAccs.includes(accId)){
            axios   //관심스테이 테이블에서 삭제
            .delete('http://localhost:8000/findstay/love',{
                userId,
                accId
            })
            .then((res) => {
                if(res === 'ok'){
                    loveCntChange();
                    console.log('관심스테이 테이블에서 삭제됨');
                }
            })
            .catch((error) => {
                console.error('axios 에러 발생 => ', error);
            })
        }else{
            // axios   //관심스테이 테이블에 추가
            // .post('http://localhost:8000/findstay/love', {
            //     userId,
            //     accId
            // })
            // .then((res) => {
            //     if(res === 'ok'){
            //         loveCntChange();
            //         setIsLoveAccs([...isLoveAccs, accId]);
            //         console.log('관심스테이 테이블에 추가됨');
            //     }
            // })
            // .catch((error) => {
            //     console.error('axios 에러 발생 => ', error);
            // })
            axios   //숙소테이블의 좋아요 수 +1
            .put('http://localhost:8000/findstay/love',{
                accId
            })
            .then((res) => {
                if(res === 'ok'){
                    getUserLoveAccs();
                    console.log('숙소 테이블의 좋아요 수 증가됨')
                }
            })
            .catch((error) => {
                console.error('axios 에러 발생 => ', error);
            })
        }
    }
    useEffect(()=>{
        handleLoveClick();
    }, [])

    /* 좋아요 수 출력 */
    const loveCntChange = () => {
        console.log('좋아요 수 change')
    }

    return(
        <Link to={`acc/${acc.acc_id}`} className='acc'>
            <div className='acc_title'>{acc.acc_id}{acc.acc_name}</div>
            <div className='acc_content'>
                <div className='acc_info'>
                    <div>
                        <p>{locationName(acc.area_code)}</p>
                        <p>기준 {acc.min_capa}명 (최대 {acc.max_capa}명)</p>
                        <p>￦{acc.room_price} ~</p>
                    </div>
                    <div className='reservation'>
                        <p>예약하기</p>
                    </div>
                </div>
                <div className='acc_imgs'>
                    <Swiper 
                    navigation={true} 
                    modules={[Navigation]}
                    onResize={() => handleResize()}
                    ref={swiperRef}
                    >
                        {acc.acc_img.split(',').filter(img => !img.startsWith('swiperImage')).map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={`assets/images/acc/${img.trim()}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='love'>
                        <div className='love_cnt'>{acc.love}</div>
                        <FaHeart 
                            onClick={handleLoveClick}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};