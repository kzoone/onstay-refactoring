import { useRef, useEffect, useState } from 'react';
import Modal from '../Modal';

export default function Location({ onLocation, codeinfo, locationName }){

    // 모달의 열림/닫힘 상태를 저장하는 상태 변수 
    // useState를 통해 모달의 상태를 관리하고, 필요한 시점에 모달을 열거나 닫을 수 있다.
    // 모달이 열려 있는 동안에는 모달의 내용이 표시되고, 닫혀 있을 때는 null을 반환하여 아무것도 표시하지 않는다.
    const [isLocationModalOpen, setLocationModalOpen] = useState(false);  
    
    const openModal = () => {   //모달이 열릴 때 실행되는 함수
      setLocationModalOpen(true);
    };
    const closeModal = () => {  //모달이 닫힐 때 실행되는 함수
      setLocationModalOpen(false);
    };

    const locationModalRef = useRef(null);  //모달 컴포넌트의 ref를 생성


    useEffect(() => {   //컴포넌트가 마운트되거나 업데이트될 때 실행되는 useEffect
        const handleClick = (e) => {    //마우스 클릭 이벤트를 감지하여 모달 외부를 클릭하면 모달을 닫는 함수
        if (isLocationModalOpen && locationModalRef.current && !locationModalRef.current.contains(e.target)) {
            closeModal();   
        }};
        const handleFocus = () => { //컴포넌트가 포커스를 받을 때 모달에 포커스를 맞추는 함수
            if (isLocationModalOpen) {
                locationModalRef.current.focus();
            }
        };
        handleFocus();  //컴포넌트가 처음 마운트될 때 포커스 설정
        
        // 마우스 클릭 이벤트와 포커스 이벤트 리스너 등록
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('focusin', handleFocus);

        return () => {  //컴포넌트가 언마운트될 때 이벤트 리스너 해제
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('focusin', handleFocus);
        };
    }, [locationModalRef, closeModal, isLocationModalOpen]);


    

    /* 지역 선택 */
    const handleLocationSelect = (selected) => {
        const selectedLocation = selected;
        onLocation(selectedLocation);
    }

    return(
        <div ref={locationModalRef} className="location_select">
            <button type='button' onClick={openModal}>전체 지역</button>
            
            {/* 모달이 열려 있을 때만 모달 컴포넌트 렌더링 */}
            {isLocationModalOpen && (
            <Modal isOpen={isLocationModalOpen} onClose={closeModal} className={'location_modal'} >
                {Object.keys(codeinfo).map((location)=>
                    <button type='button' key={location} onClick={() => handleLocationSelect(location)}>{locationName(location)}</button>
                )}
            </Modal>
            )}
        </div>
    );
}