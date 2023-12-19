import { useEffect } from 'react'

export default function MemberSort({sort, setSort, setPage, setFilterdUsers}) {

  useEffect(() => {
    setFilterdUsers(filterdUsers => {
      let copy = filterdUsers.map(v => { return { ...v } })
      copy.sort((a, b) => {
        if (a[sort.sortBy] > b[sort.sortBy]) {
          return sort.desc ? -1 : 1
        } else if (a[sort.sortBy] < b[sort.sortBy]) {
          return sort.desc ? 1 : -1
        } else {
          return a.user_id - b.user_id
        }
      })
      return copy
    })
  }, [sort]) // 소팅 (정렬)

  const handleSort = (e) => {
    setPage(1)
    setSort(
      sort.sortBy === e.target.dataset.sortby
        ? { ...sort, desc: !sort.desc } // 현재 정렬 기준과 같은 버튼을 누르면, 정렬 순서를 토글하도록
        : { sortBy: e.target.dataset.sortby, desc: false } // 다른 정렬 기준으로 변경 (default는 오름차순)
    )
  }

  return (
    <ul className='sort_btns'>
        <li onClick={handleSort} data-sortby='user_id'
          className={`${sort.sortBy === 'user_id' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          아이디
        </li>
        <li onClick={handleSort} data-sortby='user_email'
          className={`${sort.sortBy === 'user_email' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          이메일
        </li>
        <li onClick={handleSort} data-sortby='user_name'
          className={`${sort.sortBy === 'user_name' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          이름
        </li>
        <li onClick={handleSort} data-sortby='join_date'
          className={`${sort.sortBy === 'join_date' && 'active'} ${sort.desc ? 'desc' : 'asc'}`}>
          가입 일자
        </li>
      </ul>
  );
}