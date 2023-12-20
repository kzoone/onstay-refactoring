import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getImgPath from '../../util/getImgPath';

export default function TodaySwiper({ acc_imgs }) {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용
  const [swiper, setSwiper] = useState(); // -> 슬라이드용

  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  return (
    <>
      <Swiper
        loop
        onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
        onSwiper={(e) => setSwiper(e)}
        breakpoints={{
          1025: {slidesPerView: 1},
        }}
      >
        {acc_imgs.map(img =>
          <SwiperSlide key={img}>
            <figcaption>
              <img src={getImgPath.acc(img)} alt='' />
            </figcaption>
          </SwiperSlide>
        )}
        <div className='swiper_nav_btn'>
          <button onClick={handlePrev}><MdArrowBackIos /></button>
          <div>
            <span>{swiperIndex + 1}</span>
            <span> / </span>
            <span>{acc_imgs.length}</span>
          </div>
          <button onClick={handleNext}><MdArrowForwardIos /></button>
        </div>
      </Swiper>

    </>
  );
};