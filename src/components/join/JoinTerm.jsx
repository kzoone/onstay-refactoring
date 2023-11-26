import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";

export default function JoinTerm(props) {
    let [terms, setTerms] =  useState({service : false, personal : false, event : false})
    let [termDetails, setTermDetails] = useState({service : false, personal : false, event : false})
    
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
        copy[termType] = !termDetails[termType];
        setTermDetails(copy)
    }

    useEffect(()=>{
        props.setValid(prev => ({...prev, terms_required : terms.personal && terms.service}))
    },[terms])


    return (
        <ul className='terms_container'>
                    <li className='term_agree_all'>
                        <input onChange={handleCheck} checked={Object.values(terms).every(v=>v)} className='join_checkbox required' type="checkbox" id='term_agree_all' name='term_agree_all'/> 
                        <label htmlFor="term_agree_all">사용자 약관 전체동의</label>
                    </li>
                    <li className='term_service'>
                        <div>
                        <input onChange={handleCheck} checked={terms.service} className='join_checkbox required' type="checkbox" id='term_service' name='service'/> 
                        <label htmlFor="term_service">서비스 이용 약관 동의 (필수)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='service'>
                            {termDetails.service ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {termDetails.service && <div className='term_detail'>
                        본 약관은 스테이폴리오에서 제공하는 모든 서비스 이용에 적용됩니다. <br /> <br />

                        제1조 (목적) <br /> <br />
                        1. 이 약관은 주식회사 스테이폴리오(이하 “회사”)가 운영하는 숙박 예약 플랫폼에서 제공하는 예약 관련 서비스(이하 “서비스”)를 이용함에 있어 “회사”와 “이용자”의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다. <br /> <br /> <br />

                        제2조 (정의) <br /> <br />
                        1. “플랫폼”이라 함은 “회사”가 운영하는 숙박 예약 플랫폼에서 재화 또는 용역(이하 “재화 등”이라 함)을 “이용자”에게 제공하기 위하여 컴퓨터 등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 플랫폼을 운영하는 사업자의 의미로도 사용합니다. <br />
                        2. “이용자”라 함은 “플랫폼”에 접속하여 이 약관에 따라 “플랫폼”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        3. “제휴 판매자”라 함은 “회사”와 계약 등을 체결하고 “플랫폼”을 이용하여 자신의 상품∙용역∙서비스를 판매하는 자를 말합니다. <br />
                        4. “회원”이라 함은 “플랫폼”에 회원 등록을 한 자로서, 계속적으로 “플랫폼”이 제공하는 서비스를 이용할 수 있는 자를 말합니다. <br />
                        5. “비회원”이라 함은 “회원”에 가입하지 않고 “플랫폼”이 제공하는 서비스를 이용하는 자를 말합니다.
                        </div>}
                    </li>
                    <li className='term_personal'>
                        <div>
                        <input onChange={handleCheck} checked={terms.personal} className='join_checkbox required' type="checkbox" id='term_personal' name='personal'/> 
                        <label htmlFor="term_personal">개인정보 수집・이용 동의(필수)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='personal'>
                            {termDetails.personal ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {termDetails.personal && <div className='term_detail'>
                        본 약관은 스테이폴리오에서 제공하는 모든 서비스 이용에 적용됩니다. <br /> <br />

                        제1조 (목적) <br /> <br />
                        1. 이 약관은 주식회사 스테이폴리오(이하 “회사”)가 운영하는 숙박 예약 플랫폼에서 제공하는 예약 관련 서비스(이하 “서비스”)를 이용함에 있어 “회사”와 “이용자”의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다. <br /> <br /> <br />

                        제2조 (정의) <br /> <br />
                        1. “플랫폼”이라 함은 “회사”가 운영하는 숙박 예약 플랫폼에서 재화 또는 용역(이하 “재화 등”이라 함)을 “이용자”에게 제공하기 위하여 컴퓨터 등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 플랫폼을 운영하는 사업자의 의미로도 사용합니다. <br />
                        2. “이용자”라 함은 “플랫폼”에 접속하여 이 약관에 따라 “플랫폼”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        3. “제휴 판매자”라 함은 “회사”와 계약 등을 체결하고 “플랫폼”을 이용하여 자신의 상품∙용역∙서비스를 판매하는 자를 말합니다. <br />
                        4. “회원”이라 함은 “플랫폼”에 회원 등록을 한 자로서, 계속적으로 “플랫폼”이 제공하는 서비스를 이용할 수 있는 자를 말합니다. <br />
                        5. “비회원”이라 함은 “회원”에 가입하지 않고 “플랫폼”이 제공하는 서비스를 이용하는 자를 말합니다.
                        </div>}
                    </li>
                    <li className='term_event'>
                        <div>
                        <input onChange={handleCheck} checked={terms.event} className='join_checkbox option' type="checkbox" id='term_event' name='event'/> 
                        <label htmlFor="term_event">쿠폰,이벤트 등 혜택 알림 동의 (선택)</label>
                        <button type='button' onClick={handleClick} className='term_detail_btn' data-term='event'>
                            {termDetails.event ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                        </div>
                        {termDetails.event && <div className='term_detail'>
                        본 약관은 스테이폴리오에서 제공하는 모든 서비스 이용에 적용됩니다. <br /> <br />

                        제1조 (목적) <br /> <br />
                        1. 이 약관은 주식회사 스테이폴리오(이하 “회사”)가 운영하는 숙박 예약 플랫폼에서 제공하는 예약 관련 서비스(이하 “서비스”)를 이용함에 있어 “회사”와 “이용자”의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다. <br /> <br /> <br />

                        제2조 (정의) <br /> <br />
                        1. “플랫폼”이라 함은 “회사”가 운영하는 숙박 예약 플랫폼에서 재화 또는 용역(이하 “재화 등”이라 함)을 “이용자”에게 제공하기 위하여 컴퓨터 등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 플랫폼을 운영하는 사업자의 의미로도 사용합니다. <br />
                        2. “이용자”라 함은 “플랫폼”에 접속하여 이 약관에 따라 “플랫폼”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        3. “제휴 판매자”라 함은 “회사”와 계약 등을 체결하고 “플랫폼”을 이용하여 자신의 상품∙용역∙서비스를 판매하는 자를 말합니다. <br />
                        4. “회원”이라 함은 “플랫폼”에 회원 등록을 한 자로서, 계속적으로 “플랫폼”이 제공하는 서비스를 이용할 수 있는 자를 말합니다. <br />
                        5. “비회원”이라 함은 “회원”에 가입하지 않고 “플랫폼”이 제공하는 서비스를 이용하는 자를 말합니다.
                        </div>}
                    </li>
                </ul>
    );
}