
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AREA_STRING } from '../../../constants/constants';
import { Link, useNavigate } from 'react-router-dom';

export function MyLoveStay({ user_id }) {
  let [accs, setAccs] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://localhost:8000/mypage/lovestay/' + user_id)
      .then(res => {
        setAccs(res.data)
      })
      .catch(err => console.log(err))
  }, [user_id])

  return (
    <div className="my_lovestay">
      <div className='my_lovestay_list'>

        {accs.length 
        ?
        accs.map(acc => 
            <div className="my_lovestay_wrapper">
              <div className="lovestay_info">
                <h4 className="acc_name">{acc.acc_name}</h4>
                <div className="acc_img_mobile">
                  <img src={`assets/images/acc/${acc.images.filter(img=>img.img_size==='small')[0].acc_img}`} alt="" />
                </div>
                <div className='detail_infos'>
                  <span className='acc_area'>{AREA_STRING[acc.area_code]}</span>
                  <span className='acc_capa'>기준 {acc.min_capa}명 (최대 {acc.max_capa}명)</span>
                  <span className='acc_price'>₩{acc.room_price.toLocaleString()} ~</span>
                </div>
                <div className="btns">
                    <button onClick={()=>{navigate(`/findstay/acc/${acc.acc_id}`)}}>예약하기</button>
                </div>
              </div>
              <div className="acc_img_pc">
                <Swiper className='acc_img_swiper'
                        slidesPerView={1}
                        navigation={true}
                        scrollbar={{draggable : true}}
                        pagination={{ clickable: true, el: '.swiper-pagination' }}
                >
                  {acc.images.filter(img=>img.img_size==='small').map(img => 
                  <SwiperSlide>
                    <img src={`assets/images/acc/${img.acc_img}`} alt="" />
                  </SwiperSlide>
                  )} 
                </Swiper>
              </div>
            </div>
          )
        : 
        <div className='no_list'>
            <div className='no_list_img'>
              <img src="assets/images/etc/mypage_no_list.png" alt="" />            
            </div>
            <div>
              <span>아직 관심 스테이가 없습니다. </span>
              <span>새로운 스테이를 찾아 떠나보세요.</span>
            </div>
            <Link to='/findstay'>FIND STAY</Link>
          </div>
          }
      </div>
    </div>
  );
}