import { useState } from "react";

export default function NoticeAdminBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handelModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="notice_admin_btn">
      <p>| <b>user</b> 관리자님</p>
      <button type="button" onClick={handelModal}>추가</button>
      <button type="button">삭제</button>
    </div>
  );
};