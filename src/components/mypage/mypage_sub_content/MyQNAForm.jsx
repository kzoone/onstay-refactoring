import { useEffect, useRef, useState } from "react";
import axiosAuth from './../../../services/axiosAuth';

export function MyQNAForm({user_id}) {
  let [form, setForm] = useState({user_id : user_id, question_category:'default', question_title:'', question_content:''})
  let [contentLength, setContentLength] = useState(0)

  const handleChange = e => {
    // question_category는 int 형태로 보내주기 위함
    setForm({...form, [e.target.name] : Number(e.target.value) || e.target.value})
    console.log(form);
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
      alert(res.data.message)
      // 바로 qna 리스트 보여줄 수 있도록 쿼리스트링 포함
      // 만약 setShowQnaContent 를 전달하여 리로딩 없이 바꿀 수 있다면 추후 변경하는게 좋아보임
      window.location.href = '/mypage?showContent=MyQNA&subContent=MyQNAList'; 
    })
    .catch(err => {
      alert(err.response.data.message)
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

    if (contentLength>500) { // 글자수 500자 넘으면 경고 및 슬라이싱
      alert('최대 500자까지 입력 가능합니다.')
      setForm({...form,  question_content : form.question_content.slice(0,500)})
      setContentLength(500);
    }
  },[form.question_content])

  return (
    <form className="question_form" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="question_category">문의 유형</label>
        <select value={form.question_category} onChange={handleChange} name="question_category" id="question_category">
          <option value='default' className="placeholder" disabled>문의 유형을 선택해주세요</option>
          <option value="1">예약 문의</option>
          <option value="2">오류 신고</option>
          <option value="3">서비스 제안</option>
          <option value="4">기타</option>
        </select>
      </p>
      <p>
        <label htmlFor="question_title">문의 제목</label>
        <input value={form.question_title} onChange={handleChange} type="text" id='question_title' name="question_title" placeholder="문의 제목을 작성해주세요"/>
      </p>
      <p>
        <label className="question_content" htmlFor="question_content">문의 내용</label>
        <textarea value={form.question_content} onChange={handleChange} id='question_content' name="question_content"/>
        <div className="question_content_length">
          <small className="min">{contentLength}</small>/<small className="max">500</small>
        </div>
      </p>
      <button className="black_box" type="submit">문의 제출</button>
    </form>
  );
}

export default MyQNAForm