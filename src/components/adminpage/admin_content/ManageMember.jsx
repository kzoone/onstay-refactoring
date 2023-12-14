import Pagination from 'react-js-pagination';
import Table from 'react-bootstrap/esm/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";



export default function ManageMember() {
  const [users, setUsers] = useState([]);
  const [filterdUsers, setFilterdUsers] = useState([])
  const [sort, setSort] = useState({sortBy : 'user_id', desc : false})
  const [search, setSearch] = useState({terms : 'user_id', query : ''})
  const [joinDateRange, setJoinDateRange] = useState({min : '', max : ''})
  const [page, setPage] = useState(1); 
  const [isLoading, setLoading] = useState(false)
  

  // 개인정보 보호를 위해 정보 일부만 제외하고 *로 표시하게 하는것
  const infoMasking = {
    name : name => name[0] + "*".repeat(name.length-1),
    email : email => {
      let [account, domain] = email.split('@')
      return account.slice(0,2) + "*".repeat(account.length-2) + "@" + domain
    }
  }
  
  useEffect(()=>{
    axios({
      url : 'http://localhost:8000/adminpage/users',
      method : 'get'
    })
    .then(res => {
      setUsers(res.data)
      let defaultFilterdUsers = [...res.data]
      defaultFilterdUsers.sort((a,b) => {
        if (a.user_id > b.user_id) {
          return sort.desc ? -1 : 1
        } else if (a.user_id < b.user_id) {
          return sort.desc ? 1 : -1
        } else {
          return 0
        }
      })
      setFilterdUsers(defaultFilterdUsers)
    })
    .catch(err => console.log(err))
  },[])

  useEffect(()=>{
    let copy = filterdUsers.map(v=>{return {...v}})
    copy.sort((a,b) => {
      if (a[sort.sortBy] > b[sort.sortBy]) {
        return sort.desc ? -1 : 1
      } else if (a[sort.sortBy] < b[sort.sortBy]) {
        return sort.desc ? 1 : -1
      } else {
        return a.user_id - b.user_id
      }
    })
    setFilterdUsers(copy)
  },[sort]) // 소팅 (정렬)


    useEffect(()=>{
    if (users.length) { // 처음 마운트 되었을때 users가 빈배열일때 실행되어 이상하게 작동하는것을 방지
      setLoading(true)

      let timeoutId = setTimeout(()=>{
        let copy = users.map(v=>{return {...v}}) 

        // 검색어 필터 적용
        copy = copy.filter(user => user[search.terms].includes(search.query.trim()))

        // 날짜 필터 적용
        if (joinDateRange.min) {
          copy = copy.filter(user => user.join_date >= joinDateRange.min)
        }
        if (joinDateRange.max) {
          copy = copy.filter(user => user.join_date <= joinDateRange.max)
        }
        setFilterdUsers(copy)
        setSort({...sort}) // 검색한 뒤 현재 정렬 기준을 유지하도록
        setLoading(false)
      },500)
      
      return () => clearTimeout(timeoutId)
    }
  },[search.query, joinDateRange]) // 검색 및 날짜 필터링



  const handlePage = page => setPage(page)

  const handleSearch = (e) => {
    if (e.target.id==='search_terms') {
      setSearch({...search, terms : e.target.value})
    } else {
      setSearch({...search, query : e.target.value})
    }
  }

  const handleSort = (e) => {
    setPage(1)
    setSort(
      sort.sortBy === e.target.dataset.sortby 
      ? {...sort, desc : !sort.desc} // 현재 정렬 기준과 같은 버튼을 누르면, 정렬 순서를 토글하도록
      : {sortBy : e.target.dataset.sortby, desc:false} // 다른 정렬 기준으로 변경 (default는 오름차순)
    )
  }

  const handleDateRange = e => {
    if (e.target.name==='min' && e.target.value > joinDateRange.max && joinDateRange.max!=='') {
      setJoinDateRange({...joinDateRange, min:''})
      return alert('날짜 범위의 최솟값은 최댓값보다 작거나 같아야 합니다.')
    } else if (e.target.name==='max' && e.target.value < joinDateRange.min && joinDateRange.min!==''  ) {
      setJoinDateRange({...joinDateRange, max:''})
      return alert('날짜 범위의 최댓값은 최솟값보다 크거나 같아야 합니다.')
    }
    setJoinDateRange({...joinDateRange, [e.target.name] : e.target.value})
  }


  return (
    <div className='manage_member'>
      <h3 className='content_title'>회원 관리</h3>
      <div className='join_date_filter'>
        <div className='filter_title'><FaFilter/> 가입</div>
        <p>
          <input onChange={handleDateRange} value={joinDateRange.min} type="date" name='min' />
          ~
          <input onChange={handleDateRange} value={joinDateRange.max}  type="date" name='max' />
        </p>
      </div>
      <ul className='sort_btns'>
        <li onClick={handleSort} data-sortby='user_id' 
            className={`${sort.sortBy==='user_id' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          아이디
        </li>
        <li onClick={handleSort} data-sortby='user_email' 
            className={`${sort.sortBy==='user_email' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          이메일
        </li>
        <li onClick={handleSort} data-sortby='user_name' 
            className={`${sort.sortBy==='user_name' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          이름
        </li>
        <li onClick={handleSort} data-sortby='join_date' 
            className={`${sort.sortBy==='join_date' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          가입 일자
        </li>
      </ul>

      {filterdUsers.length 
      ? <Table className='member_list_table' striped bordered >
          <thead>
            <tr>
              <th className="user_id">아이디</th>
              <th className="user_email">이메일</th>
              <th className="user_name">이름</th>
              <th className="join_date">가입일자</th>
            </tr>
          </thead>
          <tbody>
          {Array.from({ length: 10 }, (_, index) => {
           const user = filterdUsers[index + 10 * (page - 1)];
           return (
           <tr key={user ? user.user_id : `emptyrow${index}`}>
             <td><span>{user ? user.user_id : ''}</span></td>
             <td><span>{user ? infoMasking.email(user.user_email) : ''}</span></td>
             <td><span>{user ? infoMasking.name(user.user_name) : ''}</span></td>
             <td><span>{user ? user.join_date.slice(2) : ''}</span></td>
           </tr>
          );
          })}
          </tbody>
        </Table>
        : 
        <div className='member_no_list'>
        검색 조건에 맞는 회원 정보가 없습니다.
        </div>
        }

      
        <div className={`search_result ${isLoading ? 'loading' : ''}`}>
          {isLoading
          ? `검색중입니다.... `
          : `${filterdUsers.length}명의 회원을 조회하였습니다.`}
        </div>

        <form className='search_form' action="">
          <select onChange={handleSearch} name="search_terms" id="search_terms" value={search.terms}>
            <option value="user_id">아이디</option>
            <option value="user_email">이메일</option>
            <option value="user_name">이름</option>
          </select>
          <div className='search_input'>
            <label className='hidden_label' htmlFor="">검색창</label>
            <input onChange={handleSearch} type="text" value={search.query} placeholder='검색어를 입력해주세요' />
            <IoMdSearch className='search_icon'/>
          </div>
        </form>
        <Pagination className='pagination'
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={filterdUsers.length}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handlePage}
                    />
    </div>
  ); 
}