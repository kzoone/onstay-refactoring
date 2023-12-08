export default function NoticeAvata({notice_img}) {
  return (
    <figure>
      <img src={notice_img !== undefined ? `http://127.0.0.1:8000/getimg/noticeimg/${notice_img}` : `/assets/images/notice/basicImg.jpg`} alt="Notice Image" />
    </figure>
  );
};