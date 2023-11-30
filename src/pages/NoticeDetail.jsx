import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export function NoticeDetail(props) {
  // const {onLoad} = props;
  const navigate = useNavigate();
  const location = useLocation();
  // const page = location.state.page;

  const {page} = useParams();
  console.log(page);
  
  return (
    // <button onClick={() => { navigate(-1) }} >뒤로가기</button>
    <Link to='/notice' state={{page : page}}>뒤로가기</Link>
  );
};