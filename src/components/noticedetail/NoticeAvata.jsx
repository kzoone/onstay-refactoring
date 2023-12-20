import getImgPath from '../../util/getImgPath';

export default function NoticeAvata({notice_img}) {
  return (
    <figure>
      <img src={getImgPath.notice(notice_img)} alt="Notice" />
    </figure>
  );
};