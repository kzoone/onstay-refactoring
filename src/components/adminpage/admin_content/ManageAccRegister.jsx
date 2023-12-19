import { TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';


export default function ManageAccRegister({closeInsertModal}){
    
    const [accName, setAccName] = useState('');
    const [tel, setTel] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [parking, setParking] = useState('');
    const [cook, setCook] = useState('');
    const [pet, setPet] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [accCheckin, setAccCheckin] = useState('');
    const [accCheckout, setAccCheckout] = useState('');
    const [homepage, setHomepage] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    const [only, setOnly] = useState(0);
    const [areaCode, setAreaCode] = useState('');
    const [accSummary1, setAccSummary1] = useState('');
    const [accSummary2, setAccSummary2] = useState('');
    
    const [roomName, setRoomName] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [featureCodesArr, setFeatureCodesArr] = useState([]);
    const [amenities, setAmenities] = useState('');
    const [minCapa, setMinCapa] = useState('');
    const [maxCapa, setMaxCapa] = useState('');
    const [roomImg1, setRoomImg1] = useState('');
    const [roomImg2, setRoomImg2] = useState('');
    const [roomImg3, setRoomImg3] = useState('');
    const [accImg1, setAccImg1] = useState('');
    const [accImg2, setAccImg2] = useState('');
    const [accImg3, setAccImg3] = useState('');
    const [accImg4, setAccImg4] = useState('');
    const [accImg5, setAccImg5] = useState('');
    const roomFileInputRef = useRef(null);
    const accFileInputRef = useRef(null);
    
    const handleAccName = (e) => {
        setAccName(e.target.value);
    }
    const handleTel = (e) => {
        setTel(e.target.value);
    }
    const handleParkingChange = (e) => {
        setParking(e.target.value);
    }
    const handleCookChange = (e) => {
        setCook(e.target.value);
    }
    const handlePetChange = (e) => {
        setPet(e.target.value);
    }
    const handleBreakfastChange = (e) => {
        setBreakfast(e.target.value);
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
    
    const handleRoomName = (e) => {
        setRoomName(e.target.value);
    }
    const handleRoomPrice = (e) => {
        setRoomPrice(e.target.value);
    }
    const handleFeatureCodes = (e) => {
        if (e.target.checked) {
            setFeatureCodesArr(prevCodes => [...prevCodes, e.target.value]);
        } else {
            setFeatureCodesArr(prevCodes => prevCodes.filter(code => code !== e.target.value));
        }
    }
    const handleAmenities = (e) => {
        setAmenities(e.target.value);
    }
    const handleMinCapa = (e) => {
        setMinCapa(e.target.value);
    }
    const handleMaxCapa = (e) => {
        setMaxCapa(e.target.value);
    }
    const handleRoomImg = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setRoomImg1(files[0]);
            setRoomImg2(files[1]);
            setRoomImg3(files[2]);
        }
    }; 
    const handleAccImg = (e) => {
        const files = e.target.files;
        if(files.length > 0){
            setAccImg1(files[0]);
            setAccImg2(files[1]);
            setAccImg3(files[2]);
            setAccImg4(files[3]);
            setAccImg5(files[4]);
        }
    }
    
    const handleSubmit = (e) => {
        if (!accName || !tel || !address || !parking || !cook || !pet || !breakfast || !accCheckin || !accCheckout || !homepage || !accSummary1 || !accSummary2 || !roomName || !roomPrice || !minCapa || !maxCapa) {
            alert('모든 입력 항목을 채워주세요.');
        }else{
            e.preventDefault();
            
            const sortedFeatureCodesArr = [...featureCodesArr].sort((a, b) => a - b);
            const featureCodes = sortedFeatureCodesArr.join(',');
            
            const formData = new FormData();
            
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
            formData.append('registerDate', registerDate);
            formData.append('only', only);
            formData.append('areaCode', areaCode);
            formData.append('accSummary1', accSummary1);
            formData.append('accSummary2', accSummary2);
            formData.append('roomName', roomName);
            formData.append('roomPrice', roomPrice);
            formData.append('featureCodes', featureCodes);
            formData.append('amenities', amenities);
            formData.append('minCapa', minCapa);
            formData.append('maxCapa', maxCapa);
            formData.append('roomImg', roomImg1);
            formData.append('roomImg', roomImg2);
            formData.append('roomImg', roomImg3);
            formData.append('accImgs', accImg1);
            formData.append('accImgs', accImg2);
            formData.append('accImgs', accImg3);
            formData.append('accImgs', accImg4);
            formData.append('accImgs', accImg5);
            
            axios({
                url : 'http://localhost:8000/adminpage/accs/insert/',
                method : 'post',
                data : formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then(res => {
                    if (res.data === 'ok') {
                        alert('숙소 등록이 완료되었습니다.'); 
                        window.location.reload();
                }
            })
            .catch((err) => {
                console.error('axios 에러 발생 => ' + err);
            })
            ;
        
            closeInsertModal();
        };
    }
    
    

    const close = () => {
        closeInsertModal();
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
        
        document.querySelector('#address').value = data.address;
        setAddress(data.address);
        setZipcode(data.zonecode);
        if(data.sido==='서울'){
            setAreaCode(1);
        }

        /* 날짜 형식 변환 */
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = '00';
        const minutes = '00';
        const seconds = '00';

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setRegisterDate(formattedDate);
    }


    return(
        <div className="new_register">
            <TfiClose className='close_btn' onClick={close} />
            <div className='logo_img'><img src="/assets/images/main_logo.png" /></div>  
            <div className='register_container'>
                <form className="register_form">
                    <div className='acc_register'>
                        <div className='register_title'>숙소 정보를 입력해주세요</div>
                        <div className='acc_name'>
                            <label htmlFor='acc_name'>숙소명</label>
                            <input type="text" id='acc_name' onChange={handleAccName} />
                        </div>
                        <div className='tel'>
                            <label htmlFor='tel'>전화번호</label>
                            <input type='tel' id='tel' placeholder="- 를 포함해서 입력해주세요" onChange={handleTel}/>
                        </div>
                        <div className='address'>
                            <label htmlFor='address'>숙소 주소</label>
                            <input type='text' id='address' readOnly></input>
                            <button type='button' onClick={openAddressModal}>주소검색</button>
                        </div>
                        {isAddressModal && <div className='address_modal'><DaumPostcode onComplete={handleComplete}/></div>}
                        <div className='parking'>
                            <span>주차</span>
                            <input type='radio' id='parking_possible' name='parking' value={1} onChange={handleParkingChange} /><label htmlFor='parking_possible'>가능</label>
                            <input type='radio' id='parking_impossible' name='parking' value={0} onChange={handleParkingChange} /><label htmlFor='parking_impossible'>불가능</label>
                        </div>
                        <div className='cook'>
                            <span>조리</span>
                            <input type='radio' id='cook_possible' name='cook' value={1} onChange={handleCookChange} /><label htmlFor='cook_possible'>가능</label>
                            <input type='radio' id='cook_impossible' name='cook' value={0} onChange={handleCookChange} /><label htmlFor='cook_impossible'>불가능</label>
                        </div>
                        <div className='pet'>
                            <span>반려동물</span>
                            <input type='radio' id='pet_possible' name='pet' value={1} onChange={handlePetChange} /><label htmlFor='pet_possible'>가능</label>
                            <input type='radio' id='pet_impossible' name='pet' value={0} onChange={handlePetChange} /><label htmlFor='pet_impossible'>불가능</label>
                        </div>
                        <div className='breakfast'>
                            <span>조식</span>
                            <input type='radio' id='breakfast_possible' name='breakfast' value={1} onChange={handleBreakfastChange} /><label htmlFor='breakfast_possible'>가능</label>
                            <input type='radio' id='breakfast_impossible' name='breakfast' value={0} onChange={handleBreakfastChange} /><label htmlFor='breakfast_impossible'>불가능</label>
                        </div>
                        <div className='checkin'>
                            <label htmlFor='checkin'>체크인 시간</label>
                            <input type='time' id='checkin' onChange={handleCheckin} />
                        </div>
                        <div className='checkout'>
                            <label htmlFor='checkout'>체크아웃 시간</label>
                            <input type='time' id='checkout' onChange={handleCheckout} />
                        </div>
                        <div className='homepage'>
                            <label htmlFor='homepage'>홈페이지</label>
                            <input type='text' id='homepage' onChange={handleHomepage}/>
                        </div>
                        <div className='summary'>
                            <label htmlFor='summary1'>숙소 개요1</label>
                            <textarea id="summary1" cols="30" rows="5" onChange={handleAccSummary1}></textarea>
                        </div>
                        <div className='summary'>
                            <label htmlFor='summary2'>숙소 개요2</label>
                            <textarea id="summary2" cols="30" rows="5" onChange={handleAccSummary2}></textarea>
                        </div>
                        <div className='only'>
                            <label htmlFor='only'>온스테이하우스에서만</label>
                            <input type='checkbox' id='only' onChange={handleOnly} />
                        </div>
                        <div className='acc_img'>
                            <label htmlFor='acc_img'>숙소이미지 업로드</label>
                            <input
                                type='file'
                                name='accImgs'
                                ref={accFileInputRef}
                                onChange={handleAccImg}
                                accept='image/png, image/jpg, image/jpeg'
                                multiple
                            />
                        </div>
                    </div>
                    <div className='room_register'>
                        <div className='register_title'>객실 정보를 입력해주세요</div>
                        <div className='room_name'>
                            <label htmlFor='room_name'>객실명</label>
                            <input type='text' id='room_name' onChange={handleRoomName}/>
                        </div>
                        <div className='room_price'>
                            <label htmlFor='room_price'>금액</label>
                            <input type='text' id='room_price' onChange={handleRoomPrice}/>
                        </div>
                        <div className='features'>
                            <span>부대시설</span>
                            <div>
                                <p>
                                    <input type='checkbox' value={1} id='feature1' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature1'>빅테이블</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={2} id='feature2' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature2'>정원</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={3} id='feature3' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature3'>테라스</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={4} id='feature4' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature4'>독립 키친</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={5} id='feature5' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature5'>독립 화장실</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={6} id='feature6' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature6'>산책로</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={7} id='feature7' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature7'>샤워실</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={8} id='feature8' onChange={handleFeatureCodes} />
                                    <label htmlFor='feature8'>BBQ</label>
                                </p>
                            </div>
                        </div>
                        <div className='amenities'>
                            <label htmlFor='amenities'>비품</label>
                            <input type='text' id='amenities' onChange={handleAmenities} />
                        </div>
                        <div className='min_capa'>
                            <label htmlFor='min_capa'>최소인원</label>
                            <input type='text' id='min_capa' placeholder='숫자만 입력해주세요' onChange={handleMinCapa} />
                        </div>
                        <div className='max_capa'>
                            <label htmlFor='max_capa'>최대인원</label>
                            <input type='text' id='max_capa' placeholder='숫자만 입력해주세요' onChange={handleMaxCapa} />
                        </div>
                        <div className='room_img'>
                            <label htmlFor='room_img'>객실이미지</label>
                            <input
                                type='file'
                                name='roomImg'
                                ref={roomFileInputRef}
                                onChange={handleRoomImg}
                                accept='image/png, image/jpg, image/jpeg'
                                multiple
                            />
                        </div>
                    </div>
                    <div className='form_btn'>
                        <button type='reset'>취소</button>
                        <button type='button' onClick={handleSubmit}>등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
}