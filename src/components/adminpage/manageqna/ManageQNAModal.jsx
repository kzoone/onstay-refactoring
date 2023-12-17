import { useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { QUESTION_CATEGORY } from './../../../constants/constants';





export default function ManageQNAModal({question, closeModal}) {
  let [showContent, setShowContent] = useState('question');
  let [isEditMode, setIsEditMode] = useState(false)
  let [answer, setAnswer] = useState(question.answer_content || '')


  const handleChange = e => setAnswer(e.target.value)
  const handleClick = e => setShowContent(e.target.dataset.content)

  return (
    <div className='manage_qna_modal'>
      <div className='modal_content'>
      <div className='modal_header'>
          <button className='close_btn' onClick={closeModal}>X</button>
      </div>
      <ul className='qna_modal_navbar'>
        <li data-content='question' onClick={handleClick} className={showContent==='question' ? 'active' : ''}>
          문의 내용
        </li>
        <li data-content='answer' onClick={handleClick} className={showContent==='answer' ? 'active' : ''}>
          답변
        </li>
      </ul>
        {showContent==='question'
        ? <form className='question_form'>
          <p>
            <label htmlFor="question_category">문의 유형</label>
            <input type="text" id='question_category' disabled value={QUESTION_CATEGORY[question.question_category]}/>
          </p>
          <p>
            <label htmlFor="question_category">문의 제목</label>
            <input type="text" id='question_title' disabled value={question.question_title}/>
          </p>
          <p>
            <label htmlFor="question_category">문의 내용</label>
            <textarea type="text" id='question_content' disabled value={question.question_content}/>
          </p>
          <div className="modal_btn_container">
            <button type='button' className='black_btn'>
              <span>답변보기</span>  
            </button>
          </div>
        </form>
        : <form className='answer_form'>
          <p>
            <label htmlFor="answer_recipient">질문자 아이디</label>
            <input type="text" id='answer_recipient' value={question.user_id} disabled/>
          </p>
          <p>
            <label htmlFor="answer_content">답변 내용</label>
            <textarea type="text" id='answer_content' disabled={!isEditMode} value={answer} onChange={handleChange}/>
            <span className="question_content_length">
              <small className="min">12</small>/<small className="max">500</small>
            </span>
          </p>
          <div className="modal_btn_container">
            {isEditMode && <button type='submit' className='black_btn'>
              <FaPencil/><span>등록하기</span>  
            </button>}
           {!isEditMode && <button type='button' className='red_btn'>
              <MdDelete/><span>삭제하기</span>  
            </button>}
          </div>
          {(!isEditMode && !answer.length) && 
          <div className='no_answer'>
            <p>아직 답변을 등록하지 않았습니다.</p>
            <p>{question.user_id}님에게 답변을 달아주세요.</p>
            <div className="modal_btn_container">
              <button onClick={()=>setIsEditMode(true)} type='button' className='black_btn'><FaPencil/> 답변 작성</button>
            </div>
          </div>}
          </form>
          }
      </div>
    </div>
  );
}