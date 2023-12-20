import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getImgPath from '../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;

export function AccPoint() {
  const [accPoint, setAccPoint] = useState({acc_img:''})
  const {accid} = useParams();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/findstay/acc/${accid}/point`)
    .then(result => {
      setAccPoint(result.data);
    })
    .catch(error => console.log(error));

  },[])

  return(
    <div className='whole_point_section'>
      <div className='point_section'>
        <div className='img_container'>
          <img src={getImgPath.acc(accPoint.acc_img)} alt="숙소 이미지" />
        </div>
        <div className='point_comment_box'>
          <div className='point_section_title'>SPECIAL</div>
          <div className='point_section_flex'>
            <div className='point_small_frame'>
              <img src='https://images.stayfolio.com/system/pictures/images/000/149/359/original/e24557bacb7bbb3df32a827802844d9388db209c.png?1666668208' alt='다락 로고' />
              <div className='point_comment_title'>다락</div>
            </div>
            <div className='point_comment_summary'>
              다락은 자주 들여다보지 않는 앨범처럼 
              나만의 기억과 추억들이 쌓여있는 작고 외딴 방을 말합니다. 
              ‘사유다락’은 나의 내면속으로 
              고요히 사유하고 치유할 수 있는 오롯한 나만의 공간입니다.
              방해받지 말고 휴식하세요.            
            </div>
          </div>
        </div>
        <div className='point_comment_box'>
          <div className='point_section_flex'>
            <div className='point_small_frame'>
              <img src='https://images.stayfolio.com/system/pictures/images/000/207/754/original/995a87bcbf42ddb61873e958f0a9916a4a784381.png?1701071998' alt='디자인 로고' />
              <div className='point_comment_title'>디자인</div>
            </div>
            <div className='point_comment_summary'>
              가장 멋스런 공간에서 
              한옥의 따뜻함에 유럽 감성을 더해 특별하고 
              색다른 공간을 연출했습니다. 
              울창한 나무들은 도심 속에서도 
              자연을 느끼게 하고, 커다란 창밖의 지붕으로 
              내리는 빗소리와 쌓이는 눈은 계절의 변화를 기대하게 합니다.
            </div>
          </div>
        </div>
        <div className='point_comment_box'>
            <div className='point_section_flex'>
              <div className='point_small_frame'>
                <img src='https://images.stayfolio.com/system/pictures/images/000/121/772/original/8efdf2464fe29d2d6a1226f1692160fefdb7d436.png?1652148013' alt='마당 로고' />
                <div className='point_comment_title'>마당</div>
              </div>
              <div className='point_comment_summary'>
                한옥은 앞마당과 뒷마당이 있습니다. 
                풍경소리가 울려퍼지는 앞마당에서 
                툇마루에 앉아 사색에 잠겨보고 노을이 질 때면 
                붉은 햇볕이 뒷마당을 물들입니다. 
                마당에서 나만의 시간을 즐겨보세요.
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}