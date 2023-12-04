import PageTitle from '../components/common/PageTitle';
import NoticeAdminBtn from '../components/notice/NoticeAdminBtn';
import NoticeContent from '../components/notice/NoticeContent';

export function Notice() {
  const userInfo = false;
  return userInfo ? (
    <div className='notice_page'>
      <PageTitle title='NOTICE' />
      <NoticeContent userInfo={userInfo} />
    </div>
  ) : (
    <div className='notice_admin'>
      <PageTitle title='NOTICE' subtitle='공지사항 관리자 페이지 입니다' />
      <NoticeAdminBtn />
      <NoticeContent userInfo={userInfo} />
    </div>
  )
}