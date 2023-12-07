import ManageAcc from './admin_content/ManageAcc';
import ManageMember from './admin_content/ManageMember';
import ManageQNA from './admin_content/ManageQNA';

export default function AdminPageContent(props) {
  let {showContent} = props

  return (
    <div className='mypage_content adminpage_content'>
      {showContent==='ManageMember' && <ManageMember/>}
      {showContent==='ManageQNA' && <ManageQNA/>}
      {showContent==='ManageAcc' && <ManageAcc/>}
    </div>
  ); 
}