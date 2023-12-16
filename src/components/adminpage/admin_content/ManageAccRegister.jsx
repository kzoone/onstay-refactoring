import { TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';


export default function ManageAccRegister({closeModal}){

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
    const fileInputRef = useRef(null);

    

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
    const handleRoomImg1 = (e) => {
        const file = e.target.files[0];
        setRoomImg1(file);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const sortedFeatureCodesArr = [...featureCodesArr].sort((a, b) => a - b);
        const featureCodes = sortedFeatureCodesArr.join(',');
    
        axios({
            url : 'http://localhost:8000/adminpage/accs/insert/',
            method : 'post',
            data : {accName, tel, zipcode, address, latitude, longitude, parking, cook, pet, breakfast, accCheckin, accCheckout, 
                    homepage, registerDate, only, areaCode, accSummary1, accSummary2,
                    roomName, roomPrice, featureCodes, amenities, minCapa, maxCapa, roomImg1}
        })
        .then(res => {
            if (res.data === 'ok') {
                console.log(res.data);
                alert('숙소 등록이 완료되었습니다.'); 
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(accName, tel, zipcode, address, latitude, longitude, parking, cook, pet, breakfast, accCheckin, accCheckout, homepage, registerDate, only, areaCode, accSummary1, accSummary2);
            console.error('axios 에러 발생 => ' + err);
        })
        ;
    
        closeModal();
      };

    
    

    const close = () => {
        closeModal();
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
        
        document.querySelector('#searched_address').value = data.address;
        setAddress(data.address);
        setZipcode(data.zonecode);
        if(data.sido==='서울'){
            setAreaCode(1);
        }

        /* 날짜 형식 변환 */
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줌
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = '00';
        const minutes = '00';
        const seconds = '00';

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setRegisterDate(formattedDate);
    }

    /* 파일 업로드 */


    return(
        <div className="manage_acc_register">
            <TfiClose className='close_btn' onClick={close} />
            <div><img src="/assets/images/main_logo.png" /></div>  
            <div>
                <form className="acc_register_form">
                    <div className='register_title'>1. 숙소 정보 등록</div>
                    <p>
                        <span>숙소명</span>
                        <input type="text" onChange={handleAccName}/>
                    </p>
                    <p>
                        <span>전화번호</span>
                        <input type='tel' placeholder="- 를 포함해서 입력해주세요" onChange={handleTel}/>
                    </p>
                    <p>
                        <span>숙소 주소</span>
                        <input type='text' id='searched_address' readOnly />
                        <button type='button' onClick={openAddressModal}>주소검색</button>
                    </p>
                    {isAddressModal && <DaumPostcode className='address_modal' onComplete={handleComplete}/>}
                    <p>
                        <span>주차</span>
                        <input type='radio' className='radio' name='parking' value={1} onChange={handleParkingChange} /><span className='radio'>가능</span>
                        <input type='radio' className='radio' name='parking' value={0} onChange={handleParkingChange} /><span className='radio'>불가능</span>
                    </p>
                    <p>
                        <span>조리</span>
                        <input type='radio' className='radio' name='cook' value={1} onChange={handleCookChange} /><span className='radio'>가능</span>
                        <input type='radio' className='radio' name='cook' value={0} onChange={handleCookChange} /><span className='radio'>불가능</span>
                    </p>
                    <p>
                        <span>반려동물</span>
                        <input type='radio' className='radio' name='pet' value={1} onChange={handlePetChange} /><span className='radio'>가능</span>
                        <input type='radio' className='radio' name='pet' value={0} onChange={handlePetChange} /><span className='radio'>불가능</span>
                    </p>
                    <p>
                        <span>조식</span>
                        <input type='radio' className='radio' name='breakfast' value={1} onChange={handleBreakfastChange} /><span className='radio'>가능</span>
                        <input type='radio' className='radio' name='breakfast' value={0} onChange={handleBreakfastChange} /><span className='radio'>불가능</span>
                    </p>
                    <p>
                        <span>체크인 가능 시간</span>
                        <input type='time' onChange={handleCheckin} />
                    </p>
                    <p>
                        <span>체크아웃 시간</span>
                        <input type='time' onChange={handleCheckout} />
                    </p>
                    <p>
                        <span>홈페이지</span>
                        <input type='text' onChange={handleHomepage}/>
                    </p>
                    <p className='summary'>
                        <span>숙소 개요1</span>
                        <textarea name="" id="" cols="30" rows="10" onChange={handleAccSummary1}></textarea>
                    </p>
                    <p className='summary'>
                        <span>숙소 개요2</span>
                        <textarea name="" id="" cols="30" rows="10" onChange={handleAccSummary2}></textarea>
                    </p>
                    <p>
                        <span>온스테이하우스에서만</span>
                        <input type='checkbox' className='checkbox' onChange={handleOnly} />
                    </p>
                    <div className='room_register'>
                        <div className='register_title'>2. 객실 정보 등록</div>
                        <p>
                            <span>객실명</span>
                            <input type='text' onChange={handleRoomName}/>
                        </p>
                        <p>
                            <span>금액</span>
                            <input type='text' onChange={handleRoomPrice}/>
                        </p>
                        <div className='features'>
                            <span>부대시설</span>
                            <div>
                                <p>
                                    <input type='checkbox' value={1} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>빅테이블</label>
                                    <input type='checkbox' value={2} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>수영장</label>
                                    <input type='checkbox' value={3} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>오픈배스</label>
                                    <input type='checkbox' value={4} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>정원</label>
                                    <input type='checkbox' value={5} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>테라스</label>
                                </p>
                                <p>
                                    <input type='checkbox' value={6} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>독립 키친</label>
                                    <input type='checkbox' value={7} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>독립 화장실</label>
                                    <input type='checkbox' value={8} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>산책로</label>
                                    <input type='checkbox' value={9} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>샤워실</label>
                                    <input type='checkbox' value={10} className='checkbox' onChange={handleFeatureCodes} />
                                    <label>BBQ</label>
                                </p>
                            </div>
                        </div>
                        <p>
                            <span>비품</span>
                            <input type='text' onChange={handleAmenities} />
                        </p>
                        <p>
                            <span>최소인원</span>
                            <input type='text' placeholder='숫자만 입력해주세요' onChange={handleMinCapa} />
                        </p>
                        <p>
                            <span>최대인원</span>
                            <input type='text' placeholder='숫자만 입력해주세요' onChange={handleMaxCapa} />
                        </p>
                        <p>
                            <label htmlFor='room_image'>객실이미지 : </label>
                            <input
                                type='file'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleRoomImg1}
                                accept='image/png, image/jpg, image/jpeg'
                            />
                        </p>

                        <div className='form_btn'>
                            <button type='reset'>취소</button>
                            <button onClick={handleSubmit}>등록</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}