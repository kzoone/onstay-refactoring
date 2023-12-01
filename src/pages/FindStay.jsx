import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageTitle from '../components/common/PageTitle';
import Filter from '../components/findstay/Filter';
import Sort from '../components/findstay/Sort';
import AccList from '../components/findstay/AccList';

export function FindStay() {
    /**
     * 숙소 리스트 출력
     */
    const [accList, setAccList] = useState([]); //페이지가 로드될 때 서버에서 숙소리스트를 가져오고, 상태 변수 accList에 담아서 페이지에 출력한다.

    useEffect(() => {
        axios
        .get('http://localhost:8000/findstay/')
        .then((res) => {
            setAccList(res.data);
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ' + err);
        })
    }, []);

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
 
     
    return(
        <main className="findstay">
            <PageTitle title={'FIND STAY'} subtitle={'머무는 것 자체로 여행이 되는 공간'} />
            <Filter onSearch={handleSearch} onLocation={handleLocation} codeinfo={codeinfo} locationName={locationName} />
            <Sort /> 
            <AccList accs={accList} searched={searched} location={location} codeinfo={codeinfo} locationName={locationName} />
        </main>
    );
}