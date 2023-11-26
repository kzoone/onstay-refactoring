import { Link } from 'react-router-dom';
import PageTitle from './../components/common/PageTitle';
import { useEffect, useRef, useState } from 'react';
import JoinTerm from '../components/join/JoinTerm';


export function Join() {
    const [form, setForm] = useState({user_id : '', user_email : '', 
                                      user_name : '', user_pw : '', user_pw_repeat : '', phone : ''})
    const [valid,setValid] = useState({user_id:false, user_id_duplicate : false, user_email:false, 
                                       user_name:false, user_pw:false, user_pw_repeat:false, phone:false,
                                       terms_required : false})
    const refInvalid = useRef(null);

    const idRegex = /^[A-Za-z\d]{6,20}$/
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const nameRegex = /^[ A-Za-z가-힣]{1,30}$/;
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,18}$/;
    const phoneRegex = /^01[016789]\d{7,8}$/;

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
        console.log(valid);
    }

    useEffect(()=>{
        setValid({
            ...valid,
            user_id : idRegex.test(form.user_id),
            user_email : emailRegex.test(form.user_email),
            user_name : nameRegex.test(form.user_name),
            user_pw : pwRegex.test(form.user_pw),
            user_pw_repeat : form.user_pw === form.user_pw_repeat,
            phone : phoneRegex.test(form.phone),
        })
    },[form])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let invalidNotiMsg = '폼 작성 내용을 다시 확인해주세요.';
        const notiMsgs = {
            user_id:'아이디를 형식에 맞게 입력해주세요.', 
            user_id_duplicate : '아이디 중복체크를 진행해주세요.', 
            user_email:'이메일을 형식에 맞게 입력해주세요.', 
            user_name:'이름을 형식에 맞게 입력해주세요.', 
            user_pw:'비밀번호를 형식에 맞게 입력해주세요.', 
            user_pw_repeat:'동일한 비밀번호를 입력해주세요.', 
            phone:'휴대전화번호를 형식에 맞게 입력해주세요.',
            terms_required : '필수 동의 약관에 모두 체크해주세요.'
        }
        for (let id of Object.keys(valid)) {
            if (!valid[id]) {
                refInvalid.current = document.getElementById(id)
                invalidNotiMsg = notiMsgs[id];
                break;
            }
        }
        try {
            refInvalid.current.focus()
        } catch{ 
            refInvalid.current.scrollIntoView({behavior:'smooth'})
        }
        return alert(invalidNotiMsg)
    }

    return (
        <main className="member join">
            <PageTitle title={'JOIN'} subtitle={'회원가입'}/>

            <form onSubmit={handleSubmit} className="join_form member_form" action="">
                <p>
                    <label htmlFor="user_id">아이디</label>
                    <input onChange={(e)=>{handleChange(e)}} value={form.user_id} type="text" name='user_id' id='user_id' placeholder='아이디를 입력하세요' />
                    {(!valid.user_id && form.user_id !== '') &&
                    <small className="invalid_noti user_id">6~15자의 영문 및 숫자 조합만 가능합니다.</small>}
                    {(valid.user_id && valid.user_id_duplicate) &&
                    <small className="valid_noti user_id">사용 가능한 아이디입니다.</small>}
                    <button id='user_id_duplicate' className='duplicate_check_btn white_box' type="button">중복체크</button>
                </p>
                <p>
                    <label htmlFor="user_email">이메일</label>
                    <input onChange={(e)=>{handleChange(e)}} value={form.user_email} type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
                    {(!valid.user_email && form.user_email!=='') &&
                    <small className="invalid_noti user_email">이메일 형식이 올바르지 않습니다</small>}
                </p>
                <p>
                    <label htmlFor="user_name">이름</label>
                    <input onChange={(e)=>{handleChange(e)}} value={form.user_name} type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" />
                    {(!valid.user_name && form.user_name !== '') &&
                    <small className="invalid_noti user_name">1자 이상 30자 이하의 한글 및 영문으로 입력해주세요</small>}
                </p>
                <p>
                    <label htmlFor="user_pw">비밀번호</label>
                    <input onChange={(e)=>{handleChange(e)}} value={form.user_pw} type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" />
                    {(!valid.user_pw && form.user_pw!=='') &&
                    <small className="invalid_noti user_pw">영문, 숫자, 특수문자를 모두 포함하여 6~18자로 입력해주세요.</small>}
                    <input onChange={(e)=>{handleChange(e)}} value={form.user_pw_repeat} type="password" name="user_pw_repeat" id="user_pw_repeat" placeholder="비밀번호를 한번 더 입력하세요." />
                    {(!valid.user_pw_repeat && form.user_pw_repeat!=='') &&
                      <small className="invalid_noti user_pw_repeat">비밀번호가 일치하지 않습니다.</small>}
                </p>
                <p>
                    <label htmlFor="phone">휴대전화번호</label>
                    <input onChange={(e)=>{handleChange(e)}} value={form.phone} type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
                    {(!valid.phone && form.phone !== '') &&
                    <small className="invalid_noti user_phone">휴대전화 형식이 올바르지 않습니다</small>
                    }
                </p>

                <JoinTerm id="terms_required" setValid={setValid}/> 

                <button className="join_btn black_box">회원가입</button>
                <Link to='/login' className="login_link white_box">로그인</Link>
            </form>
        </main>
    );
}