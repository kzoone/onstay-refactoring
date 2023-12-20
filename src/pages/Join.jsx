import { Link, useNavigate } from 'react-router-dom';
import PageTitle from './../components/common/PageTitle';
import { useEffect, useRef, useState } from 'react';
import JoinTerm from '../components/join/JoinTerm';
import { MEMBER_REGEX, INVALID_NOTI_ALERT, INVALID_NOTI_TEXT, UNKNOWN_ERROR_ALERT } from '../constants/constants';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function Join() {
    const [form, setForm] = useState({
        user_id: '', user_email: '',
        user_name: '', user_pw: '', user_pw_repeat: '', phone: ''
    }) // submit 시 전송할 폼 데이터를 관리하는 state
    const [valid, setValid] = useState({
        user_id: false, user_id_unique: false, user_email: false,
        user_name: false, user_pw: false, user_pw_repeat: false, phone: false,
        terms_required: false
    }) // submit 시, 회원가입이 가능한지 체크하는 항목들을 관리하는 state

    const refElement = useRef(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (e.target.name === 'user_id') {
            setValid({ ...valid, user_id_unique: false })
        }
    } // input change 이벤트

    const userIdDuplicateCheck = () => {
        if (!valid.user_id) return alert(INVALID_NOTI_ALERT.user_id) // 아이디 형식 안맞으면 중지

        axios.get(`${apiBaseUrl}/member/duplication/${form.user_id}`)
            .then(res => {
                let { isUnique } = res.data
                if (isUnique) {
                    setValid({ ...valid, user_id_unique: true })
                } else {
                    setValid({ ...valid, user_id_unique: false })
                    alert('중복된 아이디입니다. 다른 아이디를 입력해주세요.')
                }
            })
            .catch(err => {
                console.log(err); 
                alert(UNKNOWN_ERROR_ALERT)
            })
    } // 아이디 중복체크

    useEffect(() => {
        setValid({
            ...valid,
            user_id: MEMBER_REGEX.user_id.test(form.user_id),
            user_email: MEMBER_REGEX.user_email.test(form.user_email),
            user_name: MEMBER_REGEX.user_name.test(form.user_name),
            user_pw: MEMBER_REGEX.user_pw.test(form.user_pw),
            user_pw_repeat: form.user_pw === form.user_pw_repeat,
            phone: MEMBER_REGEX.phone.test(form.phone),
        })
    }, [form]) // form 내용이 업데이트 될때마다 각 valid 항목들을 업데이트 해줌

    const handleSubmit = (e) => {
        e.preventDefault()

        // valid 객체 안의 항목들이 모두 true인지 체크하여, 회원 가입이 가능한지 여부를 반환
        let isJoinPossible = Object.values(valid).every(checkType => checkType === true)

        // 회원가입 불가능한 경우 (valid 안의 항목 중 하나라도 false인 경우)
        if (!isJoinPossible) {
            let invalidNotiMsg = '폼 작성 내용을 다시 확인해주세요.'; // 혹시 몰라서 설정해놓은 디폴트값
            for (let checkType of Object.keys(valid)) { // 체크할 항목들을 하나하나 확인함
                if (!valid[checkType]) {
                    refElement.current = document.getElementById(checkType) // submit 실패 시 focus 또는 스크롤이동할 엘리먼트
                    invalidNotiMsg = INVALID_NOTI_ALERT[checkType]; // submit 실패 시 띄워줄 에러 메시지 설정
                    break; 
                }
            }
            try { refElement.current.focus() } // 참조 엘리먼트가 input인 경우 (아닐 경우 .focus가 에러나기 때문에 try-catch)
            catch { refElement.current.scrollIntoView({ behavior: 'smooth' }) } // 참조 엘리먼트가 input이 아닌 경우
            return alert(invalidNotiMsg)
        }

        // 회원가입 가능한 경우 (valid 안의 항목들이 모두 true)
        let { user_id, user_email, user_name, user_pw, phone } = form
        axios({
            url: `${apiBaseUrl}/member/join`,
            method: 'post',
            data: { user_id, user_email, user_name, user_pw, phone }
        })
            .then(res => {
                alert('회원가입이 완료되었습니다.')
                setForm({
                    user_id: '', user_email: '',
                    user_name: '', user_pw: '', user_pw_repeat: '', phone: ''
                })
                setValid({
                    user_id: false, user_id_unique: false, user_email: false,
                    user_name: false, user_pw: false, user_pw_repeat: false, phone: false,
                    terms_required: false
                })
                navigate('/login')
            })
            .catch(() => {
                alert(UNKNOWN_ERROR_ALERT)
            })
    }



    return (
        <main className="member join">
            <PageTitle title={'JOIN'} subtitle={'회원가입'} />

            <form onSubmit={handleSubmit} className="join_form member_form" action="">
                <p>
                    <label htmlFor="user_id">아이디</label>
                    <input onChange={(e) => { handleChange(e) }} value={form.user_id} type="text" name='user_id' id='user_id' placeholder='아이디를 입력하세요' />
                    {(!valid.user_id && form.user_id !== '') &&
                        <small className="invalid_noti user_id">{INVALID_NOTI_TEXT.user_id}</small>}
                    {(valid.user_id && valid.user_id_unique) &&
                        <small className="valid_noti user_id">사용 가능한 아이디입니다.</small>}
                    <button id='user_id_unique' onClick={userIdDuplicateCheck} className='duplicate_check_btn white_box' type="button">중복체크</button>
                </p>
                <p>
                    <label htmlFor="user_email">이메일</label>
                    <input onChange={(e) => { handleChange(e) }} value={form.user_email} type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
                    {(!valid.user_email && form.user_email !== '') &&
                        <small className="invalid_noti user_email">{INVALID_NOTI_TEXT.user_email}</small>}
                </p>
                <p>
                    <label htmlFor="user_name">이름</label>
                    <input onChange={(e) => { handleChange(e) }} value={form.user_name} type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" autoComplete='username' />
                    {(!valid.user_name && form.user_name !== '') &&
                        <small className="invalid_noti user_name">{INVALID_NOTI_TEXT.user_name}</small>}
                </p>
                <p>
                    <label htmlFor="user_pw">비밀번호</label>
                    <input onChange={(e) => { handleChange(e) }} value={form.user_pw} type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" autoComplete='new-password' />
                    {(!valid.user_pw && form.user_pw !== '') &&
                        <small className="invalid_noti user_pw">{INVALID_NOTI_TEXT.user_pw}</small>}
                    <input onChange={(e) => { handleChange(e) }} value={form.user_pw_repeat} type="password" name="user_pw_repeat" id="user_pw_repeat" placeholder="비밀번호를 한번 더 입력하세요." autoComplete='new-password' />
                    {(!valid.user_pw_repeat && form.user_pw_repeat !== '') &&
                        <small className="invalid_noti user_pw_repeat">{INVALID_NOTI_TEXT.user_pw_repeat}</small>}
                </p>
                <p>
                    <label htmlFor="phone">휴대전화번호</label>
                    <input onChange={(e) => { handleChange(e) }} value={form.phone} type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
                    {(!valid.phone && form.phone !== '') &&
                        <small className="invalid_noti phone">{INVALID_NOTI_TEXT.phone}</small>
                    }
                </p>

                <JoinTerm setValid={setValid} />

                <button className="join_btn black_box">회원가입</button>
                <button onClick={()=>{navigate('/login')}} className="login_link white_box">로그인</button>
                
            </form>
        </main>
    );
}