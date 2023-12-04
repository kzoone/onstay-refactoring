import Search from './filter/Search';
import Location from './filter/Location';
import Checkin from './filter/Checkin';
import Checkout from './filter/Checkout';
import Personnel from './filter/Personnel';
import Price from './filter/Price';
import Service from './filter/Service';

export default function Filter( { onSearch, onLocation, codeinfo, locationName, onPersonnel, onMinPrice, onMaxPrice, onParking, onCook, onPet, onBreakfast, onCheckin, onCheckout}){
    return(
        <div className='filter_container'>
            <div className='filter_section'>
                <div className='filter_line1'>
                    <div className='search_location'>
                        <Search onSearch={onSearch} />
                        <Location onLocation={onLocation} codeinfo={codeinfo} locationName={locationName} /> 
                    </div>
                    <div className='checkin'>
                        <Checkin onCheckin={onCheckin} />
                    </div>
                    <div className='tilde'>~</div>
                    <div className='checkout'>
                        <Checkout onCheckout={onCheckout} />
                    </div>
                </div>
                
                <div className='filter_line2'>
                    <div className='personnel'>
                        <Personnel onPersonnel={onPersonnel} />
                    </div>
                    <div className='price'>
                        <Price onMinPrice={onMinPrice} onMaxPrice={onMaxPrice} />
                    </div>
                    <div className='service'>
                        <Service onParking={onParking} onCook={onCook} onPet={onPet} onBreakfast={onBreakfast} />
                    </div>
                </div>
            </div>
        </div>
    );
}