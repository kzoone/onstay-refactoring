import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Star({rating, setClickRating}) {
  const [ hoverRating, setHoverRating ] = useState(0);
  

  // 마우스 hover된 별 값 담기
  const handleHoverMouse = (e, starValue) => {
    console.log(`starValue : ${starValue}`)
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetHover = e.clientX - rect.left; // 마우스 좌표 % 별 왼쪽 좌표
    console.log(`offsetHover : ${offsetHover}`)
    const percent = offsetHover / rect.width; // 차이 간격 % 별의 너비 = 퍼센트 환산 ( 0 ~ 1 )
    console.log(`percent : ${percent}`)
    const hoverScore = starValue - 0.5 + percent; // 
    console.log(`hoverScore : ${hoverScore}`)
    setHoverRating(hoverScore);
  }

  // 별 클릭시 해당 점수 부모 컴포넌트로 보내기 ( form 데이터 insert 처리 )
  const handleClickStar = (hoverRating) => {
    // setClickRating(Math.round(hoverRating));
    setClickRating(hoverRating % 1 === 0 ? Math.floor(hoverRating) : Math.round(hoverRating * 2) / 2);
  };

  console.log(`db : ${hoverRating % 1 === 0 ? Math.floor(hoverRating) : Math.round(hoverRating * 2) / 2}`);


  // 별 5개 배열로 만들기
  const stars = Array.from({length:5}).map((_, index) => {
    const starValue = index + 1;
    return (
      <span 
        key={index}
        onMouseOver={(e) => handleHoverMouse(e, starValue)}
        onClick={() => handleClickStar(hoverRating)} 
        className='modal_star'>
        { 
          starValue <= hoverRating 
          ? <FaStar/>
          : starValue - 0.5 < hoverRating 
            ? <FaStarHalfAlt />
            : <FaRegStar className='unselected'/>
        }
      </span>
  );
  });

  return <div className='star_wrap'>{stars}</div>
}