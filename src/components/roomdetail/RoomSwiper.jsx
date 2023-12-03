import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';

export default function RoomSwiper(props) {

  return (
    <> 
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        rewind={true}
        modules={[Pagination]}>
          <SwiperSlide>
            <img src={`/assets/images/room/${props.img1}`} alt={`${props.acc}의 ${props.name} 이미지`} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`/assets/images/room/${props.img2}`} alt={`${props.acc}의 ${props.name} 이미지`} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={`/assets/images/room/${props.img3}`} alt={`${props.acc}의 ${props.name} 이미지`} />
          </SwiperSlide>
      </Swiper>
    </>
  );
}