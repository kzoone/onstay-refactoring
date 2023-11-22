import { Link } from 'react-router-dom';

export default function NewStaySection() {
  return (
    <div className="newstaysection">
      <p>NEW STAY</p>
      <Link to='/newstay'>전체보기 &gt;</Link>
    </div>
  );
};