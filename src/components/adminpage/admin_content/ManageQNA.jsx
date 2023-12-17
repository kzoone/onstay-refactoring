import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { QUESTION_CATEGORY } from '../../../constants/constants.js';
import { FaFilter } from "react-icons/fa";



export default function ManageQNA() {
  const [showContent, setShowContent] = useState('Waiting')
  const [questions, setQusetions] = useState([])
  const [filterdQuestions, setFilterdQuestions] = useState([])
  const [page, setPage] = useState(1); // 페이지네이션 
  const [categoryFilter, setCategoryFilter] = useState({
    modalShow:false, 
    showCategory:{
      1:true, 2:true, 3:true, 4:true
    }})


  useEffect(()=>{
    axios({
      url : 'http://localhost:8000/adminpage/questions/' + showContent,
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

  const handleClick = e => setShowContent(e.target.dataset.content) 

  const handlePage = page => setPage(page)

  const handleFilterModal = () => {
    setCategoryFilter({...categoryFilter, modalShow : !categoryFilter.modalShow})
  }

  const handleCategoryFilter = e => {
    setCategoryFilter({...categoryFilter, showCategory:{...categoryFilter.showCategory, 
      [e.target.dataset.category] : !categoryFilter.showCategory[e.target.dataset.category]}})
  }
  return (
    <div className='admin_qna'>
      <ul className="admin_qna_navbar">
        <li onClick={handleClick} data-content='Waiting' className={showContent==='Waiting' ? 'active' : ''}>답변 대기</li>
        <li onClick={handleClick} data-content='Complete' className={showContent==='Complete' ? 'active' : ''}>답변 완료</li>
      </ul>
      
      <div className='category_filter'>
        <button className={categoryFilter.modalShow ? 'active' : ''} type='button' onClick={handleFilterModal}>
          <FaFilter/><span>카테고리</span>
        </button>
        <form className={categoryFilter.modalShow ? 'active' : ''} action="">
          <h4>표시할 카테고리</h4>
          <p>
            <label htmlFor="cateogry_reservation">예약 문의</label>
            <input type="checkbox" data-category='1' id='cateogry_reservation' 
            checked={categoryFilter.showCategory['1']}/>
          </p>
          <p>
            <label htmlFor="cateogry_service">서비스 문의</label>
            <input type="checkbox" data-category='2' id='cateogry_service' 
            checked={categoryFilter.showCategory['2']}/>
          </p>
          <p>
            <label htmlFor="cateogry_error">오류 신고</label>
            <input type="checkbox" data-category='3' id='cateogry_error' 
            checked={categoryFilter.showCategory['3']}/>
          </p>
          <p>
            <label htmlFor="cateogry_etc">기타</label>
            <input type="checkbox" data-category='4' id='cateogry_etc' 
            checked={categoryFilter.showCategory['4']}/>
          </p>
        </form>
      </div>

      <Table className='qna_list_table' striped bordered >
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
              const question = questions[index + 10 * (page - 1)];
              return (
                <tr>
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

        <Pagination 
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={filterdQuestions.length}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePage}
      />
    </div>
  ); 
}