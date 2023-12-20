import { TfiClose } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import getImgPath from '../../../util/getImgPath';


export default function ManageAccRegister({closeDetailModal, openDeleteModal, detail}){
    const close = () => {
        closeDetailModal();
    }
    const openDelete = () => {
        openDeleteModal();
    }

    const handleClick = (e) => {
        e.preventDefault();
    };

    return(
        <div className="manage_detail">
            <TfiClose className='close_btn' onClick={close} />
            <div className='logo_img'><img src="/assets/images/main_logo.png" /></div>  
            <div className='detail_container'>
                <form className="detail_form">
                    <div className='acc_detail'>
                        <div className='acc_title'>숙소 정보</div>
                        <div className='acc_name'>
                            <label>숙소명</label>
                            <input type="text" readOnly value={detail[0]?.acc_name || ''} />
                        </div>
                        <div className='tel'>
                            <label>전화번호</label>
                            <input type='tel' readOnly value={detail[0]?.tel || ''}/>
                        </div>
                        <div className='address'>
                            <label>숙소 주소</label>
                            <input type='text' readOnly value={detail[0]?.address || ''}/>
                        </div>
                        <div className='parking'>
                            <span>주차</span>
                            <input type='radio' name='parking' checked={detail[0]?.parking === 1 || false} onChange={handleClick} /><label>가능</label>
                            <input type='radio' name='parking' checked={detail[0]?.parking === 0 || false} onChange={handleClick} /><label>불가능</label>
                        </div>
                        <div className='cook'>
                            <span>조리</span>
                            <input type='radio' name='cook' checked={detail[0]?.cook === 1 || false} onChange={handleClick} /><label>가능</label>
                            <input type='radio' name='cook' checked={detail[0]?.cook === 0 || false} onChange={handleClick} /><label>불가능</label>
                        </div>
                        <div className='pet'>
                            <span>반려동물</span>
                            <input type='radio' name='pet' checked={detail[0]?.pet === 1 || false} onChange={handleClick} /><label>가능</label>
                            <input type='radio' name='pet' checked={detail[0]?.pet === 0 || false} onChange={handleClick} /><label>불가능</label>
                        </div>
                        <div className='breakfast'>
                            <span>조식</span>
                            <input type='radio' name='breakfast' checked={detail[0]?.breakfast === 1 || false} onChange={handleClick} /><label>가능</label>
                            <input type='radio' name='breakfast' checked={detail[0]?.breakfast === 0 || false} onChange={handleClick} /><label>불가능</label>
                        </div>
                        <div className='checkin'>
                            <label>체크인 시간</label>
                            <input type='time' readOnly value={detail[0]?.acc_checkin || ''}/>
                        </div>
                        <div className='checkout'>
                            <label>체크아웃 시간</label>
                            <input type='time' readOnly value={detail[0]?.acc_checkout || ''} />
                        </div>
                        <div className='homepage'>
                            <label>홈페이지</label>
                            <input type='text' readOnly value={detail[0]?.homepage || ''} />
                        </div>
                        <div className='summary'>
                            <label>숙소 개요1</label>
                            <textarea cols="30" rows="5" readOnly value={detail[0]?.acc_summary1 || ''} />
                        </div>
                        <div className='summary'>
                            <label htmlFor='summary2'>숙소 개요2</label>
                            <textarea cols="30" rows="5" readOnly value={detail[0]?.acc_summary2 || ''} />
                        </div>
                        <div className='only'>
                            <label>온스테이하우스에서만</label>
                            <input type='checkbox' checked={detail[0]?.only === 1 || false} onChange={handleClick} />
                        </div>
                        <div className='acc_imgs'>
                            {detail
                            .filter(acc => !acc.acc_img.endsWith('.webp'))
                            .map((acc, index) => (
                                <div className='acc_img' key={index}>
                                    <img src={getImgPath.acc(detail[index].acc_img)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='room_detail'>
                        <div className='room_title'>객실 정보</div>
                        <div className='room_name'>
                            <label>객실명</label>
                            <input type='text' readOnly value={detail[0]?.room_name || ''} />
                        </div>
                        <div className='room_price'>
                            <label>금액</label>
                            <input type='text' readOnly value={detail[0]?.room_price || ''} />
                        </div>
                        <div className='features'>
                            <span>부대시설</span>
                            <div>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(1) || false} onChange={handleClick} />
                                    <label>빅테이블</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(2) || false} onChange={handleClick} />
                                    <label>정원</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(3) || false} onChange={handleClick} />
                                    <label>테라스</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(4) || false} onChange={handleClick} />
                                    <label>독립 키친</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(5) || false} onChange={handleClick} />
                                    <label>독립 화장실</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(6) || false} onChange={handleClick} />
                                    <label>산책로</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(7) || false} onChange={handleClick} />
                                    <label>샤워실</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={detail[0]?.feature_codes.includes(8) || false} onChange={handleClick} />
                                    <label>BBQ</label>
                                </p>
                            </div>
                        </div>
                        <div className='amenities'>
                            <label>비품</label>
                            <input type='text' readOnly value={detail[0]?.amenities || ''}/>
                        </div>
                        <div className='min_capa'>
                            <label>최소인원</label>
                            <input type='text' readOnly value={detail[0]?.min_capa || ''}/>
                        </div>
                        <div className='max_capa'>
                            <label>최대인원</label>
                            <input type='text' readOnly value={detail[0]?.max_capa || ''}/>
                        </div>
                        <div className='room_imgs'>
                            <div className='room_img'>
                                <img src={getImgPath.room(detail[0]?.room_img1)} />
                            </div>
                            <div className='room_img'>
                                <img src={getImgPath.room(detail[0]?.room_img2)} />
                            </div>
                            <div className='room_img'>
                                <img src={getImgPath.room(detail[0]?.room_img3)} />
                            </div>
                        </div>
                    </div>
                    <div className='form_btn'>
                        <div className='close'>
                            <button type='button' onClick={close}>닫기</button>
                        </div>
                        <div className='edit_delete'>
                            <button type='button'>수정</button>
                            <button type='button' onClick={openDelete}>삭제</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}