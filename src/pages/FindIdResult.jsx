import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';


export default function FindIdResult() {
    const location = useLocation();
    const navigate = useNavigate();
    let [list] = useState(location.state?.list)

    useEffect(()=>{
        if (!location.state?.list) {
            alert('잘못된 접근입니다.')
            setTimeout(()=>{navigate('/')}, 300)     
        }
    },[])
    
    const secureName = (name) => name[0] + "*".repeat(name.length-1)

    return location.state?.list && (
        <main className='findid member'>
            <PageTitle title='FIND ID' subtitle='아이디 찾기' />
            <div className='find_result_container'>
                <div className='find_result_desc'>
                    <span>{location.state?.user_email} 로</span>
                    <span>인증된 계정 정보가 {list?.length}개 존재합니다.</span>
                </div>
                {list?.map(obj => 
                <div className='findid_result_wrapper'>
                    <span className='result_id'>{obj?.user_id}</span>
                    <span className='result_name'>{secureName(obj?.user_name)}</span>
                    <span className='result_joindate'>{obj?.join_date}가입</span>
                </div>
                )}
            <Link className='login_link' to='/login'>로그인</Link>
            </div>
        </main>
    );
}