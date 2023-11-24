export default function Search(){
    return(
        <form className='search_container' method='POST' action='/'>
            <div className='search_wrap'>
                <div className='line1'>
                    <div>
                        <label for='location'>스테이/지역</label>
                        <input type='text' id='location' />
                        <button type='button'>전체</button>
                    </div>
                    <div>
                        <label for='checkin'></label>
                        {/* datepicker */}
                    </div>
                    <div>
                        <label for=''></label>
                        <input type='' id='' />
                    </div>
                </div>
                <div className='line2'>
                    <div>
                        <label for=''></label>
                        <input type='' id='' />
                    </div>
                    <div>
                        <label for=''></label>
                        <input type='' id='' />
                    </div>
                    <div>
                        <label for=''></label>
                        <input type='' id='' />
                    </div>
                </div>

            </div>
        </form>
    );
}