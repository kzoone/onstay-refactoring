export default function NoticeAvata({notice_img}) {
  return (
    <figure>
      <img src={notice_img !== undefined ? `http://192.168.50.76:8000/getimg/noticeimg/${notice_img}` : `/assets/images/notice/basicImg.jpg`} alt="Notice Image" />
    </figure>
  );
};