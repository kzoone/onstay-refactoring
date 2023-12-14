import { FaFilter } from "react-icons/fa";

export default function MemberDateFilter({joinDateRange, setJoinDateRange}) {

  const handleDateRange = e => {
    if (e.target.name === 'min' && e.target.value > joinDateRange.max && joinDateRange.max) {
      alert('날짜 범위의 최솟값은 최댓값보다 작거나 같아야 합니다.')
      return setJoinDateRange({ ...joinDateRange, min: '' })
    } else if (e.target.name === 'max' && e.target.value < joinDateRange.min && joinDateRange.min && e.target.value) {
      alert('날짜 범위의 최댓값은 최솟값보다 크거나 같아야 합니다.')
      return setJoinDateRange({ ...joinDateRange, max: '' })
    }
    setJoinDateRange({ ...joinDateRange, [e.target.name]: e.target.value})
  }

  return (
    <div className='join_date_filter'>
        <div className='filter_title'><FaFilter /> 가입</div>
        <p>
          <input onChange={handleDateRange} value={joinDateRange.min} type="date" name='min' />
          ~
          <input onChange={handleDateRange} value={joinDateRange.max} type="date" name='max' />
        </p>
      </div>
  );
}