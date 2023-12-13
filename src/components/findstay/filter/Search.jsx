export default function Search({ onSearch }){
    const handleSearch = (e) => {
        const searching = e.target.value;
        onSearch(searching);
    }

     return(
        <div className="search">
            <label htmlFor='search'>스테이/지역</label>
            <input 
                type='text' 
                id='search' 
                placeholder='숙소명을 검색하세요' 
                onChange={handleSearch} 
                autoComplete="off" />
        </div>
     );
}