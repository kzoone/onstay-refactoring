import { IoMdSearch } from "react-icons/io";

export default function MemberSearch ({search, setSearch, isLoading, searchedUserCnt}) {

  const handleSearch = (e) => {
    if (e.target.id==='search_terms') {
      setSearch({...search, terms : e.target.value})
    } else {
      setSearch({...search, query : e.target.value})
    }
  }

  return (
    <>
      {/* 검색 결과(or 로딩중) 텍스트 */}
      <div className={`search_result ${isLoading ? 'loading' : ''}`}>
      {isLoading
        ? `검색중입니다.... `
        : `${searchedUserCnt}명의 회원을 조회하였습니다.`}
      </div>

      {/* 검색 폼 */}
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
    </>
  );
}