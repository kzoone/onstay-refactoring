import TodaySwiper from "./TodaySwiper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TodayContent from "./TodayContent";

export default function TodayAccSection() {
  const [todayAccList, setTodayAccList] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:8000/newstay/today/`)
      .then(result => {
        setTodayAccList(result.data)
      })
      .catch(error => console.log(error));
  }
  
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className='today_section'>
      {todayAccList.length !== 0 ?
        todayAccList.map(todayAcc =>
          <div key={todayAcc.acc_id} className='today_swiper_content'>
            <TodaySwiper acc_imgs={todayAcc.acc_imgs} />
            <TodayContent
              acc_id={todayAcc.acc_id}
              register_date={todayAcc.register_date}
              acc_name={todayAcc.acc_name}
              fetchData={fetchData}
              acc_summary1={todayAcc.acc_summary1}
              area_code={todayAcc.area_code}
              min_capa={todayAcc.min_capa}
              max_capa={todayAcc.max_capa}
              room_price={todayAcc.room_price}
            />
          </div>
        ) : (
          <p>오늘 공개한 숙소가 없습니다.</p>
        )
      }
    </div>
  );
};