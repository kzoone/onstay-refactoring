import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import '../../../style/components/home/_homeVisual.scss';
import getImgPath from '../../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

const HomeVisual = () => {
  const [accVisual, setAccVisual] = useState([]);

  useEffect(() => {
      axios.get(`${apiBaseUrl}/visual`)
      .then(result => {
          setAccVisual(result.data);
      })
      .catch(error => console.log(error));
  }, [])


  return (
    <>
      <section className='visual_section'>
        <MediaQuery className='lg_size' minWidth={767}>
          {/* 화면 너비가 767px 이상일 때 보이는 내용 */}
          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='visualSwiper'
          >
            {accVisual.map((imageName, index) => (
              <SwiperSlide className='slide' key={index}>
                <Link className='link'to='/findstay'>
                  <div>
                    <div className='bg_img_container'><img className='img_size' src={getImgPath.acc(imageName.acc_img)} alt={`Slide ${index + 1}`} /></div>
                    <div className='swiper_text'>
                      <div><img className='text_img' src='./assets/images/main_logo.png' alt='' /></div>
                      <div className='content'>마음에 드는 한옥 숙소를 예약해 보세요</div>
                      <div className='more'>read me</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </MediaQuery>        
        <MediaQuery className='sm-size' maxWidth={766}>
          {/* 화면 너비가 766px 이하일 때 보이는 내용 */}
          {/* 여기에 작은 화면에 보여질 컨텐츠를 추가할 수 있습니다. */}
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='visualSwiper'
          >
            {accVisual.map((imageName, index) => (
              <SwiperSlide className='slide' key={index}>
                <Link className='sm_link' to='/findstay'>
                    <div className='sm_img_container'>
                      <img className='img_size' src={getImgPath.acc(imageName.acc_img)} alt={`Slide ${index + 1}`} />
                    </div>
                    <div className='sm_swiper_text'>
                      <div className='comment'>마음에 드는 한옥 숙소를 예약해 보세요</div>
                      <div className='more'>read me</div>
                    </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </MediaQuery>
      </section> 
    </>  );
};

export default HomeVisual;
