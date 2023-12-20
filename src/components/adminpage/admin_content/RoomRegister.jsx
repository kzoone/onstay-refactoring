import { useRef } from "react";

export default function RoomRegister({handleRoomName, handleRoomPrice, handleFeatureCodes, handleAmenities, handleMinCapa, handleMaxCapa, handleRoomImg, roomFormCount, onRemoveRoomForm, showRemoveButton}){
    const roomFileInputRef = useRef(null);

    const onRoomName = (e) => {
        handleRoomName(e);
    }
    const onRoomPrice = (e) => {
        handleRoomPrice(e);
    }
    const onFeatureCodes = (e) => {
        handleFeatureCodes(e);
    }
    const onAmenities = (e) => {
        handleAmenities(e);
    }
    const onMinCapa = (e) => {
        handleMinCapa(e);
    }
    const onMaxCapa = (e) => {
        handleMaxCapa(e);
    }
    const onRoomImg = (e) => {
        handleRoomImg(e);
    }
    
    return(
        <div className='room_register'>
            <div className='register_title'>
                <p>객실 <span className="room_form_count">{roomFormCount}</span> 정보를 입력해주세요</p>
                {showRemoveButton && (
                    <button type="button" className="room_remove_btn" onClick={onRemoveRoomForm}>닫기</button>
                )}
            </div>
            <div className='room_name'>
                <label htmlFor='room_name'>객실명</label>
                <input type='text' id='room_name' onChange={onRoomName}/>
            </div>
            <div className='room_price'>
                <label htmlFor='room_price'>금액</label>
                <input type='text' id='room_price' onChange={onRoomPrice}/>
            </div>
            <div className='features'>
                <span>부대시설</span>
                <div>
                    <p>
                        <input type='checkbox' value={1} id='feature1' onChange={onFeatureCodes} />
                        <label htmlFor='feature1'>빅테이블</label>
                    </p>
                    <p>
                        <input type='checkbox' value={2} id='feature2' onChange={onFeatureCodes} />
                        <label htmlFor='feature2'>정원</label>
                    </p>
                    <p>
                        <input type='checkbox' value={3} id='feature3' onChange={onFeatureCodes} />
                        <label htmlFor='feature3'>테라스</label>
                    </p>
                    <p>
                        <input type='checkbox' value={4} id='feature4' onChange={onFeatureCodes} />
                        <label htmlFor='feature4'>독립 키친</label>
                    </p>
                    <p>
                        <input type='checkbox' value={5} id='feature5' onChange={onFeatureCodes} />
                        <label htmlFor='feature5'>독립 화장실</label>
                    </p>
                    <p>
                        <input type='checkbox' value={6} id='feature6' onChange={onFeatureCodes} />
                        <label htmlFor='feature6'>산책로</label>
                    </p>
                    <p>
                        <input type='checkbox' value={7} id='feature7' onChange={onFeatureCodes} />
                        <label htmlFor='feature7'>샤워실</label>
                    </p>
                    <p>
                        <input type='checkbox' value={8} id='feature8' onChange={onFeatureCodes} />
                        <label htmlFor='feature8'>BBQ</label>
                    </p>
                </div>
            </div>
            <div className='amenities'>
                <label htmlFor='amenities'>비품</label>
                <input type='text' id='amenities' onChange={onAmenities} />
            </div>
            <div className='min_capa'>
                <label htmlFor='min_capa'>최소인원</label>
                <input type='text' id='min_capa' placeholder='숫자만 입력해주세요' onChange={onMinCapa} />
            </div>
            <div className='max_capa'>
                <label htmlFor='max_capa'>최대인원</label>
                <input type='text' id='max_capa' placeholder='숫자만 입력해주세요' onChange={onMaxCapa} />
            </div>
            <div className='room_img'>
                <label htmlFor='room_img'>객실이미지</label>
                <input
                    type='file'
                    name='roomImg'
                    ref={roomFileInputRef}
                    onChange={onRoomImg}
                    accept='image/png, image/jpg, image/jpeg'
                    multiple
                />
            </div>
        </div>
    );
}