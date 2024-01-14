
import { MyCoupon } from './mypage_contents/MyCoupon';
import { MyEdit } from './mypage_contents/MyEdit';
import { MyLoveStay } from './mypage_contents/MyLoveStay';
import { MyQNA } from './mypage_contents/MyQNA';
import { MyReservation } from './mypage_contents/MyReservation';
import  MyReview  from './mypage_contents/MyReview';

export function MyPageContent(props) {
  let {showContent, user_id} = props

  return (
    <div className='mypage_content'>
      {showContent==='MyReservation' && <MyReservation user_id={user_id}/>}
      {showContent==='MyReview' && <MyReview user_id={user_id}/>}
      {showContent==='MyCoupon' && <MyCoupon user_id={user_id}/>}
      {showContent==='MyLoveStay' && <MyLoveStay user_id={user_id}/>}
      {showContent==='MyEdit' && <MyEdit user_id={user_id}/>}
      {showContent==='MyQNA' && <MyQNA user_id={user_id}/>}
    </div>
  );
}