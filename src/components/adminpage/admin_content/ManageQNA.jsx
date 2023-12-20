import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { QUESTION_CATEGORY } from '../../../constants/constants.js';
import ManageQNAModal from './../manageqna/ManageQNAModal';
import { useLocation } from 'react-router-dom';
import QNACategoryFilter from '../manageqna/QNACategoryFilter.jsx';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function ManageQNA() {
  const location = useLocation();
  const defaultShowContent = new URLSearchParams(location.search).get('QNAContent')
  const [showContent, setShowContent] = useState(defaultShowContent || 'Waiting')
  const [questions, setQusetions] = useState([])
  const [filterdQuestions, setFilterdQuestions] = useState([])
  const [watingCnt, setWaitingCnt] = useState(0)
  const [page, setPage] = useState(1); // 페이지네이션 
  const [categoryFilter, setCategoryFilter] = useState({
    modalShow:false, 
    showCategory:{
      '1':true, '2':true, '3':true, '4':true
  }})

const [modal, setModal] = useState({question : {}, show : false});


  useEffect(()=>{
    axios({
      url : `${apiBaseUrl}/adminpage/questions/${showContent}`,
      method : 'get'
    })
    .then(res => {
      setQusetions(res.data);
      setFilterdQuestions(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[showContent])

  useEffect(()=>{
    axios.get(`${apiBaseUrl}/adminpage/questions/Waiting`)
    .then(res => {
      setWaitingCnt(res.data.length)
    })
    .catch(err => console.log(err))
  },[])

  useEffect(()=> {
    let copy = questions.map(v=>({...v}));
    let checkedCategories = Object.keys(categoryFilter.showCategory)
                            .filter(n=>categoryFilter.showCategory[n]===true).map(v=>Number(v))
    copy = copy.filter(v=>checkedCategories.includes(v.question_category))
    setFilterdQuestions(copy)
  },[categoryFilter.showCategory])

  const handleClick = e => {
    setShowContent(e.target.dataset.content)
    setCategoryFilter({
      modalShow:false, 
      showCategory:{'1':true, '2':true, '3':true, '4':true}
    })
  };

  const handlePage = page => setPage(page)

  const handleModal = (question) => () => setModal({show:true, question:question})
  

  return (
    <div className='admin_qna'>
      <ul className="admin_qna_navbar">
        <li onClick={handleClick} data-content='Waiting' className={showContent==='Waiting' ? 'active' : ''}>
          답변 대기({watingCnt})
          </li>
        <li onClick={handleClick} data-content='Complete' className={showContent==='Complete' ? 'active' : ''}>
          답변 완료
          </li>
      </ul>

      <QNACategoryFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>
      
      {filterdQuestions.length
      ? <Table className='qna_list_table' striped bordered >
          <thead>
            <tr>
              <th className="row_num">#</th>
              <th className="qna_category">문의 유형</th>
              <th className="qna_title">문의 제목</th>
              <th className="user_id">아이디</th>
              <th className="update_date">{showContent==='Waiting' ? '최종수정일' : '답변완료일'}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length : 10}, (_, index) => {
              const question = filterdQuestions[index + 10 * (page - 1)];
              return (
                <tr onClick={question ? handleModal(question) : ()=>{}} className={!question ? 'empty_row' : ''}>
                  <td><span className="row_num">{question ? question.rno : ''}</span></td>
                  <td><span className="qna_category">{question ? QUESTION_CATEGORY[question.question_category] : ''}</span></td>
                  <td><span className="qna_title">{question ? question.question_title : ''}</span></td>
                  <td><span className="user_id">{question ? question.user_id : ''}</span></td>
                  <td>
                    <span className="update_date">
                      {question ? (showContent==='Waiting' ? question.question_update_date?.slice(2) 
                                                           : question.answer_update_date?.slice(2))
                                : ''}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        : <div className='qna_no_list'>조건에 맞는 문의 내역이 없습니다.</div>
        }

        <Pagination 
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={filterdQuestions.length}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePage}
      />
      {modal.show && 
        <ManageQNAModal question={modal.question} closeModal={()=>setModal({...modal, show:false})}/>
      }
    </div>
  ); 
}