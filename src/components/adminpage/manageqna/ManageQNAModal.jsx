import { useEffect, useRef, useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { QUESTION_CATEGORY } from './../../../constants/constants';
import axiosAuth from '../../../services/axiosAuth';
import ConfirmModal from './../../common/ConfirmModal';
import LoadingSpinner from './../../common/LoadingSpinner';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function ManageQNAModal({question, closeModal}) {
  let [showContent, setShowContent] = useState('question');
  let [isEditMode, setIsEditMode] = useState(false)
  let [answer, setAnswer] = useState(question.answer_content || '')
  let [contentLength, setContentLength] = useState(0);
  let [showModal, setShowModal] =  useState(false);
  let [postLoading, setPostLoading] = useState(false);


  useEffect(()=>{
    setContentLength(answer.length)
  },[answer])


  const handleChange = e => {
    setAnswer(e.target.value)
    if (answer.length > 500) {
      alert('최대 500자까지 입력 가능합니다.')
      setAnswer(answer.slice(0,500))
    }
  }

  const handleClick = e => setShowContent(e.target.dataset.content)

  const cancelEdit = () => {
    setAnswer(question.answer_content || '')
    setIsEditMode(false)
  }

  const handleSubmit = e => {
    e.preventDefault();
    const {question_id, question_title, answer_id, user_id} = question
    if (!question.answer_id) {
      setPostLoading(true);
    } // 등록일때 (이메일 보내는 시간이 걸려서 로딩 설정)
    axiosAuth({
      url : `${apiBaseUrl}/adminpage/answer`,
      method : question.answer_id ? 'put' : 'post',
      data : {question_id, question_title, answer_id, user_id, answer_content : answer}
    })
    .then(res => {
      alert(res.data.message)
      setPostLoading(false);
      window.location.href = '/adminpage?showContent=ManageQNA&QNAContent=Complete'
    })
    .catch(err => {
      alert(err.response.data.message)
      window.location.href = '/adminpage?showContent=ManageQNA'
    })
  }

  const removeAnswer = () => {
    axiosAuth({
      url : `${apiBaseUrl}/adminpage/answer`,
      method : 'delete',
      data : {question_id : question.question_id}
    })
    .then(res => {
      alert('답변을 삭제하였습니다.');
      window.location.href = '/adminpage?showContent=ManageQNA'
    })
    .catch(err => {
      alert(err.response.data.message)
    })
  }

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
            <button type='button' className='black_btn' onClick={()=>setShowContent('answer')}>
              <span>답변보기</span>  
            </button>
          </div>
        </form>
        : <form className='answer_form' onSubmit={handleSubmit}>
          <p>
            <label htmlFor="answer_recipient">질문자 아이디</label>
            <input type="text" id='answer_recipient' value={question.user_id} disabled/>
          </p>
          <p>
            <label htmlFor="answer_content">답변 내용</label>
            <textarea type="text" id='answer_content' disabled={!isEditMode} value={answer} onChange={handleChange}/>
            <span className="question_content_length">
              <small className="min">{contentLength}</small>/<small className="max">500</small>
            </span>
          </p>
          <div className="modal_btn_container">
            {!isEditMode && 
            <button type='button' className='black_btn' onClick={()=>setIsEditMode(true)}>
              <FaPencil/><span>수정하기</span>  
            </button>}
           {!isEditMode && 
           <button type='button' className='red_btn' onClick={()=>setShowModal(true)}>
              <MdDelete/><span>삭제하기</span>  
            </button>}
            {isEditMode && 
            <button type='submit' className={!question.answer_id ? 'black_btn' : 'blue_btn'}>
              <FaPencil/><span>{!question.answer_id ? '등록하기' : '수정완료'}</span>  
            </button>}
            {(isEditMode && question.answer_id) && 
            <button type='button' className={'black_btn'} onClick={cancelEdit}>
              <IoArrowBackOutline/><span>변경 내용 취소</span>  
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
      {showModal && <ConfirmModal noti_1={'등록된 답변을 삭제하시겠습니까?'} noti_2={'답변 삭제 시, 내용은 복구할 수 없습니다.'}
                      handleModal={()=>{setShowModal(false)}} handleConfirm={removeAnswer}/>}
      {postLoading && <LoadingSpinner text='Loading...'/>}
    </div>
  );
}