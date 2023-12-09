import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PageTitle from '../components/common/PageTitle';
import Filter from '../components/findstay/Filter';
import Sort from '../components/findstay/Sort';
import AccList from '../components/findstay/AccList';

export function FindStay() {

    /**
     * 숙소 리스트 출력
     */
    const [accList, setAccList] = useState([]);

    /**
     * 입력한 검색어
     */
    const [searched, setSearched] = useState('');
    const handleSearch = (inputText) => {
        setSearched(inputText);
    }

    /**
     *  선택 지역
    */
    const [location, setLocation] = useState('전체');
    const handleLocation = (selectedLocation) => {
        setLocation(selectedLocation);
    }
    
    const codeinfo = {
        1: '서울',
        2: '강원',
        3: '부산',
        4: '경기',
        5: '충북',
        6: '충남',
        7: '경북',
        8: '경남',
        9: '전북',
        10: '전남',
        11: '인천',
        12: '광주',
        13: '대전',
        14: '대구',
        15: '제주',
    };

    const locationName = (area_code) => {
        return codeinfo[area_code];
    };

    /**
     * 체크인, 체크아웃
     */
    const [checkin, setCheckin] = useState(null);
    const handleCheckin = (selectedCheckin) => {
        setCheckin(selectedCheckin);
    }
    const [checkout, setCheckout] = useState(null);
    const handleCheckout = (selectedCheckout) => {
        setCheckout(selectedCheckout);
    }
 
    /**
     * 선택 인원
     */
    const [personnel, setPersonnel] = useState(1);
    const handlePersonnel = (selectedPersonnel) => {
        setPersonnel(selectedPersonnel);
    }

    
    /**
     * 선택한 가격
    */
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    const handleMinPrice = (selectedMinPrice) => {
        setMinPrice(selectedMinPrice);
    }
    const handleMaxPrice = (selectedMaxPrice) => {
        setMaxPrice(selectedMaxPrice);
    }

    /**
     * 서비스
     */
    const [isParking, setIsParking] = useState(0);
    const [isCook, setIsCook] = useState(0);
    const [isPet, setIsPet] = useState(0);
    const [isBreakfast, setIsBreakfast] = useState(0);

    const handleParking = (clickParking) => {
        setIsParking(clickParking);
    }
    const handleCook = (clickCook) => {
        setIsCook(clickCook);
    }
    const handlePet = (clickPet) => {
        setIsPet(clickPet);
    }
    const handleBreakfast = (clickBreakfast) => {
        setIsBreakfast(clickBreakfast);
    }
    
    /**
     * 조건별 정렬
    */
    const [sort, setSort] = useState('love');
    const handleSort = (clickedSort) => {
        setSort(clickedSort);
    }

    /**
     * 유저가 좋아요 누름
     */
    const handleLove = () => {
        handleSubmit();
    }
    
    /**
     * 서버로 값 전달
     */
    const handleSubmit = () => {
        const params = {
            searched, 
            location, 
            checkin, 
            checkout,  
            personnel, 
            minPrice, 
            maxPrice, 
            isParking, 
            isCook, 
            isPet, 
            isBreakfast, 
            sort
        }
        axios
        .get('http://localhost:8000/findstay/',{params})
        .then((res) => {
            if(res.data){
                setAccList(res.data);
            }
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ' + err);
        })
    }
    
    useEffect(() => {
        handleSubmit();
    }, [searched, location, checkin, checkout,  personnel, minPrice, maxPrice, isParking, isCook, isPet, isBreakfast, sort]);

    
    return(
        <main className='findstay'>
            <PageTitle 
                title={'FIND STAY'} 
                subtitle={'머무는 것 자체로 여행이 되는 공간'} 
            />
            <Filter 
                onSearch={handleSearch} 
                onLocation={handleLocation} 
                codeinfo={codeinfo} 
                locationName={locationName} 
                onCheckin={handleCheckin}
                onCheckout={handleCheckout}
                onPersonnel={handlePersonnel} 
                onMinPrice={handleMinPrice}
                onMaxPrice={handleMaxPrice}
                onParking={handleParking}
                onCook={handleCook}
                onPet={handlePet}
                onBreakfast={handleBreakfast}
                checkin={checkin}
                checkout={checkout}
            />
            <Sort onSort={handleSort} onSortSubmit={handleSubmit} /> 
            <AccList 
                accs={accList}
                location={location} 
                codeinfo={codeinfo} 
                locationName={locationName}
                handleLove={handleLove}
            />
        </main>
    );
}