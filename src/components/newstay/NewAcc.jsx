import { useState, useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewStayAvata from '../home/newstaysection/NewStayAvata';
import NewAccContent from './NewAccContent';

export default function NewAcc() {
  const [newAccList, setNewAccList] = useState([]);
  const [page, setPage] = useState(1);
  const isMounted = useRef(false);
  const pageData = { page: page, pageItem: 2 }

  useEffect(() => {
    if (isMounted.current) {
      axios.post('http://localhost:8000/newstay/', pageData)
        .then(result => {
          setNewAccList(prevData => [...prevData, ...result.data]);
        }).catch(error => console.log(error));
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
    <ul className='new_acc_wrap'>
      {newAccList.map(newAcc =>
        <li key={newAcc.acc_id}>
          <NewStayAvata acc_img={newAcc.acc_img} />
          <Link to={`/findstay/acc/${newAcc.acc_id}`}>
            <NewAccContent
              acc_id={newAcc.acc_id}
              acc_name={newAcc.acc_name}
              area_code={newAcc.area_code}
              min_capa={newAcc.min_capa}
              max_capa={newAcc.max_capa}
              day_diff={newAcc.day_diff}
            />
          </Link>
        </li>)}
    </ul>
  );
};