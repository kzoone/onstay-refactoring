import { AccGalleryBottom } from "../components/accgallery/AccGalleryBottom";
import { AccGalleryMiddle } from "../components/accgallery/AccGalleryMiddle";
import { AccGalleryTop } from "../components/accgallery/AccGalleryTop";

export function AccGallery() {
    return(
        <>
            <AccGalleryTop />
            <AccGalleryMiddle />
            <AccGalleryBottom />
        </>
    );
}