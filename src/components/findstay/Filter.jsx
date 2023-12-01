import { useState } from 'react';

import Search from './filter/Search';
import Location from './filter/Location';
import Personnel from './filter/Personnel';

export default function Filter( { onSearch, onLocation, codeinfo, locationName, onPersonnel, onFilterSubmit}){

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterSubmit(); 
    };


    return(
        <form className='filter_container' onSubmit={handleSubmit}>

            <div className='filter_section'>

                <div className='filter_line1'>
                    <div className='search_location'>
                        <Search onSearch={onSearch} />
                        <Location onLocation={onLocation} codeinfo={codeinfo} locationName={locationName} /> 
                    </div>
                </div>
                
                <div className='filter_line2'>
                    <div className='personnel'>
                        <Personnel onPersonnel={onPersonnel} />
                    </div>
                </div>

            </div>

            <div className="btn_section">
                <button className='btn'>SEARCH →</button>
            </div>
        </form>
    );
}