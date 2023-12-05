import { useState } from 'react';
import MyQNAForm from './MyQNAForm';

export function MyQNAModal() {
  let [form, setForm] = useState({
    user_id: '',
    question_category: 'default',
    question_title: '',
    question_content: '',
  });
  let [contentLength, setContentLength] = useState(0);
  let [showContent, setShowContent] = useState('question')
  
  const handleContent = e => setShowContent(e.target.dataset.content)
 
  return (
    <div className="modal_container qna_modal">
      <div className="qna_modal_content">
        <div>
            <button className='close_btn'>X</button>
        </div>
        <ul className='qna_modal_navbar'>
          <li onClick={handleContent} data-content='question' className={showContent==='question' ? 'active' : ''}>내 문의</li>
          <li onClick={handleContent} data-content='answer' className={showContent==='answer' ? 'active' : ''}>관리자 답변</li>
        </ul>
        {showContent==='question' 
        ? <MyQNAForm />
        : 
        <div className='admin_answer'>
            <label htmlFor='answer'>관리자의 답변이 도착했어요 !</label>
            <div className='answer_textbox'></div>
        </div>
        }
      </div>
    </div>
  );
}

export default MyQNAModal;
