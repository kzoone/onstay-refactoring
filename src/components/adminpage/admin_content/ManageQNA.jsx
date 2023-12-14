import { useState } from 'react';


export default function ManageQNA() {
  const [showContent, setShowContent] = useState('Waiting')
  const handleClick = e => setShowContent(e.target.dataset.content) 

  return (
    <div className='admin_qna'>
      <ul className="admin_qna_navbar">
        <li onClick={handleClick} data-content='Waiting' className={showContent==='Waiting' ? 'active' : ''}>답변 대기</li>
        <li onClick={handleClick} data-content='Complete' className={showContent==='Complete' ? 'active' : ''}>답변 완료</li>
      </ul>
    </div>
  ); 
}