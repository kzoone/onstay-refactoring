import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import getImgPath from '../../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

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
    axios.get(`${apiBaseUrl}/img/${list.acc_id}`)
      .then(result => {
        setAccImg(result.data.acc_img);
      })
      .catch(err => console.log(err));
  }, []);

  return(                         
    <>
      <Link to={`findstay/acc/${list.acc_id}`}><img src={getImgPath.acc(accimg)} alt={`${list.acc_name} 숙소 이미지`} /></Link>
      <div className='acc_info'>
        <p className='name'>{list.acc_name}</p>
        <p className='area_price'>
        { list.area_code
          ?
            <span className='area'>{`${codeinfo[list.area_code]}`}</span>
          : null
        }
          <span className='price_tag'>₩</span>
          <span className='price'>{list.room_price.toLocaleString()} ~</span>
        </p>
        <Link to={`/findstay/acc/${list.acc_id}`} className='reservation'>예약하기</Link>
      </div>
    </>
  );
}