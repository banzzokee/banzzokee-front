import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { useEffect } from 'react';
const { kakao } = window;
const Kakao = () => {
  return (
    <div>
      <Map
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: '100%',
          height: '645px',
        }}
      >
        <MapMarker style={{ border: 'tranparent' }} position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}>
          <div style={{}}></div>
        </MapMarker>
      </Map>
    </div>
  );

  // const [map, setMap] = useState(null);

  // //처음 지도 그리기
  // useEffect(() => {
  //   const container = document.getElementById('map');
  //   const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
  //   const kakaoMap = new kakao.maps.Map(container, options);
  //   setMap(kakaoMap);
  // }, []);

  // return (
  //   <div
  //     style={{
  //       width: '100%',
  //       height: '100%',
  //       display: 'inline-block',
  //       marginLeft: '5px',
  //       marginRight: '5px',
  //     }}
  //   >
  //     <div id="map" style={{ width: '100%', height: '100%' }}></div>
  //   </div>
  // );
};

export default Kakao;
