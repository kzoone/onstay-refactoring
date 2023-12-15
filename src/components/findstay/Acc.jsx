import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LoveCount from './LoveCount';
import LoveButton from './LoveButton';
import { PiNotePencil } from "react-icons/pi";
import { LiaWalletSolid } from "react-icons/lia";
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";


export default function Acc({acc, locationName, userId, userLoved, getUserIsLovedAccs }){
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
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [loveCount, setLoveCount] = useState(acc.love); //좋아요 수
    const onLoveCount = (clicked) => {
        setLoveCount(clicked);
    }

    return(
        <div className='acc_container'>
            <Link to={`acc/${acc.acc_id}`} className='acc'>
                <div className='acc_title'>{acc.acc_name}</div>
                <div className='acc_content'>
                    <div className='acc_info'>
                        <div>
                            <p>{locationName(acc.area_code)}</p>
                            <p><span><PiNotePencil /></span>기준 {acc.min_capa}명 (최대 {acc.max_capa}명)</p>
                            <p><span><LiaWalletSolid /></span>￦{acc.room_price} ~</p>
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
                                    <img src={`assets/images/acc/${img}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </Link>
            <div className={`love ${userLoved ? 'loved' : ''}`}>
                <LoveCount loveCount={loveCount} />
                <LoveButton acc={acc} userId={userId} userLoved={userLoved} getUserIsLovedAccs={getUserIsLovedAccs} onLoveCount={onLoveCount} />
            </div>
        </div>
    );
};