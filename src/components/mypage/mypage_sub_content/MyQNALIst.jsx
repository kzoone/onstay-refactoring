import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { QUESTION_CATEGORY } from '../../../constants/constants';
import MyQNAModal from './MyQNAModal';
import axios from 'axios';

export function MyQNAList({ user_id, setShowQnaContent, showQnacontent }) {
  let [questions, setQuestions] = useState([]);
  let [modal, setModal] = useState({question_id : '', show : false})

  useEffect(() => {
    axios({
      url: 'http://127.0.0.1:8000/mypage/questions/' + user_id,
      method: 'get',
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  const showModal = (e) => {
    setModal({
      question_id : e.currentTarget.dataset.qid,
      show : true
    })
  }
  const closeModal = () => {
    setModal({...modal, show : false})
  }

  return (
    <>
      {questions.length ? (
        <Table className="qna_list_table" striped bordered hover>
          <thead>
            <tr>
              <th className="row_num">#</th>
              <th className="qna_category">문의 유형</th>
              <th className="qna_title">
                <span>문의 제목</span>
              </th>
              <th className="update_date">최종 수정일</th>
              <th className="answer_state">답변</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr onClick={showModal} 
                  key={question.question_id} 
                  data-qid={question.question_id}
                  >
                <td className="row_num">{question.rno}</td>
                <td className="qna_category">{QUESTION_CATEGORY[question.question_category]}</td>
                <td className="qna_title">
                  <span>{question.question_title}</span>
                </td>
                <td className="update_date">{question.update_date}</td>
                <td className="answer_state">
                  {question.answer_state ? <span className='completed'>완료</span> : <span className='waiting'>대기</span>}
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='qna_nolist'>
          <div>작성하신 1:1 문의가 없습니다. </div>
          <button onClick={()=>setShowQnaContent('MyQNAForm')}>문의하러 가기</button>
        </div>
      )}
      {modal.show && <MyQNAModal closeModal={closeModal} question_id={modal.question_id} user_id={user_id} />}
    </>
  );
}

export default MyQNAList;
