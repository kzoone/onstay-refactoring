export default function PriceModal(){
    return(
        <>
            
            <input type='range' id='price' min='0' max='10000000' step='10000' onChange={priceSelect} />
        </>
    );
}