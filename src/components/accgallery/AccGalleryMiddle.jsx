import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function AccGalleryMiddle() {
  const [middleImages, setMiddleImages] = useState([]);
  const { accid } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/findstay/acc/gallery/${accid}/middle`)
      .then(result => {
        // 응답이 이미지 배열인 것으로 가정합니다.
        setMiddleImages(result.data);
      })
      .catch(error => console.log(error));
  }, [accid]);

  return (
    <div className='gallery_whole_frame'>
      <div className='gallery_frame'>
        <div className='gallery_title'></div>
        <div className='gallery_img'>
          {middleImages.map((image, index) => (
            <img className='acc_img' key={index} src={`/assets/images/acc/${image.acc_img}`} alt={`이미지 ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
