import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CategorySwiperInner({list}) {
  const [ accimg, setAccImg ] = useState('');

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
  
  useEffect(() => {
    axios.get(`http://192.168.50.76:8000/img/${list.acc_id}`)
      .then(result => {
        setAccImg(result.data.acc_img);
      })
      .catch(err => console.log(err));
  }, []);

  return(                         
    <>
      <Link to={`findstay/acc/${list.acc_id}`}><img src={`/assets/images/acc/${accimg}`} alt={`${list.acc_name} 숙소 이미지}`} /></Link>
      <div className='acc_info'>
        <p className='name'>{list.acc_name}</p>
        <p className='area_price'>
        { list.area_code
          ?
            <span className='area'>{`${codeinfo[list.area_code]}`}</span>
          : null
        }
          <span className='price_tag'>₩</span>
          <span className='price'>{list.room_price} ~</span>
        </p>
        <Link to={`/findstay/acc/${list.acc_id}`} className='reservation'>예약하기</Link>
      </div>
    </>
  );
}