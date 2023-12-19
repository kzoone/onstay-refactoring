import { useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import NoticeAdminBtn from '../components/notice/NoticeAdminBtn';
import NoticeContent from '../components/notice/NoticeContent';
import NoticeAdd from '../components/notice/NoticeAdd';
import useUserInfo from '../util/useUserInfo';
import NoticeDelete from '../components/notice/NoticeDelete';

export function Notice() {
  const userInfo = useUserInfo(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeletModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkList, setCheckList] = useState([]);

  // 체크박스 단일 선택
  // 체크된 각 공지사항 ID를 인자로 받아, 해당 ID가 이미 선택된 ID인지 아닌지를 확인
  const handleCheckedItems = (noticeId) => {
    const isChecked = checkedItems.includes(noticeId);
    if (!isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, noticeId]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter(item => item !== noticeId)
      );
    }
  };

  // 체크박스 전체 선택
  // 전체 선택 클릭 시 페이지별 모든 공지사항(5개)를 setCheckedItems에 담아 상태 업데이트
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(checkList.map((item) => item.notice_id));
    }
    else {
      // 전체 선택 해제 시 checkItems를 빈 배열로 상태 업데이트
      setCheckedItems([]);
    }
  }

  return (
    <div className='notice'>
      <PageTitle title='NOTICE' subtitle={userInfo.isAdmin ? '공지사항 관리자 페이지 입니다' : null} />
      {userInfo.isAdmin && <NoticeAdminBtn setAddModal={setAddModal} setDeletModal={setDeletModal} checkedItems={checkedItems} />}
      <NoticeContent handleCheckedItems={handleCheckedItems} setCheckedItems={setCheckedItems}
        checkedItems={checkedItems} setCheckList={setCheckList} handleAllCheck={handleAllCheck} />
      {addModal && <NoticeAdd btnText='등록' setAddModal={setAddModal} />}
      {deleteModal && <NoticeDelete btnText='삭제' setDeletModal={setDeletModal} checkedItems={checkedItems} />}
    </div>
  )
}