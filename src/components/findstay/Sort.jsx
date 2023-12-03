import React from 'react';

export default function Sort({onSort, onSortSubmit}){

    const handleSortSubmit = (clicked) => {
        onSort(clicked);
        onSortSubmit(); 
    };

    return(
        <div className='sort'>
            <ul>
                <li><button type='button' onClick={() => handleSortSubmit('love')}>추천순</button></li>
                <li><button type='button' onClick={() => handleSortSubmit('latest')}>최신순</button></li>
                <li><button type='button' onClick={() => handleSortSubmit('highPrice')}>높은 가격순</button></li>
                <li><button type='button' onClick={() => handleSortSubmit('lowPrice')}>낮은 가격순</button></li>
            </ul>
        </div>
    );
}