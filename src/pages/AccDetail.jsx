import { AccMap } from "../components/accdetail/AccMap";
import { AccName } from "../components/accdetail/AccName";
import { AccPoint } from "../components/accdetail/AccPoint";
import { AccSummary } from "../components/accdetail/AccSummary";
import { RoomSwiper } from "../components/accdetail/RoomSwiper";


export function AccDetail(){
    return(
        <>
            <AccName />
            <RoomSwiper />
            <AccSummary />
            <AccPoint />
            <AccMap />
        </>
    );
}