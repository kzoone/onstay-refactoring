import { useState } from 'react';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import LocationModal from './LocationModal';
import PersonnelModal from './PersonnelModal';


export default function Filter({ searching }){

    const [locationModal, setLocationModal] = useState(false);
    const [personnelModal, setPersonnelModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const locationM = (prevModal) => {
        setLocationModal(prevModal => !prevModal);
    }

    const personnelM = (pervModal) => {
        setPersonnelModal(pervModal => !pervModal);
    }

    // const openModal = () => {
    //     setModal(true);
    // }

    // const closeModal = () => {
    //     setModal(false);
    // }

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };
    
    const addToCart = (quantity) => {
        setQuantity(quantity);
        personnelM();
    };

    /* 체크인, 체크아웃 */
    const [checkinDate, setCheckinDate] = useState(''); //체크인 날짜를 저장
    const [checkoutDate, setCheckoutDate] = useState(''); //체크아웃 날짜를 저장
    
    // 체크인, 체크아웃의 input 클릭 시 키보드 입력 안되게
    window.onload = () => {
        document.querySelector('.checkin input').addEventListener('keydown', (e) => {
            e.preventDefault();
        });
    }

    // 월이 변경될 때 마다 월의 값을 month라는 상태값에 저장시키는 함수
    const [month, setMonth] = useState(new Date().getMonth()); 
    const handleMonthChange = (date) => { 
        setMonth(date.getMonth()+1);
    }

    return(
        <form className='search_container' method='POST' action='/'>

            <div className='filter_section'>
                <div>
                    <div className='location'>
                        <label htmlFor='location'>스테이/지역</label>
                        <input type='text' id='location' placeholder='숙소명을 입력하세요' onChange={(e)=>searching(e.target.value)} />
                        
                        <button type='button' onClick={locationM}>전체</button>
                        <LocationModal isOpen={locationModal} closeModal={locationM} /> 
                    </div>
                    <div className='checkin'>
                        <DatePicker
                            locale={ko}
                            dateFormat='yyyy-MM-dd'
                            placeholderText="체크인" 
                            shouldCloseOnSelect
                            selected={checkinDate}
                            onChange={(date) => setCheckinDate(date)}
                            onMonthChange={handleMonthChange}   //화살표를 눌러서 월이 변경될때마다 handleMonthChange 함수가 실행된다.
                            minDate={new Date()}
                            isClearable
                            showIcon
                            icon={
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 48 48"
                                >
                                    <mask id="ipSApplication0">
                                        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                            <path strokeLinecap="round" d="M40.04 22v20h-32V22" />
                                            <path
                                                fill="#fff"
                                                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                            />
                                        </g>
                                    </mask>
                                    <path
                                        fill="currentColor"
                                        d="M0 0h48v48H0z"
                                        mask="url(#ipSApplication0)"
                                    />
                                </svg>
                            }
                        />
                    </div>
                    <div className='tilde'>~</div>
                    <div className='checkout'>
                        <DatePicker
                            locale={ko}
                            dateFormat='yyyy-MM-dd'
                            placeholderText="체크아웃" 
                            shouldCloseOnSelect
                            selected={checkoutDate}
                            onChange={(date) => setCheckoutDate(date)}
                            onMonthChange={handleMonthChange}   //화살표를 눌러서 월이 변경될때마다 handleMonthChange 함수가 실행된다.
                            minDate={new Date()}
                            isClearable
                            showIcon
                            icon={
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 48 48"
                                >
                                    <mask id="ipSApplication0">
                                        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                            <path strokeLinecap="round" d="M40.04 22v20h-32V22" />
                                            <path
                                                fill="#fff"
                                                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                            />
                                        </g>
                                    </mask>
                                    <path
                                        fill="currentColor"
                                        d="M0 0h48v48H0z"
                                        mask="url(#ipSApplication0)"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <button type='button' onClick={personnelM}>{quantity}명</button>
                        <PersonnelModal isOpen={personnelModal} closeModal={personnelM} handleQuantityChange={handleQuantityChange} addToCart={addToCart} />
                    </div>
                    <div>
                        <label htmlFor='price'>가격 범위</label>
                    </div>
                    <div>
                        <label htmlFor=''>편의시설</label>
                        <input type='' id='' />
                    </div>
                </div>
            </div>

            <div className="btn_section">
                <button className='btn'>SEARCH →</button>
            </div>
        </form>
    );
}