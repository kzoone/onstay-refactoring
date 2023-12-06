import { useState, useRef, useEffect } from 'react';
import Modal from '../Modal';
import { IoIosArrowDown } from 'react-icons/io';

export default function PersonnelModal({ onPersonnel }) {

    const [isPersonnelModalOpen, setPersonnelModalOpen] = useState(false);  
    
    const openModal = () => {  
        if(isPersonnelModalOpen){
            closeModal();
        }else{
            setPersonnelModalOpen(true);
        }
    };
    const closeModal = () => { 
        setPersonnelModalOpen(false);
    };

    const personnelModalRef = useRef(null); 


    useEffect(() => { 
        const handleClick = (e) => { 
        if (isPersonnelModalOpen && personnelModalRef.current && !personnelModalRef.current.contains(e.target)) {
            closeModal();   
        }};

        document.addEventListener('mousedown', handleClick);

        return () => { 
            document.removeEventListener('mousedown', handleClick);
        };
    }, [personnelModalRef, closeModal, isPersonnelModalOpen]);

    /* 인원 선택 */
    const [personnelCnt, setPersonnelCnt] = useState(1);

    const handleIncrease = () => {
        if(personnelCnt < 8) {
            setPersonnelCnt((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (personnelCnt > 1) {
            setPersonnelCnt((prev) => prev - 1);
        }
    };

    const handlePersonnelSelect = (selected) => {
        onPersonnel(selected);
    }
  
    return (
        <div className='personnel' ref={personnelModalRef}>
            <div className='button_section'>
                <span>인원</span>
                <button className='personnel_select' type='button' onClick={openModal}>
                    <span>{personnelCnt} 명</span>
                    <IoIosArrowDown />
                </button>
            </div>
            
            {isPersonnelModalOpen && (
            <Modal isOpen={isPersonnelModalOpen} onClose={closeModal} className={'personnel_modal'} >
                <div className='modal_body'>
                    <div className='modal_title'>스테이 인원</div>
                    <div className='personnel_control'>
                        <button className='minus_btn' type='button' onClick={handleDecrease}>-</button>
                        <div className='cnt'>{personnelCnt}</div>
                        <button className='plus_btn' type='button' onClick={handleIncrease}>+</button>
                    </div>
                    <div className='confirm'>
                        <button type='button' onClick={() =>{handlePersonnelSelect(personnelCnt); closeModal()}}>확인</button>
                    </div>
                </div>
            </Modal>
            )}
        </div>
    );
}