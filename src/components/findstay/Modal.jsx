import React, { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';

export default function Modal ({ isOpen, onClose, children, className }) {   // isOpen -> 모달이 열려 있는지 여부
    if (!isOpen) {
        return null;
    }

    return (
        <div className={`modal ${className}`}>
            <div className='modal_header'>
                <button className='close' type='button' onClick={onClose}><TfiClose /></button>
                <div className='modal_subject'>필터</div>
            </div>
            {children}
        </div>
    );
};