import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PagiNation from 'react-js-pagination';
import { useLocation } from 'react-router-dom';
import NoticeSearch from './NoticeSearch';
import NoticeTable from './NoticeTable';

export default function NoticeContent() {
  const location = useLocation();
  const detailPage = location.state ? location.state.page : null;
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const noticePage = { page: page, pageItem: 5 }

  // detailPage 값을 기반으로 초기 페이지 상태 설정
  useEffect(() => {
    if (detailPage) {
      setPage(parseInt(detailPage));
    } else {
      setPage(page);
    }
  }, [detailPage]);

  // 각 page 별 pageItem 값 만큼 데이터 요청
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
            <NoticeTable
              key={notice.notice_id}
              notice_id={notice.notice_id}
              no={notice.no}
              page={page}
              notice_title={notice.notice_title}
              notice_date={notice.notice_date}
              notice_views={notice.notice_views}
            />)}
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
      <NoticeSearch 
      noticeList={noticeList}
      />
    </>
  );
};