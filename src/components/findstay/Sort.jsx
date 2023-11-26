import React from "react";

export default function Sort(){

    /**
     * 조건별 정렬 기능 함수
     */
    const accSort = () => {
        console.log('sort')
    }

    return(
        <div className="sort">
            <ul>
                <li><button type='button' onClick={() => accSort('love')}>추천순</button></li>
                <li><button type='button' onClick={() => accSort('latest')}>최신순</button></li>
                <li><button type='button' onClick={() => accSort('highPrice')}>높은 가격순</button></li>
                <li><button type='button' onClick={() => accSort('lowPrice')}>낮은 가격순</button></li>
            </ul>
        </div>
    );
}