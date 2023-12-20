import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function MyPageGreet({user_id, userName, isAdmin}) {
  let [reserveCount, setReserveCount] = useState(0);
  let location = useLocation();

  useEffect(()=>{
    if (!isAdmin) {
      axios.get(`${apiBaseUrl}/mypage/reservation/upcoming/${user_id}`)
      .then(res => {
        setReserveCount(res.data.length)
      })
      .catch(err => console.log(err))
    }
  },[user_id, location])


  return (
    <div className='mypage_greet_container'>
      <h3>{userName}님 반가워요!</h3>
        {reserveCount ? <span>{reserveCount}번의 여행을 계획중이시네요! 떠날 준비 되셨나요?</span> : null}
        {(!isAdmin && !reserveCount) ? <span>아직 여행 계획이 없네요! 여행을 떠나보시는건 어떠신가요?</span> : null}
    </div>
  );
}
