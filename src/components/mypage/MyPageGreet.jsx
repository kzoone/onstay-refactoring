import { useState } from "react";
import { Link } from "react-router-dom";

export function MyPageGreet(props) {
  let [reserveCount, setReserveCount] = useState(0)

  return (
    <div className='mypage_greet_container'>
      <h3>{props.userName}님 반가워요!</h3>
        {reserveCount 
        ? <span>{reserveCount}번의 여행을 계획중이시네요! 떠날 준비 되셨나요?</span>
        : <Link to='/findstay'>아직 여행 계획이 없네요! 여행을 떠나보시는건 어떠신가요?</Link>}
    </div>
  );
}
