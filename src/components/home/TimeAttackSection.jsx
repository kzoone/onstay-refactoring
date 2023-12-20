import { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Timer from './Timer';
import axios from "axios";
import getImgPath from '../../util/getImgPath';

export default function TimeAttackSection() {
  const now = new Date()
  let [day, setDay] = useState(now.getDate())

  const [acc, setAcc] = useState({acc_id : null, acc_name : null, acc_image : null})

  // 숙소 아이디 형식으로 변환하는 함수 (3이면 "AC0003"으로 변환)
  const accIdFormat = num => {
    return "AC" + "0".repeat(4-String(num).length) + num
  }

  // 현재 날짜에 해당하는 숙소id 정보를 가져옴 (예를들어 3일이면 "AC0003" 숙소가 이벤트 숙소인것)
  // 익일 0시가 되어, 날짜가 달라지면 숙소 정보를 새로운 숙소로 리렌더링하도록 함
  useEffect(()=>{
    axios.get('http://localhost:8000/acc/' + accIdFormat(day))
    .then(res=>{
      const {acc_id, acc_name} = res.data.acc_info
      const acc_image = res.data.acc_images.filter(image=>image.img_size==='big')[0]?.acc_img
      setAcc({acc_id, acc_name, acc_image})
    })
  },[day])
  
  return(
    <section className='home_timeattack_section'>
      <div className='timeattack_container'>
        <div className='timeattack_text'>
          <h4>TIME ATTACK</h4>
          <span className='acc_name'>{acc.acc_name}</span>
          <span className='timeattack_desc'>
            오늘 하루 특가 예약 이벤트를 진행중인 한옥 숙소에요.
            가성비•가심비 모두 잡을 기회를 놓치지 마세요 !
          </span>
          <small>할인 종료까지</small>
          <div className='timeattack_time'>
            <LuAlarmClock/>
            <Timer setDay={setDay}/>
          </div>
        </div>
        <Link to={`/findstay/acc/${acc.acc_id}`} className='timeattack_img'> 
          <img src={getImgPath.acc(acc.acc_image)} alt="" />
        </Link> 
      </div>
    </section>
  );
}