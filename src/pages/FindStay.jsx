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
    const [accList, setAccList] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8000/findstay/')
        .then((res) => {
            setAccList(res.data);
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ',err);
        })
    }, []);

    /**
     * 지역코드를 지역명으로 변환
     */
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

    const area = (area_code) => {
        return codeinfo[area_code];
    };

    return(
        <main className="findstay">
            <PageTitle title={'FIND STAY'} subtitle={'머무는 것 자체로 여행이 되는 공간'} />
            <Filter />
            <Sort /> 
            <AccList accs={accList} area={area} />
        </main>
    );
}