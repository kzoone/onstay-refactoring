import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export function NoticeDetail(props) {
  const location = useLocation();

  const {page} = useParams();
  console.log(page);
  
  return (
    <Link to='/notice' state={{page : page}}>뒤로가기</Link>
  );
};