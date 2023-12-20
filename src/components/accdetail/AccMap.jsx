import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { kakao } = window;
const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;

export function AccMap() {
  const [accMap, setAccMap] = useState({});
  const { accid } = useParams();
  const [map, setMap] = useState(null); // 상태로 map 객체 추가


  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/findstay/acc/${accid}/map`)
      .then((result) => {
        setAccMap(result.data);

        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(result.data.latitude, result.data.longitude),
          level: 3,
        };

        // Set the map to the state
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);

        newMap.setDraggable(false);
        newMap.setZoomable(false);

        const markerPosition = new kakao.maps.LatLng(result.data.latitude, result.data.longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(newMap);

        kakao.maps.event.addListener(newMap, 'idle', function () {
          newMap.setCenter(markerPosition);
        });

        // Add ZoomControl after the map is created
        const zoomControl = new kakao.maps.ZoomControl();
        newMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      })
      .catch((error) => console.log(error));
  }, [accid]); // accid가 변경될 때마다 useEffect가 다시 실행됨

  return(
      <div className='map_container'>
          <div className='explain'>{accMap.acc_name}의 위치는 {accMap.address}입니다.</div>
          <div className='map_text_container'>
              <div className='mobile_title_container'>
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
