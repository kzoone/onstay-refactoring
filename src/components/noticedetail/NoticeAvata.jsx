export default function NoticeAvata(props) {
  return (
    <figure>
      {props.notice_img !== null ? 
      <img src={`http://localhost:8000/uploads/noticefile/${props.notice_img}`} alt="Notice Image" />
        : <img src={`/assets/images/notice/basicImg.jpg`} alt="Notice Image" />}
    </figure>
  );
};