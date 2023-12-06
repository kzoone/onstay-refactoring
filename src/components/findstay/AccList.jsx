import React, { useEffect, useState } from 'react';
import Acc from './Acc';

export default function AccList({accs, searched, location, codeinfo, locationName, personnel, minPrice, maxPrice, isParking, isCook, isPet, isBreakfast}){
    //검색어에 따라 숙소를 필터링하고, 필터링된 숙소만을 보여줌
    const accFilter = accs.filter(acc => 
        acc.acc_name.includes(searched) &&
        (location === '전체' || acc.area_code == location) &&
        (isParking===0 ? acc.parking===0 || acc.parking===1 : acc.parking===1) &&
        (isCook===0 ? acc.cook===0 || acc.cook===1 : acc.cook===1) &&
        (isPet===0 ? acc.pet===0 || acc.pet===1 : acc.pet===1) &&
        (isBreakfast===0 ? acc.breakfast===0 || acc.breakfast===1 : acc.breakfast===1) &&
        (personnel <= acc.max_capa) &&
        (minPrice <= parseInt(acc.room_price) && maxPrice >= parseInt(acc.room_price))
    );

    return(
        <>
        <div>총{accFilter.length}개의 숙소</div>
        <div className='acc_list'>
            {accFilter.length > 0 ? (
                accFilter.map((acc) => 
                <React.Fragment key={acc.acc_id}>
                    <Acc acc={acc} location={location} codeinfo={codeinfo} locationName={locationName} />
                </React.Fragment>
                )
            ) : (
                <p className='nothing'>조건에 해당하는 숙소가 없습니다.</p>
            )}
        </div>
        </>
    );
};