import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import NoticeAvata from '../components/noticedetail/NoticeAvata';
import NoticeDetailContent from '../components/noticedetail/NoticeDetailContent';

export function NoticeDetail() {
  const { noticeid, page } = useParams();
  const [detailNotice, setDetailNotice] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/notice/${noticeid}/${page}`)
      .then(result => {
        setDetailNotice(result.data)
      })
      .catch(error => console.log(error))
  }, [noticeid, page])



  return (
    <div className="notice_detail_page">
      <PageTitle title='NOTICE' />
      <div className="notice_detail_content">
          <p>| {detailNotice.notice_title}</p>
        <div>
          <div>
            <NoticeDetailContent
              notice_date={detailNotice.notice_date}
              notice_content={detailNotice.notice_content}
              notice_views={detailNotice.notice_views}
            />
          <Link to='/notice' state={{ page: page }}>목록으로</Link>
          </div>
          <NoticeAvata notice_img={detailNotice.notice_img} />
        </div>
      </div>
    </div>
  );
};