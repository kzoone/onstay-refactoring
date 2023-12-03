import { Link } from 'react-router-dom';
import axios from 'axios';
import { SlNote } from "react-icons/sl";

export default function NoticeTable(props) {
  const { notice_id, no, page, notice_title, notice_date, notice_views, userInfo } = props;

  // 조회 수 업데이트 요청
  const handleViewCount = (noticeId) => {
    axios.get(`http://localhost:8000/notice/increase/${noticeId}`)
      .catch(error => console.error(error));
  };

  return (
        <tr>
          <th>{no}</th>
          <td>
            <Link to={`/notice/${notice_id}/${page}`}
              onClick={() => handleViewCount(notice_id)}>
              {notice_title}
            </Link>
          </td>
          <td>{notice_date}</td>
          {userInfo ? <td>{notice_views}</td> : <td><button type='button'><SlNote /></button></td>}
        </tr>
  );
};