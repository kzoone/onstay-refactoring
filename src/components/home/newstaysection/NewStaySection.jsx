import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewStayAvata from './NewStayAvata';
import { SlArrowRight } from 'react-icons/sl';
import NewStayContent from './NewStayContent';

export default function NewStaySection() {
  const [newStayList, setNewStayList] = useState([]);
  const [newStayAllList, setnewStayAllList] = useState([]);

  /**
   * 무작위 배열
   * @param {*} array 3개월 이내 등록된 숙소 데이터
   * @param {*} count 추출을 종료 할 0 기준 인덱스
   * @returns 무작위 배열에서 0 ~ (count - 1) 인덱스까지 추출
   */
  function shuffle(array, count) {
    for (let index = array.length - 1; index >= 0; index--) {
      let random = Math.floor(Math.random() * (index + 1));
      [array[index], array[random]] = [array[random], array[index]];
    }
    const selectedArr = array.slice(0, count);
    return selectedArr;
  }

  useEffect(() => {
    axios.get('http://localhost:8000/newstay/')
      .then(result => {
        const newArr = shuffle(result.data, 6);
        setNewStayList(newArr);
        setnewStayAllList(result.data);
      });
  }, []);

  return (
    <div className='newstaysection'>
      <div>
        <p>NEW STAY</p>
        <Link to='/newstay' state={{ newStayAllList: newStayAllList }}>전체보기 <SlArrowRight /></Link>
      </div>
      <ul>
        {newStayList.map(newStay =>
          <li key={'newStaySection' + `${newStay.acc_id}`}>
            <Link to={`/findstay/acc/${newStay.acc_id}`}>
              <NewStayAvata acc_img={newStay.acc_img} />
              <NewStayContent acc_name={newStay.acc_name} area_code={newStay.area_code}
                acc_summary1={newStay.acc_summary1} />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};