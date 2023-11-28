import { useRef, useEffect, useState } from 'react';

export default function LocationModal({isOpen, closeModal}){

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
        };
        document.addEventListener('mousedown', handleClick);
        return () => {
        document.removeEventListener('mousedown', handleClick);
        };
    }, [modalRef, closeModal]);

    return(
        <>  
        {isOpen && (
            <div ref={modalRef} className="location_modal">
                <button className="close" type='button' onClick={closeModal}>X</button>
            </div>
        )}
        </>
    );
}