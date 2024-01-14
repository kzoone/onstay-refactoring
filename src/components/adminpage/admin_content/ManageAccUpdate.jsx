import { TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import RoomRegister from './RoomRegister';
import getImgPath from '../../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function ManageAccRegister({detail, closeUpdateModal}){
    const [accId, setAccId] = useState(detail[0]?.acc_id || '');
    const [roomId, setRoomId] = useState(detail[0]?.room_id || '');
    const [accName, setAccName] = useState(detail[0]?.acc_name || '');
    const [tel, setTel] = useState(detail[0]?.tel || '');
    const [address, setAddress] = useState(detail[0]?.address || '');
    const [zipcode, setZipcode] = useState(detail[0]?.zipcode || '');
    const [latitude, setLatitude] = useState(detail[0]?.latitude || '');
    const [longitude, setLongitude] = useState(detail[0]?.longitude || '');
    const [areaCode, setAreaCode] = useState(detail[0]?.area_code);
    const [parking, setParking] = useState(detail[0]?.parking);
    const [cook, setCook] = useState(detail[0]?.cook);
    const [pet, setPet] = useState(detail[0]?.pet);
    const [breakfast, setBreakfast] = useState(detail[0]?.breakfast);
    const [accCheckin, setAccCheckin] = useState(detail[0]?.acc_checkin || '');
    const [accCheckout, setAccCheckout] = useState(detail[0]?.acc_checkout || '');
    const [homepage, setHomepage] = useState(detail[0]?.homepage || '');
    const [accSummary1, setAccSummary1] = useState(detail[0]?.acc_summary1 || '');
    const [accSummary2, setAccSummary2] = useState(detail[0]?.acc_summary2 || '');
    const [only, setOnly] = useState(detail[0]?.only);
    
    const handleAccName = (e) => {
        setAccName(e.target.value);
    }
    const handleTel = (e) => {
        setTel(e.target.value);
    }
    const handleParkingChange = (e) => {
        setParking(parseInt(e.target.value));
    }
    const handleCookChange = (e) => {
        setCook(parseInt(e.target.value));
    }
    const handlePetChange = (e) => {
        setPet(parseInt(e.target.value));
    }
    const handleBreakfastChange = (e) => {
        setBreakfast(parseInt(e.target.value));
    }
    const handleCheckin = (e) => {
        setAccCheckin(e.target.value);
    }
    const handleCheckout = (e) => {
        setAccCheckout(e.target.value);
    }
    const handleHomepage = (e) => {
        setHomepage(e.target.value);
    }
    const handleOnly = (e) => {
        setOnly(e.target.checked ? 1 : 0);
    }
    const handleAccSummary1 = (e) => {
        setAccSummary1(e.target.value);
    }
    const handleAccSummary2 = (e) => {
        setAccSummary2(e.target.value);
    }

    const [accImg1, setAccImg1] = useState(detail[0]?.acc_img || '');
    const [accImg2, setAccImg2] = useState(detail[1]?.acc_img || '');
    const [accImg3, setAccImg3] = useState(detail[2]?.acc_img || '');
    const [accImg4, setAccImg4] = useState(detail[3]?.acc_img || '');
    const [accImg5, setAccImg5] = useState(detail[4]?.acc_img || '');
    const accFileInputRef = useRef(null);

    const handleAccImg = (e) => {
        document.querySelector('.acc_img_names').style.display = 'flex';
        const files = e.target.files;
        const accImgs = document.getElementById('accImgs');
        if( accImgs.files.length > 5 ){
            alert('최대 5개까지 선택 가능합니다.');
            accImgs.value = "";
        }
        if(files.length > 0){
            setAccImg1(files[0]);
            setAccImg2(files[1]);
            setAccImg3(files[2]);
            setAccImg4(files[3]);
            setAccImg5(files[4]);
        }
        document.querySelector('.file_names').innerHTML = `${files[0]?"<span class='name'>" + files[0].name + '</span>':''}
                                                           ${files[1]?"<span class='name'>" + files[1].name + '</span>':''}
                                                           ${files[2]?"<span class='name'>" + files[2].name + '</span>':''}
                                                           ${files[3]?"<span class='name'>" + files[3].name + '</span>':''}
                                                           ${files[4]?"<span class='name'>" + files[4].name + '</span>':''}`;
    }

    const roomFileInputRef = useRef(null);
    const [rooms, setRooms] = useState([
        {
        roomName: detail[0]?.room_name || '',
        roomPrice: detail[0]?.room_price || '',
        featureCodesArr: detail[0]?.feature_codes.split(',') || [],
        amenities: detail[0]?.amenities || '',
        minCapa: detail[0]?.min_capa || '',
        maxCapa: detail[0]?.max_capa || '',
        roomImg: []
        },
    ]);

    const handleFeatureCodes = (e) => {
        let featureCodesArr = [];
        if (e.target.checked) {
            featureCodesArr = [...rooms[0].featureCodesArr, e.target.value];
        } else {
            featureCodesArr = rooms[0].featureCodesArr.filter(code => code !== e.target.value);
        }
        
        handleRoomChange("featureCodesArr", featureCodesArr)
    }

    const handleRoomImg = (e) => {
        document.querySelector('.room_img_names').style.display = 'flex';
        const files = e.target.files;
        const roomImg1 = files[0];
        const roomImg2 = files[1];
        const roomImg3 = files[2];
        handleRoomChange("roomImg", [roomImg1, roomImg2, roomImg3]);
        document.querySelector('.room_file_names').innerHTML = `${files[0]?"<span class='name'>" + files[0].name + '</span>':''}
                                                                ${files[1]?"<span class='name'>" + files[1].name + '</span>':''}
                                                                ${files[2]?"<span class='name'>" + files[2].name + '</span>':''}`;
    };

    const handleRoomChange = (field, value) => {
        const newRooms = [...rooms];
        newRooms[0] = {...newRooms[0], [field]: value,};
        setRooms(newRooms);
    };
    
    const handleSubmit = (e) => {
            e.preventDefault();
            
            const formData = new FormData();
            
            formData.append('accId', accId);
            formData.append('roomId', roomId);
            formData.append('accName', accName);
            formData.append('tel', tel);
            formData.append('zipcode', zipcode);
            formData.append('address', address);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('parking', parking);
            formData.append('cook', cook);
            formData.append('pet', pet);
            formData.append('breakfast', breakfast);
            formData.append('accCheckin', accCheckin);
            formData.append('accCheckout', accCheckout);
            formData.append('homepage', homepage);
            formData.append('only', only);
            formData.append('areaCode', areaCode);
            formData.append('accSummary1', accSummary1);
            formData.append('accSummary2', accSummary2);
            formData.append('rooms', JSON.stringify(rooms));
            formData.append(`roomImg`, rooms[0].roomImg[0]);
            formData.append(`roomImg`, rooms[0].roomImg[1]);
            formData.append(`roomImg`, rooms[0].roomImg[2]);
            formData.append('accImgs', accImg1);
            formData.append('accImgs', accImg2);
            formData.append('accImgs', accImg3);
            formData.append('accImgs', accImg4);
            formData.append('accImgs', accImg5);
            
            axios({
                url : `${apiBaseUrl}/adminpage/accs/update/`,
                method : 'post',
                data : formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then(res => {
                    if (res.data === 'ok') {
                        alert('수정이 완료되었습니다.'); 
                        window.location.reload();
                }
            })
            .catch((err) => {
                console.error('axios 에러 발생 => ' + err);
            });
            closeUpdateModal();
    }

    const close = () => {
        closeUpdateModal();
    }

    /* 주소 검색 */
    const [isAddressModal, setIsAddressModal] = useState(false);

    const openAddressModal = () => {
        if(isAddressModal){
            setIsAddressModal(false);
        }else{
            setIsAddressModal(true);
        }
    }
    const handleComplete = (data) => {
        setIsAddressModal(false);
        axios({
            url: `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(data.address)}`,
            method: 'get',
            headers: {
                Authorization: 'KakaoAK 5d77091aeb4509102ef9b64e64f99142',
            },
        })
        .then((res) => {
            const { x, y } = res.data.documents[0].address;
            setLatitude(y);
            setLongitude(x);
        })
        .catch((err) => {
            console.error('좌표 데이터를 가져오는 중 오류 발생:' +  err);
        });
        
        setAddress(data.address);
        setZipcode(data.zonecode);
        if(data.sido==='서울'){
            setAreaCode(1);
        }else if(data.sido==='강원특별자치도'){
            setAreaCode(2);
        }else if(data.sido==='부산'){
            setAreaCode(3);
        }else if(data.sido==='경기'){
            setAreaCode(4);
        }else if(data.sido==='충북'){
            setAreaCode(5);
        }else if(data.sido==='충남'){
            setAreaCode(6);
        }else if(data.sido==='경북'){
            setAreaCode(7);
        }else if(data.sido==='경남'){
            setAreaCode(8);
        }else if(data.sido==='전북'){
            setAreaCode(9);
        }else if(data.sido==='전남'){
            setAreaCode(10);
        }else if(data.sido==='인천'){
            setAreaCode(11);
        }else if(data.sido==='광주'){
            setAreaCode(12);
        }else if(data.sido==='대전'){
            setAreaCode(13);
        }else if(data.sido==='대구'){
            setAreaCode(14);
        }else if(data.sido==='제주특별자치도'){
            setAreaCode(15);
        }
    }

    return(
        <div className="new_register">
            <TfiClose className='close_btn' onClick={close} />
            <div className='logo_img'><img src="/assets/images/main_logo.png" /></div>  
            <div className='register_container'>
                <form className="register_form">
                    <div className='acc_register'>
                        <div className='register_title'>숙소 정보 수정</div>
                        <div className='acc_name'>
                            <label htmlFor='acc_name'>숙소명</label>
                            <input type="text" value={accName} onChange={handleAccName} />
                        </div>
                        <div className='tel'>
                            <label htmlFor='tel'>전화번호</label>
                            <input type='tel' value={tel} placeholder="- 를 포함해서 입력해주세요" onChange={handleTel} />
                        </div>
                        <div className='address'>
                            <label htmlFor='address'>숙소 주소</label>
                            <input type='text' id='address' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            <button type='button' onClick={openAddressModal}>주소검색</button>
                        </div>
                        {isAddressModal && <div className='address_modal'><DaumPostcode onComplete={handleComplete}/></div>}
                        <div className='parking'>
                            <span>주차</span>
                            <input type='radio' id='parking_possible' name='parking' checked={parking===1?true:false} value={1} onChange={handleParkingChange} /><label htmlFor='parking_possible'>가능</label>
                            <input type='radio' id='parking_impossible' name='parking' checked={parking===0?true:false} value={0} onChange={handleParkingChange} /><label htmlFor='parking_impossible'>불가능</label>
                        </div>
                        <div className='cook'>
                            <span>조리</span>
                            <input type='radio' id='cook_possible' name='cook' checked={cook===1?true:false} value={1} onChange={handleCookChange} /><label htmlFor='cook_possible'>가능</label>
                            <input type='radio' id='cook_impossible' name='cook' checked={cook===0?true:false} value={0} onChange={handleCookChange} /><label htmlFor='cook_impossible'>불가능</label>
                        </div>
                        <div className='pet'>
                            <span>반려동물</span>
                            <input type='radio' id='pet_possible' name='pet' checked={pet===1?true:false} value={1} onChange={handlePetChange} /><label htmlFor='pet_possible'>가능</label>
                            <input type='radio' id='pet_impossible' name='pet' checked={pet===0?true:false} value={0} onChange={handlePetChange} /><label htmlFor='pet_impossible'>불가능</label>
                        </div>
                        <div className='breakfast'>
                            <span>조식</span>
                            <input type='radio' id='breakfast_possible' name='breakfast' checked={breakfast===1?true:false} value={1} onChange={handleBreakfastChange} /><label htmlFor='breakfast_possible'>가능</label>
                            <input type='radio' id='breakfast_impossible' name='breakfast' checked={breakfast===0?true:false} value={0} onChange={handleBreakfastChange} /><label htmlFor='breakfast_impossible'>불가능</label>
                        </div>
                        <div className='checkin'>
                            <label htmlFor='checkin'>체크인 시간</label>
                            <input type='time' id='checkin' value={accCheckin} onChange={handleCheckin} />
                        </div>
                        <div className='checkout'>
                            <label htmlFor='checkout'>체크아웃 시간</label>
                            <input type='time' id='checkout' value={accCheckout} onChange={handleCheckout} />
                        </div>
                        <div className='homepage'>
                            <label htmlFor='homepage'>홈페이지</label>
                            <input type='text' id='homepage' value={homepage} onChange={handleHomepage}/>
                        </div>
                        <div className='summary'>
                            <label htmlFor='summary1'>숙소 개요1</label>
                            <textarea id="summary1" cols="30" rows="5" value={accSummary1} onChange={handleAccSummary1}></textarea>
                        </div>
                        <div className='summary'>
                            <label htmlFor='summary2'>숙소 개요2</label>
                            <textarea id="summary2" cols="30" rows="5" value={accSummary2} onChange={handleAccSummary2}></textarea>
                        </div>
                        <div className='only'>
                            <label htmlFor='only'>온스테이하우스에서만</label>
                            <input type='checkbox' id='only' checked={only===1?true:false} onChange={handleOnly} />
                        </div>
                        <div className='acc_img'>
                            <div className='acc_img_upload'>
                                <label htmlFor='acc_img'>숙소이미지</label>
                                <input
                                    type='file'
                                    name='accImgs'
                                    id='accImgs'
                                    ref={accFileInputRef}
                                    onChange={handleAccImg}
                                    accept='image/png, image/jpg, image/jpeg'
                                    multiple
                                />
                            </div>
                            <div className='acc_img_names'>
                                <span>파일명</span>
                                <p className='file_names'></p>
                            </div>
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
                    <div className='room_register'>
                        <div className='register_title'>
                            <p>객실 정보 수정</p>
                        </div>
                        <div className='room_name'>
                            <label htmlFor='room_name'>객실명</label>
                            <input type='text' id='room_name' value={rooms[0].roomName} onChange={(e) => handleRoomChange('roomName',e.target.value)}/>
                        </div>
                        <div className='room_price'>
                            <label htmlFor='room_price'>금액</label>
                            <input type='text' id='room_price' value={rooms[0].roomPrice} onChange={(e) => handleRoomChange('roomPrice',e.target.value)}/>
                        </div>
                        <div className='features'>
                            <span>부대시설</span>
                            <div>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('1')?true:false} value={1} id='feature1' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature1'>빅테이블</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('2')?true:false} value={2} id='feature2' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature2'>정원</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('3')?true:false} value={3} id='feature3' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature3'>테라스</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('4')?true:false} value={4} id='feature4' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature4'>독립 키친</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('5')?true:false} value={5} id='feature5' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature5'>독립 화장실</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('6')?true:false} value={6} id='feature6' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature6'>산책로</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('7')?true:false} value={7} id='feature7' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature7'>샤워실</label>
                                </p>
                                <p>
                                    <input type='checkbox' checked={rooms[0].featureCodesArr.includes('8')?true:false} value={8} id='feature8' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature8'>BBQ</label>
                                </p>
                            </div>
                        </div>
                        <div className='amenities'>
                            <label htmlFor='amenities'>비품</label>
                            <input type='text' id='amenities' value={rooms[0].amenities} onChange={(e) => handleRoomChange('amenities',e.target.value)} />
                        </div>
                        <div className='min_capa'>
                            <label htmlFor='min_capa'>최소인원</label>
                            <input type='text' id='min_capa' placeholder='숫자만 입력해주세요' value={rooms[0].minCapa} onChange={(e) => handleRoomChange('minCapa',e.target.value)} />
                        </div>
                        <div className='max_capa'>
                            <label htmlFor='max_capa'>최대인원</label>
                            <input type='text' id='max_capa' placeholder='숫자만 입력해주세요.' value={rooms[0].maxCapa} onChange={(e) => handleRoomChange('maxCapa',e.target.value)} />
                        </div>
                        <div className='room_img'>
                            <label htmlFor='room_img'>객실이미지</label>
                            <input
                                type='file'
                                name='roomImg'
                                ref={roomFileInputRef}
                                onChange={(e) => handleRoomImg(e)}
                                accept='image/png, image/jpg, image/jpeg'
                                multiple
                            />
                        </div>
                        <div className='room_img_names'>
                            <span>파일명</span>
                            <p className='room_file_names'></p>
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
                        <button type='button' onClick={close}>취소</button>
                        <button type='button' onClick={handleSubmit}>수정완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
}