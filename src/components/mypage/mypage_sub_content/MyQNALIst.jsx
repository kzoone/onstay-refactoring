import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axiosAuth from '../../../services/axiosAuth';
import { QUESTION_CATEGORY } from '../../../constants/constants';
import MyQNAModal from './MyQNAModal';

export function MyQNAList({ user_id }) {
  let [questions, setQuestions] = useState([]);
  let [modal, setModal] = useState({show : true})

  useEffect(() => {
    axiosAuth({
      url: 'http://localhost:8000/mypage/question/' + user_id,
      method: 'get',
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

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
              <tr className={question.question_id}>
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
        <div>없음 ㅋㅋ</div>
      )}
      {modal.show && <MyQNAModal />}
    </>
  );
}

export default MyQNAList;
