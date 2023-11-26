import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import { TERM_DETAIL_EVENT, TERM_DETAIL_PERSONAL, TERM_DETAIL_SERVICE } from '../../constants/constants';

export default function JoinTerm(props) {
    let [terms, setTerms] =  useState({service : false, personal : false, event : false})
    let [showTermDetails, setShowTermDetails] = useState({service : false, personal : false, event : false})
    
    const handleCheck = (e) => {
        if (e.target.name === 'term_agree_all') { // 전체 동의 버튼일 경우 - 다 체크되어있으면 전체 체크 해제, 아니면 전체 체크
            setTerms(Object.values(terms).every(v=>v) 
                ? {service : false, personal : false, event : false} 
                : {service : true, personal : true, event : true})
        } else { // 개별 체크일 경우 - 단순 체크인/체크해제 
            setTerms({...terms, [e.target.name] : !terms[e.target.name]})
        }
    }

    const handleClick = (e) => {
        let termType = e.currentTarget.getAttribute('data-term');
        const copy = {service : false, personal : false, event : false}
        copy[termType] = !showTermDetails[termType];
        setShowTermDetails(copy)
    }

    useEffect(()=>{
        props.setValid(prev => ({...prev, terms_required : terms.personal && terms.service}))
    },[terms])


    return (
        <ul id='terms_required' className='terms_container'>
                    <li className='term_agree_all'>
                        <input onChange={handleCheck} checked={Object.values(terms).every(v=>v)} className='join_checkbox required' type="checkbox" id='term_agree_all' name='term_agree_all'/> 
                        <label htmlFor="term_agree_all">사용자 약관 전체동의</label>
                    </li>
                    <li className='term_service'>
                        <div>
                        <input onChange={handleCheck} checked={terms.service} className='join_checkbox required' type="checkbox" id='term_service' name='service'/> 
                        <label htmlFor="term_service">서비스 이용 약관 동의 (필수)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='service'>
                            {showTermDetails.service ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {showTermDetails.service && <div className='term_detail'>{TERM_DETAIL_SERVICE}</div>}
                    </li>
                    <li className='term_personal'>
                        <div>
                        <input onChange={handleCheck} checked={terms.personal} className='join_checkbox required' type="checkbox" id='term_personal' name='personal'/> 
                        <label htmlFor="term_personal">개인정보 수집・이용 동의(필수)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='personal'>
                            {showTermDetails.personal ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {showTermDetails.personal && <div className='term_detail'>{TERM_DETAIL_PERSONAL}</div>}
                    </li>
                    <li className='term_event'>
                        <div>
                        <input onChange={handleCheck} checked={terms.event} className='join_checkbox option' type="checkbox" id='term_event' name='event'/> 
                        <label htmlFor="term_event">쿠폰,이벤트 등 혜택 알림 동의 (선택)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='event'>
                            {showTermDetails.event ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {showTermDetails.event && <div className='term_detail'>{TERM_DETAIL_EVENT}</div>}
                    </li>
                </ul>
    );
}