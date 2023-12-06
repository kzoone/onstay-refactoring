import Search from './filter/Search';
import Location from './filter/Location';
import Checkin from './filter/Checkin';
import Checkout from './filter/Checkout';
import Personnel from './filter/Personnel';
import Price from './filter/Price';
import Service from './filter/Service';

export default function Filter( { onSearch, onLocation, codeinfo, locationName, onPersonnel, onMinPrice, onMaxPrice, onParking, onCook, onPet, onBreakfast, onCheckin, onCheckout, checkin, checkout}){
    return(
        <div className='filter_container'>
            <div className='filter'>
                <Search onSearch={onSearch} />
                <Location onLocation={onLocation} codeinfo={codeinfo} locationName={locationName} /> 
                <div className='date'>
                    <div className='select_date'>날짜</div>
                    <Checkin onCheckin={onCheckin} checkin={checkin} checkout={checkout} />
                    <span className='tilde'>~</span>
                    <Checkout onCheckout={onCheckout} checkin={checkin} checkout={checkout} /> 
                </div>
            </div>
            <div className='filter'>
                <Personnel onPersonnel={onPersonnel} />
                <Price onMinPrice={onMinPrice} onMaxPrice={onMaxPrice} />
                <Service onParking={onParking} onCook={onCook} onPet={onPet} onBreakfast={onBreakfast} />
            </div>
        </div>
    );
}