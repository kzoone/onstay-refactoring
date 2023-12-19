import Table from 'react-bootstrap/esm/Table';

export default function MemberList({users, page}) {

  // 개인정보 보호를 위해 정보 일부만 제외하고 *로 표시하게 하는것
  const infoMasking = {
    name : name => name[0] + "*".repeat(name.length-1),
    email : email => {
      let [account, domain] = email.split('@')
      return account.slice(0,2) + "*".repeat(account.length-2) + "@" + domain
    }
  }
  
  return (
    <Table className='member_list_table' striped bordered >
          <thead>
            <tr>
              <th className="user_id">아이디</th>
              <th className="user_email">이메일</th>
              <th className="user_name">이름</th>
              <th className="join_date">가입일자</th>
            </tr>
          </thead>
          <tbody>
          {Array.from({ length: 10 }, (_, index) => {
           const user = users[index + 10 * (page - 1)];
           return (
           <tr key={user ? user.user_id : `emptyrow${index}`}>
             <td><span>{user ? user.user_id : ''}</span></td>
             <td><span>{user ? infoMasking.email(user.user_email) : ''}</span></td>
             <td><span>{user ? infoMasking.name(user.user_name) : ''}</span></td>
             <td><span>{user ? user.join_date.slice(2) : ''}</span></td>
           </tr>
          );
          })}
          </tbody>
        </Table>
  );
}