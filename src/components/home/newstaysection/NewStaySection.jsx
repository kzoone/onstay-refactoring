import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NewStaySection() {
  const [newStayList, setNewStayList] = useState([])

  /**
   * 무작위 배열
   * @param {*} array 3개월 이내 등록된 숙소 데이터
   * @param {*} count 원하는 길이의 값
   * @returns 무작위 배열의 길이 6까지 리턴
   */
  function shuffle(array, count) {
    for (let index = array.length - 1; index >= 0; index--) {
      let random = Math.floor(Math.random() * (index + 1));
      [array[index], array[random]] = [array[random], array[index]];
    }
    const selectedElements = array.slice(0, count);
    return selectedElements;
  }

  useEffect(() => {
    axios.get('http://localhost:8000/newstay/')
      .then(result => {
        const newArr = shuffle(result.data, 6);
        setNewStayList(newArr);
      });
  }, []);

  return (
    <div className='newstaysection'>
      <p>NEW STAY</p>
      <Link to='/newstay'>전체보기 &gt;</Link>
    </div>
  );
};