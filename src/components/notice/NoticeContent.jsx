import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PagiNation from 'react-js-pagination';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function NoticeContent() {
  const [noticeList, setNoticeList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8000/notice/')
      .then(result => {
        console.log(result.data);
        setNoticeList(result.data);
      }).catch(error => console.log(error))
  }, []);

  const handleChange = () => {
    setPage(page);
  }

  console.log(noticeList.length);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>TITLE</th>
            <th>DATE</th>
            <th>VIEW COUNT</th>
          </tr>
        </thead>
        {noticeList.map(notice =>
          <tbody key={notice.notice_id}>
            <tr>
              <th>{notice.no}</th>
              <td>
                <Link to='/notice/1'>{notice.notice_title}</Link>
              </td>
              <td>{notice.notice_date}</td>
              <td>{notice.notice_views}</td>
            </tr>
          </tbody>)}
      </table>
      <PagiNation
      activePage={1}
      itemsCountPerPage={5}
      totalItemsCount={noticeList.length}
      pageRangeDisplayed={1}
      prevPageText={<SlArrowLeft />}
      nextPageText={<SlArrowRight />}
      onChange={handleChange}
      />
    </>
  );
};