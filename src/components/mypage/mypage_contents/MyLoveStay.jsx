
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

export function MyLoveStay({ user_id }) {
  let [acc, setAcc] = useState({});


  useEffect(() => {
    axios.get('http://localhost:8000/findstay')
      .then(res => {
        setAcc(res.data[0])
      })
      .catch(err => console.log(err))
  }, [user_id])

  return (
    <div className="my_lovestay">
      <div className='my_lovestay_list'>

        <div className="my_lovestay_wrapper">
          <div className="lovestay_info">
            <h4 className="acc_name">숙소이름</h4>
            <div className="acc_img_mobile">
              <img src={`assets/images/acc/accImage1.jpg`} alt="" />
            </div>
            <div className='detail_infos'>
              <span className='acc_area'>제주 / 제주시</span>
              <span className='acc_capa'>기준 2명 (최대 5명)</span>
              <span className='acc_price'>₩270,000 ~</span>
            </div>
            <div className="btns">
                <button>예약하기</button>
            </div>
          </div>
          {/* <Swiper className='acc_img_pc'
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{clickable : true}}
                  scrollbar={{draggable : true}}
          >
            <SwiperSlide>
              <img src={`assets/images/acc/accImage1.jpg`} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`assets/images/acc/accImage1.jpg`} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`assets/images/acc/accImage1.jpg`} alt="" />
            </SwiperSlide>
          </Swiper> */}

          <div className="acc_img_pc">
            <img src={`assets/images/acc/accImage1.jpg`} alt="" />
          </div>

        </div>

      </div>
    </div>
  );
}