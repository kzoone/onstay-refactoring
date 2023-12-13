import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { kakao } = window;

export function AccMap() {
  const [accMap, setAccMap] = useState({});
  const { accid } = useParams();

  useEffect(() => {
    // 서버에서 데이터를 가져옴
    axios
      .get(`http://localhost:8000/findstay/acc/${accid}/map`)
      .then((result) => {
        console.log(result.data);
        setAccMap(result.data);

        // Kakao 지도 API 사용
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(result.data.latitude, result.data.longitude),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);
        map.setDraggable(false);
        map.setZoomable(false);
        const markerPosition = new kakao.maps.LatLng(result.data.latitude, result.data.longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 지도 크기가 변경될 때마다 마커를 중앙에 위치시킴
        kakao.maps.event.addListener(map, 'idle', function() {
          map.setCenter(markerPosition);
        });
      })
      .catch((error) => console.log(error));
  }, [accid]); // accid가 변경될 때마다 useEffect가 다시 실행됨

  return(
      <div className='map_container'>
          <div className='explain'>{accMap.acc_name}의 위치는 {accMap.address}입니다.</div>
          <div className='map_text_container'>
              <div className='mobile-title-container'>
                <div className='text_title'>HELLO</div>
                <div className='text_name'>{accMap.acc_name}</div>
              </div>
              <div>
                <div className='text_address'>{accMap.address}</div>
                <div className='text_tel'>{accMap.tel}</div>
                <div className='text_homepage'>{accMap.homepage}</div>
              </div>
          </div>
        <div className='map' id="map"></div>
      </div>
    ); 
  
}
