import { useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import NoticeAdminBtn from '../components/notice/NoticeAdminBtn';
import NoticeContent from '../components/notice/NoticeContent';
import NoticeAdd from '../components/notice/NoticeAdd';
import useUserInfo from '../util/useUserInfo';
import NoticeDelete from '../components/notice/NoticeDelete';
import NoticeUpdate from '../components/notice/NoticeUpdate';

export function Notice() {
  const userInfo = useUserInfo();
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeletModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  // setOnDelete 함수를 업데이트하여 체크된 항목을 처리
  const handleCheckedItems = (noticeId, isChecked) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, noticeId]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== noticeId)
      );
    }
  };

  return userInfo.isAdmin ? (
    <div className='notice_admin'>
      <PageTitle title='NOTICE' subtitle='공지사항 관리자 페이지 입니다' />
      <NoticeAdminBtn setAddModal={setAddModal} setDeletModal={setDeletModal} userInfo={userInfo} checkedItems={checkedItems} />
      <NoticeContent userInfo={userInfo} handleCheckedItems={handleCheckedItems} setUpdateModal={setUpdateModal} />
      {addModal && <NoticeAdd btnText='등록' setAddModal={setAddModal} />}
      {deleteModal && <NoticeDelete btnText='삭제' setDeletModal={setDeletModal} userInfo={userInfo} checkedItems={checkedItems} />}
      {updateModal && <NoticeUpdate btnText='수정' setUpdateModal={setUpdateModal} userInfo={userInfo} />}
    </div>
  ) : (
    <div className='notice_page'>
      <PageTitle title='NOTICE' />
      <NoticeContent userInfo={userInfo} />
    </div>
  )
}