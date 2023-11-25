import { Link } from 'react-router-dom';
import PageTitle from './../components/common/PageTitle';
import { useState } from 'react';


export function Join() {
    let [terms, setTerms] =  useState({term_service : false, term_personal : false, term_event : false})

    const handleCheck = (e) => {
        if (e.target.name === 'term_agree_all') {
            setTerms(Object.values(terms).every(v=>v) 
                ? {term_service : false, term_personal : false, term_event : false} 
                : {term_service : true, term_personal : true, term_event : true})
        } else {
            setTerms({...terms, [e.target.name] : !terms[e.target.name]})
        }
    }
    
    return (
            <main className="member join">
                <PageTitle title={'JOIN'} subtitle={'회원가입'}/>
    
                <form className="join_form member_form" action="">
                    <p>
                        <label htmlFor="user_id">아이디</label>
                        <input type="text" name='user_id' id='user_id' placeholder='아이디를 입력하세요' />
                        <small className="invalid_noti user_id">이메일 형식이 올바르지 않습니다</small>
                        <button className='duplicate_check_btn white_box' type="button">중복체크</button>
                    </p>
                    <p>
                        <label htmlFor="user_email">이메일</label>
                        <input type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
                        <small className="invalid_noti user_email">이메일 형식이 올바르지 않습니다</small>
                    </p>
                    <p>
                        <label htmlFor="user_name">이름</label>
                        <input type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" />
                        <small className="invalid_noti user_name">1자 이상 30자 이하의 한글 및 영문으로 입력해주세요</small>
                    </p>
                    <p>
                        <label htmlFor="user_pw">비밀번호</label>
                        <input type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" />
                        <small className="invalid_noti user_pw">영문, 숫자, 특수문자를 모두 포함하여 6~18자로 입력해주세요.</small>
                        <input type="password" name="user_pw_repeat" id="user_pw_repeat" placeholder="비밀번호를 한번 더 입력하세요." />
                        <small className="invalid_noti user_pw_repeat">비밀번호가 일치하지 않습니다.</small>
                    </p>
                    <p>
                        <label htmlFor="phone">휴대전화번호</label>
                        <input type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
                        <small className="invalid_noti user_phone">휴대전화 형식이 올바르지 않습니다</small>
                    </p>


                    <ul className='terms_container'>
                        <li className='term_agree_all'>
                            <input onInput={handleCheck} checked={Object.values(terms).every(v=>v)} className='join_checkbox required' type="checkbox" id='term_agree_all' name='term_agree_all'/> 
                            <label htmlFor="term_agree_all">사용자 약관 전체동의</label>
                        </li>
                        <li className='term_service'>
                            <input onInput={handleCheck} checked={terms.term_service} className='join_checkbox required' type="checkbox" id='term_service' name='term_service'/> 
                            <label htmlFor="term_service">서비스 이용 약관 동의 (필수)</label>
                        </li>
                        <li className='term_personal'>
                            <input onInput={handleCheck} checked={terms.term_personal} className='join_checkbox required' type="checkbox" id='term_personal' name='term_personal'/> 
                            <label htmlFor="term_personal">개인정보 수집・이용 동의(필수)</label>
                        </li>
                        <li className='term_event'>
                            <input onInput={handleCheck} checked={terms.term_event} className='join_checkbox option' type="checkbox" id='term_event' name='term_event'/> 
                            <label htmlFor="term_event">쿠폰,이벤트 등 혜택 알림 동의 (선택)</label>
                        </li>
                    </ul>

                    <button className="join_btn black_box">회원가입</button>
                    <Link to='/login' className="login_link white_box">로그인</Link>
                </form>
            </main>
    );
}