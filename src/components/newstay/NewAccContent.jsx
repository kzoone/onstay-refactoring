import AccCity from './AccCity';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewAccContent(props) {
  const { acc_id, acc_name, area_code } = props;
  const [newAccList, setNewAccList] = useState([]);
  const [matchingData, setMatchingData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/newstay/')
      .then(result => {
        setNewAccList(result.data)
      })
  }, []);

  useEffect(() => {
    // newAccList가 업데이트 된 후 현재 acc_id과 일치하는 데이터 찾기
    const matchData = newAccList.find(newAcc => newAcc.acc_id === acc_id);
    setMatchingData(matchData);
  }, [newAccList, acc_id]);

  return (
    <div className='new_acc_content'>
      <p>{acc_name}</p>
      <AccCity area_code={area_code} />
      {matchingData && (
        <>
          <p>{matchingData.min_capa} ~ {matchingData.max_capa}명</p>
          <p>Open + {matchingData.day_diff}일</p>
        </>)}
      <p>자세히 보기</p>
    </div>
  );
};