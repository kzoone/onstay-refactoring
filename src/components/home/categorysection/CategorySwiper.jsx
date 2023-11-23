import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CategorySwiperInner from './CategorySwiperInner';
import axios from 'axios';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

export default function CategorySwiper({type}){
  const [ accList, setAccList ] = useState([]);
  const categoryTitle = { only : '오직 온스테이하우스에서만' , price : '20만원 이하 가성비 하우스' };
  

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/${type}`)
    .then(result => {
      const resultSlice = result.data.splice(0, 12);
      setAccList(resultSlice);
    })
    .catch(err => console.log(err));
  }, [])
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return(
    <div className='content_category'>
      <p className="title">{`${categoryTitle[type]}`}</p>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            type: 'fraction',
          }}
          slidesPerView={3}
          navigation={true}
          spaceBetween={30}
          rewind={true}
          onInit = {(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints = {{
            100 : {
              slidesPerView: 1,
            },
            766: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1025: {
              slidesPerView: 3,
            },
          }}
        >
        {accList.map((list, idx) => (
          <SwiperSlide key={`list.acc_id${idx}`}>
            <CategorySwiperInner list={list}/>
          </SwiperSlide>
      ))}
        <button className='prev' ref={prevRef}><FiChevronLeft /></button>
        <button className='next' ref={nextRef}><FiChevronRight /></button>
      </Swiper>
    </div>
  );
}