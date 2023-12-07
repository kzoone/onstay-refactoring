import { useState, useRef, useEffect } from 'react';
import Modal from '../Modal';
import { IoIosArrowDown } from 'react-icons/io';


export default function Price({ onMinPrice, onMaxPrice }){

    const [isPriceModalOpen, setPriceModalOpen] = useState(false);  
    
    const openModal = () => {  
        if(isPriceModalOpen){
            closeModal();
        }else{
            setPriceModalOpen(true);
        }
    };
    const closeModal = () => { 
        setPriceModalOpen(false);
    };

    const priceModalRef = useRef(null); 


    useEffect(() => { 
        const handleClick = (e) => { 
        if (isPriceModalOpen && priceModalRef.current && !priceModalRef.current.contains(e.target)) {
            closeModal();   
        }};

        document.addEventListener('mousedown', handleClick);

        return () => { 
            document.removeEventListener('mousedown', handleClick);
        };
    }, [priceModalRef, closeModal, isPriceModalOpen]);


    /**
     * 가격 범위
     */
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    
    const handleMinPriceChange = (e) => {
        setMinPrice(parseInt(e.target.value));
    };
    
    const handleMaxPriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const handleMinPriceSelect = (selected) => {
        onMinPrice(selected);
    }
    const handleMaxPriceSelect = (selected) => {
        onMaxPrice(selected);
    }

    /**
     * range
     */
    const [minRangePercent, setMinRangePercent] = useState(0);
    const [maxRangePercent, setMaxRangePercent] = useState(0);

    const handleRange = () => {
        setMinRangePercent((minPrice / 500000) * 100);
        setMaxRangePercent(100 - (maxPrice / 500000) * 100);
    };

    useEffect(() => {
        handleRange();
    }, [handleRange]);

    if(minPrice> maxPrice) {
        setMinPrice(Math.min(minPrice, maxPrice));
        setMaxPrice(Math.max(minPrice, maxPrice));
    }

    /**
     * reset
     */
    const handleReset = () => {
        setMinPrice(0);
        setMaxPrice(500000);
        setMinRangePercent((0 / 500000) * 100);
        setMaxRangePercent(100 - (500000 / 500000) * 100);
    }
    

    return(
        <div className='price' ref={priceModalRef}>
            <div className='button_section'>
                <span>가격 범위</span>
                <button className='price_select' type='button' onClick={openModal}>
                    <span className='btn_sub'>￦ {minPrice.toLocaleString()} ~ {maxPrice.toLocaleString()}</span>
                    <IoIosArrowDown />
                </button>
            </div>
            {isPriceModalOpen && (
            <Modal isOpen={isPriceModalOpen} onClose={closeModal} className={'price_modal'} >
                <div className='modal_body'>
                    <div className='modal_title'>스테이 가격</div>
                    <div className='price_control'>
                        <div className='slide'>
                            <div className='slide_inner' style={{left : `${minRangePercent}%`, right: `${maxRangePercent}%` }} />
                        </div>
                        <div className='range'>
                            <input type='range' 
                                className='min_range' 
                                value={minPrice}
                                step='10000' 
                                min='0' 
                                max='500000'
                                onChange={(e) => {
                                    handleMinPriceChange(e);
                                    handleRange();}} 
                            />
                            <input type='range' 
                                className='max_range' 
                                value={maxPrice}
                                step='10000' 
                                min='0'
                                max='500000'
                                onChange={(e) => {
                                    handleMaxPriceChange(e);
                                    handleRange();}} 
                            /> 
                        </div>
                        <div className='range_value'>
                            <div className='price_box'>
                                <div>최저 요금</div>
                                <div className='min_price'>￦ {minPrice.toLocaleString()}</div>
                            </div>
                            <div className='tilde' />
                            <div className='price_box'>
                                <div>최대 요금</div>
                                <div className='max_price'>￦ {maxPrice.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='confirm'>
                        <button type='button' className='reset' onClick={() => {handleReset();}}>초기화</button>
                        <button type='button' onClick={() =>{handleMinPriceSelect(minPrice); handleMaxPriceSelect(maxPrice); closeModal();}}>확인</button>
                    </div>
                </div>
            </Modal>
            )}
        </div>
    );
}