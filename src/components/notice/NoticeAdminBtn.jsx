export default function NoticeAdminBtn({ setAddModal, setDeletModal, userInfo, checkedItems }) {
  const openAddModal = () => setAddModal(true);
  const openDeleteModal = () => {
    if (checkedItems.length === 0) {
      alert('선택된 공지사항이 없습니다. 삭제를 원하는 항목을 선택하세요.');
      return;
    } else {
      setDeletModal(true);
    }
  };

  return (
    <div className="notice_admin_btn">
      <p>| <b>{userInfo.user_name}</b> 관리자님</p>
      <div>
        <button type="button" onClick={openAddModal}>추가</button>
        <button type="button" onClick={openDeleteModal}>삭제</button>
      </div>
    </div>
  );
};