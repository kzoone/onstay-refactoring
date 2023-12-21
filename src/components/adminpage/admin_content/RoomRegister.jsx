import { useRef } from "react";

export default function RoomRegister({index, room, handleRoomChange, handleRemoveRoomForm, showRemoveButton}){
    const roomFileInputRef = useRef(null);

    const handleFeatureCodes = (e, index) => {
        let featureCodesArr = [];
        if (e.target.checked) {
            featureCodesArr = [...room.featureCodesArr, e.target.value];
        } else {
            featureCodesArr = room.featureCodesArr.filter(code => code !== e.target.value);
        }
        
        onRoomChange(index, "featureCodesArr", featureCodesArr)
    }

    const handleRoomImg = (e, index) => {
        const files = e.target.files;
        const roomImg1 = files[0]?.name || '';
        const roomImg2 = files[1]?.name || '';
        const roomImg3 = files[2]?.name || '';
        onRoomChange(index, "roomImg", [roomImg1, roomImg2, roomImg3]);
    };
    
    const onRoomChange = (index, field, value) => {
        handleRoomChange(index, field, value);
    }
    const onRemoveRoomForm = (index) => {
        handleRemoveRoomForm(index);
    }
    
    return(
        <div className='room_register' key={index}>
            <div className='register_title'>
                <p>객실 <span className="room_form_count">{index+1}</span> 정보를 입력해주세요</p>
                {showRemoveButton && (
                    <button type="button" className="room_remove_btn" onClick={onRemoveRoomForm}>닫기</button>
                )}
            </div>
            <div className='room_name'>
                <label htmlFor='room_name'>객실명</label>
                <input type='text' id='room_name'
                    onChange={(e) => onRoomChange(index, "roomName", e.target.value)}
                />
            </div>
            <div className='room_price'>
                <label htmlFor='room_price'>금액</label>
                <input type='text' id='room_price' placeholder='숫자만 입력해주세요 (500,000원 이하)'
                    onChange={(e) => onRoomChange(index, "roomPrice", e.target.value)}
                />
            </div>
            <div className='features'>
                <span>부대시설</span>
                <div>
                    <p>
                        <input type='checkbox' value={1} id='feature1' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature1'>빅테이블</label>
                    </p>
                    <p>
                        <input type='checkbox' value={2} id='feature2' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature2'>정원</label>
                    </p>
                    <p>
                        <input type='checkbox' value={3} id='feature3' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature3'>테라스</label>
                    </p>
                    <p>
                        <input type='checkbox' value={4} id='feature4' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature4'>독립 키친</label>
                    </p>
                    <p>
                        <input type='checkbox' value={5} id='feature5' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature5'>독립 화장실</label>
                    </p>
                    <p>
                        <input type='checkbox' value={6} id='feature6' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature6'>산책로</label>
                    </p>
                    <p>
                        <input type='checkbox' value={7} id='feature7' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature7'>샤워실</label>
                    </p>
                    <p>
                        <input type='checkbox' value={8} id='feature8' onChange={(e) => handleFeatureCodes(e, index)} />
                        <label htmlFor='feature8'>BBQ</label>
                    </p>
                </div>
            </div>
            <div className='amenities'>
                <label htmlFor='amenities'>비품</label>
                <input type='text' id='amenities'
                    onChange={(e) => onRoomChange(index, "amenities", e.target.value)}
                />
            </div>
            <div className='min_capa'>
                <label htmlFor='min_capa'>최소인원</label>
                <input type='text' id='min_capa' placeholder='숫자만 입력해주세요'
                    onChange={(e) => onRoomChange(index, "minCapa", e.target.value)}
                />
            </div>
            <div className='max_capa'>
                <label htmlFor='max_capa'>최대인원</label>
                <input type='text' id='max_capa' placeholder='숫자만 입력해주세요.(8명 이하)'
                    onChange={(e) => onRoomChange(index, "maxCapa", e.target.value)}
                />
            </div>
            <div className='room_img'>
                <label htmlFor='room_img'>객실이미지</label>
                <input
                    type='file'
                    name='roomImg'
                    ref={roomFileInputRef}
                    onChange={(e) => handleRoomImg(e, index)}
                    accept='image/png, image/jpg, image/jpeg'
                    multiple
                />
            </div>
        </div>
    );
}