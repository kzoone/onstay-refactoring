import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { QUESTION_CATEGORY } from '../../../constants/constants';
import MyQNAModal from './MyQNAModal';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import QNACategoryFilter from '../../adminpage/manageqna/QNACategoryFilter';

export function MyQNAList({ user_id, setShowQnaContent, showQnacontent }) {
  let [questions, setQuestions] = useState([]);
  let [filterdQuestions, setFilterdQuestions] = useState([]);
  let [modal, setModal] = useState({question_id : '', show : false})
  let [page, setPage] = useState(1);
  let [categoryFilter, setCategoryFilter] = useState({
    modalShow:false, 
    showCategory:{
      '1':true, '2':true, '3':true, '4':true
  }})
  let [completedOnlyFilter, setCompletedOnlyFilter] = useState(false)

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/mypage/questions/' + user_id,
      method: 'get',
    })
      .then((res) => {
        setQuestions(res.data);
        setFilterdQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  useEffect(()=> {
    if (questions.length) {
      let copy = questions.map(v=>({...v}));

      // 문의 유형 필터
      let checkedCategories = Object.keys(categoryFilter.showCategory)
                              .filter(n=>categoryFilter.showCategory[n]===true).map(v=>Number(v))
      copy = copy.filter(v=>checkedCategories.includes(v.question_category))

      // 답변 완료 문의만 보기 필터
      copy = copy.filter(v=> v.answer_state === (completedOnlyFilter ? 1 : v.answer_state));

      setFilterdQuestions(copy)
    }
  },[categoryFilter.showCategory, completedOnlyFilter])

  const showModal = (e) => {
    setModal({
      question_id : e.currentTarget.dataset.qid,
      show : true
    })
  }
  const closeModal = () => {
    setModal({...modal, show : false})
  }

  const handlePage = page => setPage(page)



  return (
    <>
   {questions.length ? <div className='qna_filters'>
        <QNACategoryFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>
        <div className='only_completed_filter'>
          <span>답변 완료 문의만 보기</span>
          <input type="checkbox" checked={completedOnlyFilter} 
          onChange={()=>setCompletedOnlyFilter(!completedOnlyFilter)} />
        </div>
    </div> : null}
      {filterdQuestions.length ? (
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
            {Array.from({length : 10}, (_,idx) => {
              const question = filterdQuestions[(page-1)*10 + idx]
              return (
              <tr onClick={question ? showModal : ()=>{}} className={!question ? 'empty_row' : ''}
                key={question ? question.question_id : `emptyrow${idx}`} 
                data-qid={question ? question.question_id : ''}
                >
               <td className="row_num">{question ? question.rno : ''}</td>
               <td className="qna_category">
                 <span>{question ? QUESTION_CATEGORY[question.question_category] : ''}</span>
               </td>
                <td className="qna_title">
                  <span>{question ? question.question_title : ''}</span>
                </td>
                <td className="update_date">
                 <span>{question ? question.update_date : ''}</span>
                </td>
               <td className="answer_state">
                  {question
                  ? <span style={{color : question.answer_state ? 'blue' : '#000'}}
                          className={question.answer_state ? 'completed' : 'waiting'}>
                    {question.answer_state ? '완료' : '대기'}
                    </span> 
                  : ''}
                </td>
            </tr>
              )
            })}
          </tbody>
        </Table>
      ) 
      : (questions.length ? 
      <div className='qna_no_list'>
        조건에 맞는 문의 내역이 없습니다.
      </div> : null)}
      
      {!questions.length ? <div className='qna_no_question'>
          <div>작성하신 1:1 문의가 없습니다. </div>
          <button onClick={()=>setShowQnaContent('MyQNAForm')}>문의하러 가기</button>
      </div> : null}
      {modal.show && <MyQNAModal closeModal={closeModal} question_id={modal.question_id} user_id={user_id} />}

      {questions.length ? <div className='border_pagination'><Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={questions.length}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePage}
      /></div> : null}
    </>
  );
}

export default MyQNAList;
