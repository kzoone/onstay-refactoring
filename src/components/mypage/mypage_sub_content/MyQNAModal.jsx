import { useEffect, useState } from 'react';
import MyQNAForm from './MyQNAForm';
import axios from 'axios';

export function MyQNAModal({closeModal, user_id, question_id}) {
  let [showContent, setShowContent] = useState('question')
  let [question, setQuestion] = useState({})
  
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
          <li onClick={handleContent} data-content='question' className={showContent==='question' ? 'active' : ''}
              style={{cursor : question.answer_id ? 'pointer' : 'default'}}
          >
            내 문의
            </li>
          {question.answer_id && <li onClick={handleContent} data-content='answer' className={showContent==='answer' ? 'active' : ''}>
          관리자 답변
          </li>}
        </ul>
        {showContent==='question' 
        ? <MyQNAForm isAnswerExist={question.answer_id ? true : false} isModal={true} 
                      question_id={question_id} defaultQuestion={question} user_id={user_id}/>
        : 
        <div className='admin_answer'>
            <label htmlFor='answer'>관리자의 답변이 도착했어요 !</label>
            <label htmlFor='answer'>(답변일 : {question?.answer_date})</label>
            <textarea readOnly className='answer_textbox'>
              {question?.answer_content}
            </textarea>
        </div>
        }
      </div>
    </div>
  );
}

export default MyQNAModal;
