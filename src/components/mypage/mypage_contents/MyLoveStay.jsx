
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AREA_STRING } from '../../../constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";



export function MyLoveStay({ user_id }) {
  let [accs, setAccs] = useState([]);
  const navigate = useNavigate()
  const disappeardRef = useRef()


  useEffect(() => {
    axios.get('http://localhost:8000/mypage/lovestay/' + user_id)
      .then(res => {
        setAccs(res.data)
      })
      .catch(err => console.log(err))
  }, [user_id])


  const removeLove = acc_id => () => {
    disappeardRef.current = document.getElementById(acc_id)
    axios({
      url : 'http://localhost:8000/findstay/love',
      method : 'delete',
      data : {userId : user_id, accId : acc_id}
    })
    .then(res => {
      disappeardRef.current.classList.add('disappear')
      setTimeout(()=>{
        let copy = accs.filter(acc=>acc.acc_id !== acc_id)
        setAccs([...copy])
        disappeardRef.current = null;
      }, 800)
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div className="my_lovestay">
      <div className='my_lovestay_list'>
        {accs.length 
        ?
        accs.map(acc => 
            <div className="my_lovestay_wrapper" key={acc.acc_id} id={acc.acc_id}>
              <div className="lovestay_info">
                <h4 className="acc_name">{acc.acc_name}</h4>
                <div className="acc_img_mobile">
                  <img src={`assets/images/acc/${acc.images.filter(img=>img.img_size==='small')[0].acc_img}`} alt="" />
                  <button onClick={removeLove(acc.acc_id)} className='acc_love_btn'>
                    <FaHeart /> 
                  </button>
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
                  <SwiperSlide key={img.acc_img}>
                    <img src={`assets/images/acc/${img.acc_img}`} alt="" />
                  </SwiperSlide>
                  )} 
                </Swiper>
                  <button onClick={removeLove(acc.acc_id)} className='acc_love_btn'>
                    <FaHeart /> 
                  </button>
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