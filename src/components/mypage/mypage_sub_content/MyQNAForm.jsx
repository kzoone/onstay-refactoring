import { useEffect, useRef, useState } from "react";
import axiosAuth from './../../../services/axiosAuth';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import ConfirmModal from '../../common/ConfirmModal';


export function MyQNAForm({isAnswerExist, isModal, defaultQuestion, user_id, question_id}) {
  let [form, setForm] = useState({user_id : user_id, 
                                  question_category : 'default', 
                                  question_title: '', 
                                  question_content: ''})
  let [contentLength, setContentLength] = useState(0)
  let [isEditable, setEditable] = useState(isModal ? false : true) // modal 이면 기본 값을 수정 불가능으로
  let [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(()=>{
    if (defaultQuestion) {
      setForm({
        user_id : user_id,
        question_category : defaultQuestion.question_category || '',
        question_title: defaultQuestion.question_title || '',
        question_content : defaultQuestion.question_content || ''
      })
    }
  },[defaultQuestion])

  const handleChange = e => {
    // question_category는 int 형태로 보내주기 위함
    setForm({...form, [e.target.name] : Number(e.target.value) || e.target.value})
    if (form.question_content.length>500) { // 글자수 500자 넘으면 경고 및 슬라이싱
      alert('최대 500자까지 입력 가능합니다.')
      setForm({...form,  question_content : form.question_content.slice(0,500)})
    }
  } 

  const handleSubmit = e => {
    e.preventDefault()
    if (form.question_category==='default') return alert('문의 유형을 선택해주세요.')
    else if (!form.question_title.length) return alert('문의 제목을 반드시 작성해주세요.')
    else if (form.question_title.length>100) return alert('문의 제목은 100자 이내로 작성해주세요.')

    axiosAuth({
      url : 'http://localhost:8000/mypage/question',
      method : 'post',
      data : form
    })
    .then(res => {
      alert('1:1 문의를 등록하였습니다. 최대한 빠르게 답변해드리겠습니다.')
      setForm({user_id : user_id, question_category:'default', question_title:'', question_content:''})
      // 바로 qna 리스트 보여줄 수 있도록 쿼리스트링 포함
      // 만약 setShowQnaContent 를 전달하여 리로딩 없이 바꿀 수 있다면 추후 변경하는게 좋아보임
      window.location.href = '/mypage?showContent=MyQNA&subContent=MyQNAList'; 
    })
    .catch(err => {
      alert(err.response.data.message)
    })
  } // 1:1 문의 신규 등록 (모달 아닌 경우)


  const updateQuestion = () => {
    if (form.question_category==='default') return alert('문의 유형을 선택해주세요.')
    else if (!form.question_title.length) return alert('문의 제목을 반드시 작성해주세요.')
    else if (form.question_title.length>100) return alert('문의 제목은 100자 이내로 작성해주세요.')

    const body = {...form, question_id}

    axiosAuth({
      url : 'http://localhost:8000/mypage/question',
      method : 'put',
      data : body
    })
    .then(res => {
      alert('1:1 문의 내용을 수정하였습니다');
      window.location.href = '/mypage?showContent=MyQNA&subContent=MyQNAList'; 
    })
    .catch(err => {
      alert(err.response.data.message);
    })
  }

  const cancelModify = () => {
    setForm({
      user_id : user_id,
      question_category : defaultQuestion.question_category || '',
      question_title: defaultQuestion.question_title || '',
      question_content : defaultQuestion.question_content || ''
    })
    setEditable(false)
  }

  const deleteQuestion = () => {
    axiosAuth({
      method : 'delete',
      url : 'http://localhost:8000/mypage/question',
      data : {question_id}
    })
    .then(res => {
      alert('1:1 문의를 삭제하였습니다.');
      window.location.href = '/mypage?showContent=MyQNA&subContent=MyQNAList'; 
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(()=>{
    setContentLength(form.question_content.length)
    if (contentLength >= 0 && contentLength < 301) { // 글자수에 따라 색상으로 표시해줌
      document.querySelector('.question_form small.min').style.color = 'black';
    } else if (contentLength >= 301 && contentLength < 401) {
      document.querySelector('.question_form small.min').style.color = 'orange';
    } else {
      document.querySelector('.question_form small.min').style.color = 'red'
    }
  },[form.question_content])

  return (
    <form className="question_form" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="question_category">문의 유형</label>
        <select disabled={!isEditable} value={form.question_category} onChange={handleChange} name="question_category" id="question_category">
          <option value='default' className="placeholder" disabled>문의 유형을 선택해주세요</option>
          <option value="1">예약 문의</option>
          <option value="2">오류 신고</option>
          <option value="3">서비스 제안</option>
          <option value="4">기타</option>
        </select>
      </p>
      <p>
        <label htmlFor="question_title">문의 제목</label>
        <input readOnly={!isEditable} value={form.question_title} onChange={handleChange} type="text" id='question_title' name="question_title" placeholder="문의 제목을 작성해주세요"/>
      </p>
      <p>
        <label className="question_content" htmlFor="question_content">문의 내용</label>
        <textarea readOnly={!isEditable} value={form.question_content} onChange={handleChange} id='question_content' name="question_content"/>
        <div className="question_content_length">
          <small className="min">{contentLength}</small>/<small className="max">500</small>
        </div>
      </p>
      {/* 모달 아닌 경우 (신규 등록 폼) */}
      {(!isModal && isEditable) && <button className="black_box" type="submit">문의 제출</button>}

      {/* 모달인 경우 (내용 조회 및 수정 폼) */}
      <div className='modal_btn_container'>
      {(isModal && !isEditable && !isAnswerExist) && 
      <button onClick={()=>{setEditable(true)}} className="question_black_btn" type='button'>
        <FaPencil/><span>수정하기</span>
      </button>}
      {(isModal && !isEditable) && 
      <button onClick={()=>{setShowDeleteModal(true)}} className='question_red_btn' type='button'>
        <MdDelete/><span>삭제하기</span>
      </button>}
      {(isModal && isEditable) && <> 
      <button className='question_blue_btn' type='button' onClick={updateQuestion}>
        <FaPencil/><span>수정완료</span>
      </button>
      <button onClick={cancelModify} className='question_black_btn' type='button'>
        <IoArrowBackOutline/><span>변경 내용 취소</span>
     </button>
     </>}
      </div>
      {showDeleteModal &&
      <ConfirmModal noti_1={'1:1 문의를 정말 삭제하시겠습니까?'} noti_2={'삭제된 문의 내용은 복구할 수 없습니다'} 
                    handleModal={()=>{setShowDeleteModal(false)}} handleConfirm={deleteQuestion}/>
      }
    </form>
  );
}

export default MyQNAForm