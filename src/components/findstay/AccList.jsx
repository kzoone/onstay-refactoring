import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Acc from './Acc';

export default function AccList({accs, searched, location, codeinfo, locationName, isParking, isCook, isPet, isBreakfast}){
    //검색어에 따라 숙소를 필터링하고, 필터링된 숙소만을 보여줌
    const accFilter = accs.filter(acc => 
        acc.acc_name.includes(searched) &&
        (location === '전체' || acc.area_code == location) &&
        (isParking===0 ? acc.parking===0 || acc.parking===1 : acc.parking===1) &&
        (isCook===0 ? acc.cook===0 || acc.cook===1 : acc.cook===1) &&
        (isPet===0 ? acc.pet===0 || acc.pet===1 : acc.pet===1) &&
        (isBreakfast===0 ? acc.breakfast===0 || acc.breakfast===1 : acc.breakfast===1)
    );


    return(
        <div className='acc_list'>
            {accFilter.length > 0 ? (
                accFilter.map((acc) => 
                    <Acc key={acc.acc_id} acc={acc} location={location} codeinfo={codeinfo} locationName={locationName} />
                )
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};