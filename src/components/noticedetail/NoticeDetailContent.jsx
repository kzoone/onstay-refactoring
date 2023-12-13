export default function NoticeDetailContent(props) {
  const { notice_date, notice_content, notice_views } = props;
  const date = new Date(notice_date);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;

  return (
    <>
      <textarea readOnly value={notice_content} />
      <p>Register Date : {dateStr}</p>
      <p>View Count : {notice_views}</p>
    </>
  );
};