import React, { useEffect, useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';

export default function Sort({onSort, onSortSubmit}){

    const handleSortSubmit = (clicked) => {
        onSort(clicked);
        onSortSubmit(); 
        const buttons = document.querySelectorAll('.sort ul li button');
        buttons.forEach((button)=>{
            button.classList.remove('selected');
        })
        document.querySelector(`.${clicked}`).classList.add('selected');

        if(clicked === 'latest'){
            document.querySelector('.current_sort').innerText = '최신순';
        }else if(clicked === 'highPrice'){
            document.querySelector('.current_sort').innerText = '높은 가격순';
        }else if(clicked === 'lowPrice'){
            document.querySelector('.current_sort').innerText = '낮은 가격순';
        }else{
            document.querySelector('.current_sort').innerText = '추천순';
        }
        
        document.querySelector('.options').style.display = 'none';
    };

    useEffect(() => {
        handleSortSubmit('love');
    }, []);

    /* 모바일에서 select로 보여지게 */
    const toggleOption = () => {
        document.querySelector('.options').style.display = document.querySelector('.options').style.display === 'none' ? 'block' : 'none';
    }
    
    
    return(
        <div className='sort'>
            <ul className='sort_dt'>
                <li><button type='button' className='love' onClick={() => handleSortSubmit('love')}>추천순</button></li>
                <li><button type='button' className='latest' onClick={() => handleSortSubmit('latest')}>최신순</button></li>
                <li><button type='button' className='highPrice' onClick={() => handleSortSubmit('highPrice')}>높은 가격순</button></li>
                <li><button type='button' className='lowPrice' onClick={() => handleSortSubmit('lowPrice')}>낮은 가격순</button></li>
            </ul>
            <div className='select_box' onClick={() => toggleOption()}>
                <div className='current_sort' />
                <IoIosArrowDropdown />
            </div>
            <div className='options'>
                <div className='option' onClick={() => handleSortSubmit('love')}>추천순</div>
                <div className='option' onClick={() => handleSortSubmit('latest')}>최신순</div>
                <div className='option' onClick={() => handleSortSubmit('highPrice')}>높은 가격순</div>
                <div className='option' onClick={() => handleSortSubmit('lowPrice')}>낮은 가격순</div>
            </div>
        </div>
    );
}