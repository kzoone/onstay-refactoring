import TodaySwiper from "./TodaySwiper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TodayContent from "./TodayContent";

export default function TodayAccSection() {
  const [todayAccList, setTodayAccList] = useState([]);
  const [page, setPage] = useState(1);
  const isMounted = useRef(false);

  const fetchData = () => {
    axios.get('http://localhost:8000/newstay/today/' + page)
      .then(result => {
        setTodayAccList(prevData => [...prevData, ...result.data])
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (isMounted.current) {
      fetchData();
    } else {
      isMounted.current = true;
    }
  }, [page]);

  useEffect(() => {
    /**
     * 스크롤 이벤트를 처리하는 함수로, 
      페이지 하단에 도달하면 다음 페이지의 데이터를 로드하기 위해 
      setPage를 호출하여 page 상태를 업데이트.
     * window.innerHeight: 현재 브라우저 창의 높이
      document.documentElement.scrollTop: 현재 문서의 상단에서 스크롤된 양
      document.documentElement.offsetHeight: 문서의 전체 높이
     */
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        // 다음 페이지의 데이터 로딩
        setPage(page => page + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // cleanUp 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
              page={page}
              setPage={setPage}
            />
          </div>
        ) : (
          <p>오늘 공개한 숙소가 없습니다.</p>
        )
      }
    </div>
  );
};