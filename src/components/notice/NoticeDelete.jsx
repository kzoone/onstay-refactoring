import useUserInfo from '../../util/useUserInfo';
import useAxiosAuth from '../../hooks/useAxiosAuth';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function NoticeDelete({ btnText, setDeletModal, checkedItems }) {
  const userInfo = useUserInfo();
  const handleModalBackground = (e) => {
    handleModal();
    e.stopPropagation();
  }
  const axiosAuth = useAxiosAuth();


  const handleModal = (e) => {
    setDeletModal(false)
  }

  const handleConfirm = () => {
    const deleteConfirm =  window.confirm('정말로 삭제하시겠습니까?');

    if(deleteConfirm) {
      // 확인 버튼을 누르면 삭제 동작을 수행
      axiosAuth.delete(`${apiBaseUrl}/notice/delete`, { data: { checkedItems }, })
        .then(result => {
          if (result.data === 'ok') {
            alert('삭제가 완료되었습니다!')
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
    }
    // 모달 닫기
    handleModal();
  };

  return (
    <div className='modal_container' onClick={handleModalBackground}>
      <div className='modal_content deleteModal'>
        <img src='/assets/images/main_logo.png' alt='onstayhouse 로고 이미지' />
        <div className='text_wrap'>
          <p>{userInfo.user_name} 관리자님</p>
          <p>총 <strong>{checkedItems.length || '0'}</strong>개 공지사항 정말 삭제하시겠습니까?</p>
          <p>(삭제 시 복구 불가능합니다.)</p>
        </div>
        <div className='btn_wrap'>
          <button type='button' className='close_btn'
            onClick={handleModal}>닫기</button>
          <button type='button' className='delete_btn'
            onClick={handleConfirm}>{btnText || '확인'}</button>
        </div>
      </div>
    </div>
  );
}

