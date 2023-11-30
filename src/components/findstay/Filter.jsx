import { useState } from 'react';

import Search from './filter/Search';
import Location from './filter/Location';

export default function Filter( { onSearch, onLocation, codeinfo, locationName }){

    return(
        <form className='filter_container' method='POST' action='/'>

            <div className='filter_section'>

                <div className='filter_line1'>
                    <div className='search_location'>
                        <Search onSearch={onSearch} />
                        <Location onLocation={onLocation} codeinfo={codeinfo} locationName={locationName} /> 
                    </div>
                </div>

            </div>

            <div className="btn_section">
                <button className='btn'>SEARCH →</button>
            </div>
        </form>
    );
}