export default function Search(){
    const search = () => {
        console.log('입력중')
    }

    return(
        <form className='search_container' method='POST' action='/'>

            <div className='filter_section'>
                <div>
                    <div>
                        <label for='location'>스테이/지역</label>
                        <input type='text' id='location' placeholder='숙소명을 입력하세요' onChange={(e)=>search(e.target.value)}/>
                        <button type='button'>전체</button>
                    </div>
                    <div>
                        <label for='checkin'>체크인</label>
                        <input type='button' id='checkin' value='체크인' />
                    </div>
                    <div>
                        <label for='checkout'>체크아웃</label>
                        <input type='button' id='checkout' value='체크아웃' />
                    </div>
                </div>
                <div>
                    <div>
                        <label for=''>인원</label>
                        <input type='' id='' />
                    </div>
                    <div>
                        <label for=''>가격 범위</label>
                        <input type='' id='' />
                    </div>
                    <div>
                        <label for=''>편의시설</label>
                        <input type='' id='' />
                    </div>
                </div>
            </div>

            <div className="btn_section">
                <button className='btn' type='button'>SEARCH →</button>
            </div>
        </form>
    );
}