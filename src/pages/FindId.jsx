import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import { MEMBER_REGEX, INVALID_NOTI_TEXT} from '../constants/constants.js'


export function FindId() {
    const [certification, setCertification] = useState({isWaiting : false, timer : null, sendCnt:0})
    const [receivedCode, setReceivedCode] = useState(null)
    const [form, setForm] = useState({user_email:'', certification_code : ''})
    const [valid, setValid] = useState({user_email : false, certification_code : false})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }
    
    // 유효성 체크
    useEffect(()=>{
        setValid({
            user_email : MEMBER_REGEX.user_email.test(form.user_email),
            certification_code : receivedCode === form.certification_code
        })
    },[form])

    // 인증 타이머 가동 (3분)
    useEffect(()=>{
        let timeoutId;
        if (certification.isWaiting) {
            clearInterval(timeoutId);
            let restTime = 3*60;
            let restMin = parseInt(restTime / 60);
            let restSec = parseInt(restTime % 60);
            restSec = restSec < 10 ? "0" + restSec : restSec;
            setCertification({...certification, timer : restMin + ':' + restSec})
            timeoutId = setInterval(()=>{
                restTime -= 1;
                let restMin = parseInt(restTime / 60);
                let restSec = parseInt(restTime % 60);
                restSec = restSec < 10 ? "0" + restSec : restSec;
                setCertification({...certification, timer : restMin + ':' + restSec})
                if (restTime<0) {
                    alert('인증 시간이 만료되었습니다. 인증번호 전송을 다시 진행해주세요.')
                    setCertification({...certification, isWaiting : false, timer : null})
                    clearInterval(timeoutId);
                }
            },1000)
        }
        return ()=> clearInterval(timeoutId)
    },[certification.isWaiting, certification.sendCnt])

    
    const sendCertificationCode = (e) => {
        if (certification.sendCnt>=5) {
            return alert('한번에 5번 이상의 인증번호를 요청할 수 없습니다. 새로고침 한 뒤 이용해주세요.')
        } else if (!valid.user_email) {
            return alert('이메일을 형식에 맞게 입력해주세요.')
        } 

        setCertification({
            ...certification, 
            isWaiting : true, 
            sendCnt : certification.sendCnt+1
        })
        axios({
            url : 'http://localhost:8000/member/find/certification',
            method : 'post',
            data : {user_email:form.user_email}
        })
        .then(res => {
            setReceivedCode(res.data.code);
        })
        .catch((err)=>{
            setCertification({isWaiting : false, timer : null, sendCnt:0});
            setReceivedCode(null);
            alert(err.response.data.message)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!valid.certification_code) {
            return alert('인증번호가 일치하지 않습니다. 이메일을 다시 확인해주세요.')
        } else if (!certification.isWaiting) {
            return alert('인증 시간이 만료되었습니다 인증번호를 다시 전송해주세요.')
        }

        axios({
            url : 'http://localhost:8000/member/find/id/' + form.user_email,
            method : 'get'
        })
        .then(res => {
            console.log(res.data);
            navigate('/find/id/result',{
                state : {user_email : form.user_email , list : res.data}
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <main className='findid member'>
            <PageTitle title='FIND ID' subtitle='아이디 찾기'/>
            <form className='findid_form' onSubmit={handleSubmit}>
                <h2 className='findid_desc'>이메일 인증을 통해 아이디를 찾을 수 있습니다.</h2>
                <p>
                    <label className='hidden_label' htmlFor="user_email">이메일</label>
                    <input onChange={handleChange} type="text" id='user_email' name='user_email' 
                    placeholder='회원가입 시 입력한 이메일과 동일하게 입력하세요.' value={form.user_email}/>
                    {(!valid.user_email && form.user_email !== '') &&
                    <small className="invalid_noti user_email">{INVALID_NOTI_TEXT.user_email}</small>}
                </p>

                {/* 인증 번호 전송 후 대기 시 */}
                {certification.isWaiting && <>
                <p>
                    <div className='certification_input_wrapper'>
                        <label className='hidden_label' htmlFor="certification_code">인증번호</label>
                        <input onChange={handleChange} type="text" id='certification_code' name='certification_code' placeholder='인증번호를 입력해주새요.' value={form.certification_code}/>
                        <div className='timer'>{certification.timer}</div>
                    </div>
                        <button onClick={sendCertificationCode}
                        type='button' className='code_resend_btn'>인증번호 재발송</button>
                </p>
                <button className='black_box' type='submit'>아이디 찾기</button>
                </>}

                {!certification.isWaiting &&
                <button type='button' onClick={sendCertificationCode}
                 className='code_send_btn black_box'>인증번호 전송</button>
                }
            </form>
        </main>
    );
}