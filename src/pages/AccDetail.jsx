import AccAbout from "../components/accdetail/AccAbout";
import { AccMap } from "../components/accdetail/AccMap";
import { AccName } from "../components/accdetail/AccName";
import { AccSummary } from "../components/accdetail/AccSummary";
import { RoomSwiper } from "../components/accdetail/RoomSwiper";
import "../style/pages/_accdetail.scss";

export function AccDetail(){
    return(
        <>
            <AccName />
            <RoomSwiper />
            <AccSummary />
            <AccMap />
            <AccAbout />
        </>
    );
}