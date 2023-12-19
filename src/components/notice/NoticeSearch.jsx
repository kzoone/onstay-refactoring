import NoticeDate from './NoticeDate';

export default function NoticeSearch(props) {
  const { setSearchTerm, searchTerm, setPage, setSelectOption, selectOption,
    setStartDate, startDate, setEndDate, endDate } = props;

  // 검색 후 1 페이지로 초기화 및 검색어가 빈 값일 경우 알림
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    if (selectOption === 'title') {
      if (searchTerm.trim() === '') {
        alert('검색어를 입력해주세요');
      }
    } else if (selectOption === 'date') {
      if (!startDate || !endDate) {
        alert('날짜를 선택해주세요.');
      }
    }
  }

  // onChange option
  const handleSelectChange = (e) => {
    setPage(1);
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    setSelectOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleCilck = () => {
    setPage(1);
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className='notice_filter'>
      <form onSubmit={handleSubmit}>
        <select id='notice' onChange={handleSelectChange}>
          <option value='title' >제목</option>
          <option value='date'>날짜</option>
        </select>
        <div>
          {selectOption === 'title' ?
            <input type='text'
              placeholder='검색할 제목을 입력해주세요.'
              value={searchTerm}
              onChange={handleInputChange}
            /> :
            <NoticeDate
              startDate={startDate}
              endDate={endDate}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
            />
          }
        </div>
      </form>
        <button type='button' onClick={handleCilck}>RESET</button>
    </div>
  );
};