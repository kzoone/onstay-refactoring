/* 인원 모달의 열고 닫기, 수량 변경, 장바구니에 추가하는 기능 */

import { useState, useRef, useEffect } from "react";
import Modal from "../Modal";

export default function PersonnelModal({ onPersonnel }) {

    const [isPersonnelModalOpen, setPersonnelModalOpen] = useState(false);  
    
    const openModal = () => {  
        setPersonnelModalOpen(true);
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
        const selectedPersonnel = selected;
        onPersonnel(selectedPersonnel);
    }
  
  return (
    <div ref={personnelModalRef} className="personnel_select">
        <button type='button' onClick={openModal}>인원 {personnelCnt} 명</button>
        
        {isPersonnelModalOpen && (
        <Modal isOpen={isPersonnelModalOpen} onClose={closeModal} className={'personnel_select'} >
            <button type='button' onClick={handleDecrease}>-</button>
            <div>{personnelCnt}</div>
            <button type='button' onClick={handleIncrease}>+</button>
            <button type='button' onClick={() =>{handlePersonnelSelect(personnelCnt); closeModal()}}>확인</button>
        </Modal>
        )}
    </div>
  );
}