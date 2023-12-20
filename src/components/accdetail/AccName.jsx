import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getImgPath from '../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;

export function AccName() {
    const [accInfo, setAccInfo] = useState({acc_name:'',address:'',acc_img:''});
    const {accid} = useParams();

    useEffect(() => {
        axios.get(`${apiBaseUrl}/findstay/acc/${accid}`)
        .then(result => {
            setAccInfo(result.data);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <div className='visual_section'>
            <div className='img_container'><img src={getImgPath.acc(accInfo.acc_img)} alt="" /></div>
            <div className='text_container'>
                <div className='acc_name'>{accInfo.acc_name}</div>
                <div className='acc_address'>{accInfo.address}</div>
            </div>
            <Link to={`/findstay/acc/gallery/${accid}`} className='gallery_link'><div>사진 모아보기</div></Link>
        </div>
    );
};