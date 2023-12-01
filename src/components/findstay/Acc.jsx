import React, { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function Acc({acc, codeinfo, locationName}){
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

    
    
    

    return(
        <div className="acc">
            <div className="acc_title">{acc.acc_name}</div>
            <div className="acc_content">
                <div className="acc_info">
                    <p>{locationName(acc.area_code)}</p>
                    <p>기준 {acc.min_capa}명 (최대 {acc.max_capa}명)</p>
                    <p>￦{acc.room_price} ~</p>
                    <p>예약하기</p>
                </div>
                <div className="acc_imgs">
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
                </div>
            </div>
        </div>
    );
};