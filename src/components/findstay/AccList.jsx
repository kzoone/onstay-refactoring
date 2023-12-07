import React, { useEffect, useState } from 'react';
import Acc from './Acc';

export default function AccList({accs, location, codeinfo, locationName}){

    return(
        <>
        <div>총{accs.length}개의 숙소</div>
        <div className='acc_list'>
            {accs.length > 0 ? (
                accs.map((acc) => 
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