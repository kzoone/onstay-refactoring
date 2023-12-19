import { Link } from 'react-router-dom';
import axios from 'axios';
import { SlNote } from 'react-icons/sl';
import { useState } from 'react';
import NoticeUpdate from '../notice/NoticeUpdate';
import useUserInfo from '../../util/useUserInfo';
import { useEffect } from 'react';

export default function NoticeTable(props) {
  const { notice_id, no, page, notice_title, notice_date,
    notice_views, notice_content, notice_img, handleCheckedItems, checkedItems } = props;
  const userInfo = useUserInfo();
  const [updateModal, setUpdateModal] = useState(false);

  const openUpdateModal = () => setUpdateModal(true);

  // 조회 수 업데이트 요청
  const handleViewCount = (noticeId) => {
    axios.get(`http://localhost:8000/notice/increase/${noticeId}`)
      .catch(error => console.error(error));
  };

  return (
    <tr>
      {userInfo.isAdmin ?
        <th>
          <input type='checkbox' id={`notice_check${no}`}
            onChange={() => handleCheckedItems(notice_id)}
            checked={checkedItems.includes(notice_id)}/>
          <label htmlFor={`notice_check${no}`} ></label>
        </th>
        : <th>{no}</th>}
      <td>
        <Link to={`/notice/${notice_id}/${page}`}
          onClick={() => handleViewCount(notice_id)}>
          {notice_title}
        </Link>
      </td>
      <td>{notice_date}</td>
      {userInfo.isAdmin ?
        <td>
          <button type='button' onClick={openUpdateModal}><SlNote className='slnote' /></button>
        </td>
        : <td>{notice_views}</td>}
      {updateModal && <td><NoticeUpdate btnText='수정'
        setUpdateModal={setUpdateModal}
        notice_title={notice_title}
        notice_content={notice_content}
        notice_img={notice_img}
        notice_id={notice_id}
      /></td>}
    </tr>
  );
};