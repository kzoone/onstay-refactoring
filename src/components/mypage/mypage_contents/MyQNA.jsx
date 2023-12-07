
import { useState } from 'react';
import MyQNAForm from '../mypage_sub_content/MyQNAForm';
import MyQNAList from '../mypage_sub_content/MyQNALIst';
import { useLocation } from 'react-router-dom';

export function MyQNA ({user_id}) {
  const location = useLocation();
  let defaultSubContent = new URLSearchParams(location.search).get('subContent') || 'MyQNAForm'
  const [showQnacontent, setShowQnaContent] = useState(defaultSubContent)
  const handleClick = e => setShowQnaContent(e.target.dataset.content) 
  

  return (
    <div className='my_qna'>
       <ul className="my_qna_navbar">
        <li onClick={handleClick} data-content='MyQNAForm' className={showQnacontent==='MyQNAForm' ? 'active' : ''}>1:1문의</li>
        <li onClick={handleClick} data-content='MyQNAList' className={showQnacontent==='MyQNAList' ? 'active' : ''}>문의내역</li>
      </ul>
      <div className='my_qna_content'>
        {showQnacontent==='MyQNAForm' && <MyQNAForm user_id={user_id}/>}
        {showQnacontent==='MyQNAList' && <MyQNAList user_id={user_id} setShowQnaContent={setShowQnaContent} showQnacontent={showQnacontent}/>}
      </div>
    </div>
  );
}
