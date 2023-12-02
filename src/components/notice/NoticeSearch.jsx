import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export default function NoticeFilter(props) {
  const { setSearchTerm, searchTerm, setPage, setSelectOption, selectOption,
    setStartDate, startDate, setEndDate, endDate, fetchData } = props;

  // 검색 후 1 페이지로 초기화 및 검색어가 빈 값일 경우 알림
  const search = () => {
    setPage(1);
    if(selectOption === 'title') {
      if (searchTerm.trim() === '') {
        alert('검색어를 입력해주세요');
      }
    } else if(selectOption === 'date') {
      if (!startDate || !endDate ) {
        alert('날짜를 선택해주세요.')
      }
    }
  }

  console.log(startDate, endDate);
  // 클릭 이벤트
  const handleSearch = () => {
    search();
  };

  // submit 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  }

  // onChange option
  const handleSelectChange = (e) => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    setSelectOption(e.target.value);
    // fetchData();
  };

  // onChange value
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
            <>
              <DatePicker
                locale={ko}
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText='시작일'
                dateFormat='yyyy-MM-dd'
              />
              <DatePicker
                locale={ko}
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText='종료일'
                minDate={startDate}
                dateFormat='yyyy-MM-dd'
              />
            </>
          }
        </div>
      </form>
      <button type='button' onClick={handleSearch}>SEARCH</button>
    </div>
  );
};