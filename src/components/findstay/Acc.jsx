import React from "react";

export default function Acc({acc}){
    /**
     * 지역코드를 지역명으로 변환
     */
    const codeinfo = {
        1: '서울',
        2: '강원',
        3: '부산',
        4: '경기',
        5: '충북',
        6: '충남',
        7: '경북',
        8: '경남',
        9: '전북',
        10: '전남',
        11: '인천',
        12: '광주',
        13: '대전',
        14: '대구',
        15: '제주',
    };

    const area = (area_code) => {
        return codeinfo[area_code];
    };

    return(
        <div className="acc">
            <div className="acc_title">{acc.acc_name}</div>
            <div className="acc_content">
                <div className="acc_info">
                    <p>{area(acc.area_code)}</p>
                    <p>기준 {acc.min_capa}명 (최대 {acc.max_capa}명)</p>
                    <p>￦{acc.room_price} ~</p>
                    <p>예약하기</p>
                </div>
                <div className="acc_imgs">
                    {acc.acc_img.split(',').filter(img => !img.startsWith('swiperImage')).map((img, index) => (
                        <img key={index} src={`assets/images/acc/${img.trim()}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};