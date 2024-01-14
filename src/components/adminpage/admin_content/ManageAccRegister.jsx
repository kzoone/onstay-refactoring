import { TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import RoomRegister from './RoomRegister';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

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

    const [accImg1, setAccImg1] = useState('');
    const [accImg2, setAccImg2] = useState('');
    const [accImg3, setAccImg3] = useState('');
    const [accImg4, setAccImg4] = useState('');
    const [accImg5, setAccImg5] = useState('');
    const accFileInputRef = useRef(null);

    const handleAccImg = (e) => {
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

    const [rooms, setRooms] = useState([
        {
        roomName: "",
        roomPrice: "",
        featureCodesArr: [],
        amenities: "",
        minCapa: "",
        maxCapa: "",
        roomImg: []
        },
    ]);
    
    const handleAddRoomForm = () => {
        if (rooms.length < 3) {
        const newRooms = [...rooms, { roomName: "", roomPrice: "", featureCodesArr: [], amenities: "", minCapa: "", maxCapa: "", roomImg: [] }];
        setRooms(newRooms);
        }else{
            alert('객실은 최대 3개까지 등록할 수 있습니다.');
        }
    };
    const handleRemoveRoomForm = (index) => {
        const newRooms = [...rooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
      };
    
    const handleRoomChange = (index, field, value) => {
        const newRooms = [...rooms];
        newRooms[index] = {...newRooms[index], [field]: value,};
        setRooms(newRooms);
    };
    
    const handleSubmit = (e) => {
        if (!accName || !tel || !address || !parking || !cook || !pet || !breakfast || !accCheckin || !accCheckout || !homepage || !accSummary1 || !accSummary2) {
            alert('모든 입력 항목을 채워주세요.');
        }else if (!accImg1){
            alert('최소 1개의 숙소 이미지를 등록해주세요.');
        }else{
            e.preventDefault();
            
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
            formData.append('rooms', JSON.stringify(rooms));
            rooms.map((room, index) => {
                formData.append(`roomImg${index}`, rooms[index].roomImg[0]);
                formData.append(`roomImg${index}`, rooms[index].roomImg[1]);
                formData.append(`roomImg${index}`, rooms[index].roomImg[2]);
            })
            formData.append('accImgs', accImg1);
            formData.append('accImgs', accImg2);
            formData.append('accImgs', accImg3);
            formData.append('accImgs', accImg4);
            formData.append('accImgs', accImg5);
            
            axios({
                url : `${apiBaseUrl}/adminpage/accs/insert/`,
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
            });
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
                    </div>
                    {rooms.map((room, index) => (
                        <RoomRegister
                            key={index}
                            index={index}
                            room={room}
                            handleRoomChange={handleRoomChange}
                            showRemoveButton={index !== 0}
                            handleRemoveRoomForm={handleRemoveRoomForm}
                        />
                    ))}
                    <button type='button' className='room_add_btn' onClick={handleAddRoomForm}>객실 추가</button>
                    <div className='form_btn'>
                        <button type='button' onClick={close}>취소</button>
                        <button type='button' onClick={handleSubmit}>등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
}