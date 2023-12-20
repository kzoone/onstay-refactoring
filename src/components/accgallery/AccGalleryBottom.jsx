import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getImgPath from '../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function AccGalleryBottom() {
  const [bottomImages, setBottomImages] = useState(null); // 초기값을 null로 설정
  const { accid } = useParams();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/findstay/acc/gallery/${accid}/bottom`)
      .then(result => {
        // 응답이 이미지 배열인 것으로 가정합니다.
        setBottomImages(result.data);
      })
      .catch(error => console.log(error));
  }, [accid]);

  return (
    <div className='gallery_whole_frame'>
      {bottomImages && bottomImages.map((room, index) => (
        <div className='gallery_frame' key={index}>
          <div className='gallery_title'>
            <div className='border'></div>
            <div className='room_name'>{room.room_name}</div>
          </div>
          <div className="gallery_img room_img">
            <img src={getImgPath.room(room.room_img1)} alt={`${room.room_name}이미지1`} />
            <img src={getImgPath.room(room.room_img2)} alt={`${room.room_name}이미지2`} />
            <img src={getImgPath.room(room.room_img3)} alt={`${room.room_name}이미지3`} />
          </div>        
        </div>
      ))}
    </div>
  );
};
