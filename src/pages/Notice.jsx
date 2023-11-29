import PageTitle from '../components/common/PageTitle';
import NoticeContent from '../components/notice/NoticeContent';

export function Notice() {
  return (
    <div className='notice_page'>
      <PageTitle title='NOTICE' />
      <NoticeContent />
    </div>
  );
}