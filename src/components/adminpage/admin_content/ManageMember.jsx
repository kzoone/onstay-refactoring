import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MemberList from '../managemember/MemberList';
import MemberSearch from '../managemember/MemberSearch';
import MemberSort from '../managemember/MemberSort';
import MemberDateFilter from '../managemember/MemberDateFilter';

export default function ManageMember() {
  const [users, setUsers] = useState([]); // 초기에만 가져오는 모든 유저 정보
  const [filterdUsers, setFilterdUsers] = useState([]) // 필터링, 검색, 소팅 된 유저 정보
  const [search, setSearch] = useState({ terms: 'user_id', query: '' }) // 검색 기준(terms), 검색어(query)
  const [joinDateRange, setJoinDateRange] = useState({ min: '', max: '' }) // 가입 일자 범위 필터
  const [page, setPage] = useState(1); // 페이지네이션 
  const [isLoading, setLoading] = useState(false); // 검색 시 로딩
  
  useEffect(() => {
    axios({
      url: 'http://localhost:8000/adminpage/users',
      method: 'get'
    })
      .then(res => {
        setUsers(res.data)
        setFilterdUsers(res.data)
      })
      .catch(err => console.log(err))
  }, []) // 모든 유저 정보 담아오기 (원본)


  useEffect(() => {
    if (users.length) { // 처음 마운트 되었을때 users가 빈배열일때 실행되어 이상하게 작동하는것을 방지
      setLoading(true)

      let timeoutId = setTimeout(() => {
        let copy = users.map(v => { return { ...v } })

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
        setLoading(false)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [search.query, joinDateRange]) // 검색 및 날짜 필터링


  const handlePage = page => setPage(page)


  return (
    <div className='manage_member'>
      <h3 className='content_title'>회원 관리</h3>
      {/* 가입 일자 범위 필터 */}
      <MemberDateFilter joinDateRange={joinDateRange} setJoinDateRange={setJoinDateRange} />

      {/* 정렬 기능 */}
      <MemberSort setPage={setPage} 
      filterdUsers={filterdUsers} setFilterdUsers={setFilterdUsers}/>

      {/* 필터, 검색, 정렬 적용된 회원 리스트 */}
      {filterdUsers.length
        ? <MemberList users={filterdUsers} page={page} />
        : <div className='member_no_list'>검색 조건에 맞는 회원 정보가 없습니다.</div>
      }

      {/* 회원 검색 폼 */}
      <MemberSearch search={search} setSearch={setSearch} isLoading={isLoading} searchedUserCnt={filterdUsers.length} />

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