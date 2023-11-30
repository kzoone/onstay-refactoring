export default function Price(){
    return(
        <>
            <label htmlFor='price'>가격 범위</label>
            <input type='range' id='price' min='0' max='10000000' step='10000' onChange={priceSelect} />
        </>
    );
}