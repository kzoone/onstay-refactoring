import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import NoticeAbata from '../components/noticedetail/NoticeAbata';
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
  }, [])



  return (
    <div className="notice_detail_page">
      <PageTitle title='NOTICE' />
      <div className="notice_detail_content">
        {detailNotice.notice_img ? <NoticeAbata notice_img={detailNotice.notice_img} /> : null}
        <div>
          <NoticeDetailContent
            notice_date={detailNotice.notice_date}
            notice_title={detailNotice.notice_title}
            notice_content={detailNotice.notice_content}
            notice_views={detailNotice.notice_views}
          />
          <Link to='/notice' state={{ page: page }}>목록으로</Link>
        </div>
      </div>
    </div>
  );
};