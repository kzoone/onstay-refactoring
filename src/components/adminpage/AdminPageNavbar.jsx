export default function AdminPageNavbar(props) {
  const {showContent, setShowContent} = props;

  const handleClick = (e) => {
    setShowContent(e.target.dataset.content);
    // window.scrollTo({top : 0});
  }

  return (
    <ul className='adminpage_navbar mypage_navbar'>
      <li  onClick={handleClick} data-content='ManageMember' className={showContent==='ManageMember' ? 'active' : ''}>
        회원 관리
      </li>
      <li onClick={handleClick} data-content='ManageQNA' className={showContent==='ManageQNA' ? 'active' : ''}>
        1:1 문의 관리
      </li>
      <li onClick={handleClick} data-content='ManageAcc' className={showContent==='ManageAcc' ? 'active' : ''}>
        숙소 관리
      </li>
    </ul>
  )
}

