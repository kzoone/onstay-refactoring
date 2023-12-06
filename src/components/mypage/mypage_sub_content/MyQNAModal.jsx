import { useEffect, useState } from 'react';
import MyQNAForm from './MyQNAForm';
import axios from 'axios';

export function MyQNAModal({closeModal, user_id, question_id}) {
  let [showContent, setShowContent] = useState('question')
  let [question, setQuestion] = useState({question_title : ''})
  
  const handleContent = e => setShowContent(e.target.dataset.content)
  
  useEffect(()=>{
    axios({
      url : 'http://localhost:8000/mypage/question/' + question_id,
      method : 'get'
    })
    .then(res => {
      setQuestion(res.data)
    })
    .catch(err => {
      console.log(err);
    })

  },[question_id])
 
  return (
    <div className="modal_container qna_modal">
      <div className="qna_modal_content">
        <div>
            <button onClick={closeModal} className='close_btn'>X</button>
        </div>
        <ul className='qna_modal_navbar'>
          <li onClick={handleContent} data-content='question' className={showContent==='question' ? 'active' : ''}>
            내 문의
            </li>
          {<li onClick={handleContent} data-content='answer' className={showContent==='answer' ? 'active' : ''}>
            관리자 답변
          </li>}
        </ul>
        {showContent==='question' 
        ? <MyQNAForm isModal={true} defaultQuestion={question} user_id={user_id}/>
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
