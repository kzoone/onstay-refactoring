import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AccGalleryBottom() {
  const [bottomImages, setBottomImages] = useState(null); // 초기값을 null로 설정
  const { accid } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/findstay/acc/gallery/${accid}/bottom`)
      .then(result => {
        // 응답이 이미지 배열인 것으로 가정합니다.
        setBottomImages(result.data);
      })
      .catch(error => console.log(error));
  }, [accid]);

  return (
    <div className="gallery_whole_frame">
      {bottomImages && bottomImages.map((room, index) => (
        <div className="gallery_frame" key={index}>
          <div className="gallery_title">
            <div className="border"></div>
            <div>{room.room_name}</div>
          </div>
          <div className="gallery_img room_img">
            <img src={`/assets/images/room/${room.room_img1}`} alt="" />
            <img src={`/assets/images/room/${room.room_img2}`} alt="" />
            <img src={`/assets/images/room/${room.room_img3}`} alt="" />
          </div>        
        </div>
      ))}
    </div>
  );
};
