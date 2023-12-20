import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import getImgPath from '../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function AccGalleryTop() {
  const [topImage, setTopImage] = useState({acc_name:'',address:'',acc_img:''});
  const {accid} = useParams();

  useEffect(() => {
      axios.get(`${apiBaseUrl}/findstay/acc/gallery/${accid}`)
      .then(result => {
          setTopImage(result.data);
      })
      .catch(error => console.log(error));
  }, [])

  return(
    <div className='gallery_whole_frame'> {/* w: 100p */}
      <div className='gallery_frame'> {/* max-width:1800px , flex*/}
        <div className='gallery_title'>
          <div className='border'></div>
          <div className='acc_name'>{topImage.acc_name}</div>
          <div className='acc_address'>{topImage.address}</div>
        </div>
        <div className='gallery_img'>
          <img src={getImgPath.acc(topImage.acc_img)} alt={`${topImage.acc_name} swiper 이미지`} />
        </div>
      </div>
    </div>
  );
};