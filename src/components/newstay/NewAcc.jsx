import { Link } from 'react-router-dom';
import NewStayAvata from '../home/newstaysection/NewStayAvata';
import NewAccContent from './NewAccContent';

export default function NewAcc(props) {
  const newStayAllList = props.newStayAllList;

  return (
    <ul className='new_acc_wrap'>
      {newStayAllList.map(newStay =>
        <li key={'newAcc' + `${newStay.acc_id}`}>
          <NewStayAvata acc_img={newStay.acc_img} />
          <Link to={`/findstay/acc/${newStay.acc_id}`}>
            <NewAccContent acc_id={newStay.acc_id} acc_name={newStay.acc_name} area_code={newStay.area_code} />
          </Link>
        </li>)}
    </ul>
  );
};