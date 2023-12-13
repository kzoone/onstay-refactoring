import { useEffect, useState } from "react";
import AccCity from "./AccCity";
import { SlHourglass } from "react-icons/sl";
import { SlQuestion } from "react-icons/sl";
import TodayAccModal from "./TodayAccModal";
import { Link } from 'react-router-dom';

export default function TodayContent(props) {
  const { acc_id, register_date, acc_name, fetchData,
    acc_summary1, area_code, min_capa, max_capa, room_price, page, setPage } = props;
  const [modal, setModal] = useState(false);

  const date = new Date(register_date)
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = (date.getHours());
  const dateStr = `${month}월 ${day}일, ${hour}시 OPEN`;

  // 숙소 등록일자로 부터 24시간에서 얼마나 지났는지
  const calculateTimeDifference = () => {
    const currentDate = new Date();
    // 24시간 초 단위 - (현재시간 - 숙소 등록일자)/1000
    let timeDiff = Math.max(0, 86400 - (currentDate.getTime() - date.getTime()) / 1000);

    let restHour = ('0' + parseInt(timeDiff / (60 * 60))).slice(-2);
    let restMin = ('0' + parseInt((timeDiff % (60 * 60)) / 60)).slice(-2);
    let restSec = ('0' + parseInt((timeDiff % (60 * 60)) % 60)).slice(-2);
    return { restHour, restMin, restSec }
  };

  const [restTime, setRestTime] = useState(calculateTimeDifference());

  // 1초마다 상태를 업데이트하기 위한 인터벌
  useEffect(() => {
    const interval = setInterval(() => {
      setRestTime(calculateTimeDifference());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 숙소 등록일자로 부터 24시간 지나면 재렌더링
  // useEffect(() => {
  //   const shouldFetchData = (restTime.restHour === '00' && restTime.restMin === '00' && restTime.restSec === '00');

  //   if(shouldFetchData) {
  //     setPage(1);
  //   }
  // }, [page, restTime.restHour, restTime.restMin, restTime.restSec])

  const openModal = () => {
    setModal(true);
  };

  return (
    <div key={acc_id} className='today_content'>
      <p>{dateStr}</p>
      <p>{acc_name}</p>
      <div>
        <p><SlHourglass />{`${restTime.restHour}:${restTime.restMin}:${restTime.restSec}`}</p>
        <div>
          <SlQuestion />
          <div className="hover_box">
            <p>숙소 등록일로부터 24시간 동안 </p>
            <p>10,000원 할인 이벤트 진행 중입니다.</p>
            <p>이벤트 시간이 얼마 남지 않았으니 서두르세요!</p>
          </div>
        </div>
      </div>
      <span> ― </span>
      <p>{acc_summary1}</p>
      <div>
        <AccCity area_code={area_code} />
        <span>|</span>
        <p>{min_capa} ~ {max_capa}</p>
        <span>|</span>
        <p>&#8361;{room_price.toLocaleString()} ~</p>
      </div>
      <div className="link_btn_box">
        <Link to={`/findstay/acc/${acc_id}`}>구경 하기</Link>
        <button type="button" onClick={openModal}>쿠폰 받기</button>
      </div>
      {modal && <TodayAccModal
        btnText='받기'
        noti_1='등록일로부터 24시간 동안 쿠폰 이벤트 진행 중입니다.'
        noti_2='쿠폰을 받으려면 쿠폰 받기를 클릭해 주세요!'
        setModal={setModal}
        acc_name={acc_name} />}
    </div>
  );
};