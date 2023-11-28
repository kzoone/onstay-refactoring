/* 인원 모달의 열고 닫기, 수량 변경, 장바구니에 추가하는 기능 */

import { useState, useRef, useEffect } from "react";

export default function PersonnelModal({ isOpen, closeModal, handleQuantityChange, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef(null);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

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

  return (
    <>
      {isOpen && (
        <div className="personnel_modal" ref={modalRef}>
            <button className='close' type="button" onClick={closeModal}>X</button>
            <div className="quantity_controls">
              <button type="button" onClick={handleDecrease}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={handleIncrease}>+</button>
            </div>
            <button type="button" onClick={() => addToCart(quantity)}>확인</button>
        </div>
      )}
    </>
  );
}
