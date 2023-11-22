import { LuAlarmClock } from "react-icons/lu";

export default function TimeAttackSection() {
  return(
    <section className='home_timeattack_section'>
      <div className='timeattack_container'>
        <div className='timeattack_text'>
          <h4>TIME ATTACK</h4>
          <span className='acc_name'>숙소 이름</span>
          <span className='timeattack_desc'>
            오늘 하루 특가 예약 이벤트를 진행중인 한옥 숙소에요.      
            가성비&가심비 모두 잡을 기회를 놓치지 마세요 !
          </span>
          <small>할인 종료까지</small>
          <div className='timeattack_time'>
            <LuAlarmClock/>
            <span>21시간 14분 9초 남았어요!</span>
          </div>
        </div>
        <div className='timeattack_img'> 
          <img src='assets/images/swiper/swiperImage1.webp' alt="" />
        </div>
      </div>
    </section>
  );
}