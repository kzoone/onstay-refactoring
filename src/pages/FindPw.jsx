import { useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';



export function FindPw() {
    let [form, setForm] = useState({user_id : ''});
    let [isMailSent, setIsMailSent] = useState(false);
    let [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.user_id==='') {
            return alert('아이디를 입력해주세요.')
        } 

        setIsLoading(true)

        axios({
            url : 'http://localhost:8000/member/find/pw/sendmail',
            method : 'post',
            data : {user_id : form.user_id}
        })
        .then(res => {
            setIsLoading(false);
            setIsMailSent(true);
        })
        .catch(err => {
            alert(err.response.data.message);
            setIsLoading(false)
        })

    }

    const resetForm = () => {
        setForm({user_id : ''})
        setIsMailSent(false)
    }


    
    return(
        <main className='find findpw member'>
            <PageTitle title='FIND PW' subtitle='비밀번호 찾기'/>
            {!isMailSent && 
            <form className='find_form findpw_form' onSubmit={handleSubmit}>
                <h2 className='findpw_desc'>가입한 아이디를 정확하게 입력해주세요.</h2>
                <p>
                    <label className='hidden_label' htmlFor="user_id">아이디</label>
                    <input type="text" id='user_id' name='user_id' value={form.user_id}
                     onChange={handleChange}  placeholder='아이디를 입력하세요.' />
                </p>
                <button className='black_box' type='submit'>비밀번호 재설정 메일 받기</button>
            </form>}
            {isLoading && <LoadingSpinner text={'Loading...'}/>}
            {isMailSent &&
            <div className='find_result_container'>
                <div className='find_result_desc'>
                    <span>가입 시 입력한 이메일로</span>
                    <span>비밀번호 재설정 링크를 전송하였습니다.</span>
                    <span>10분내로 재설정을 완료해주세요</span>
                </div>
                <button onClick={()=>{navigate('/login')}} type='button' className='black_box'>로그인</button>
                <button onClick={resetForm} className='small_btn'>다시 전송하기</button>
            </div>
            }
        </main>
    );
}