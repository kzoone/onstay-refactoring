import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PagiNation from 'react-js-pagination';

export default function NoticeContent() {
  const [noticeList, setNoticeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const noticePage = { page: page, pageItem: 5 }

  useEffect(() => {
    axios.post('http://localhost:8000/notice/', noticePage)
      .then(result => {
        setNoticeList(result.data);
        setTotalCount(result.data[0].total_rows);
      }).catch(error => console.log(error))
  }, [page]);

  // 페이지 변경을 처리하는 함수
  const handleChange = (page) => {
    setPage(page);
  }

  const handleViewCount = (noticeId) => {
    axios.get(`http://localhost:8000/notice/increase/${noticeId}`)
      .catch(error => console.error(error));
  };

  return (
    <>
      <table className='notice_content'>
        <thead>
          <tr>
            <th>NO</th>
            <th>TITLE</th>
            <th>DATE</th>
            <th>VIEW COUNT</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map(notice =>
            <tr key={notice.notice_id}>
              <th>{notice.no}</th>
              <td>
                <Link to={`/notice/${notice.notice_id}/${page}`}
                  onClick={() => handleViewCount(notice.notice_id)}>
                  {notice.notice_title}
                </Link>
              </td>
              <td>{notice.notice_date}</td>
              <td>{notice.notice_views}</td>
            </tr>)}
        </tbody>
      </table>
      <PagiNation
        activePage={page} // 현재 페이지
        itemsCountPerPage={noticePage.pageItem} // 현재 페이지당 보여줄 아이템 개수
        totalItemsCount={totalCount} // 총 아이템 개수
        pageRangeDisplayed={5} // 보여줄 페이지 범위
        prevPageText={'<'} // 이전을 나타낼 텍스트
        nextPageText={'>'} // 다음을 나타낼 텍스트
        onChange={handleChange} // 함수 호출
      />
    </>
  );
};