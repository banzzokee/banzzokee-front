import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { kakao } = window;
const Kakao = ({ state }) => {
  console.log('kakao: state:', state);
  const navigate = useNavigate();
  const onclickMarker = () => {
    navigate('/ShelterInfoPage', { state: state });
  };
  if (state == null) {
    return (
      <div>
        <Map
          center={{ lat: 37.5585, lng: 126.8092 }}
          style={{
            width: '100%',
            height: '775px',
          }}
        ></Map>
      </div>
    );
  }
  return (
    <div>
      <Map
        center={{ lat: state.latitude, lng: state.longitude }}
        style={{
          width: '100%',
          height: '775px',
        }}
      >
        <MapMarker
          onClick={onclickMarker}
          image={{
            src: '/Review.png', // 마커이미지의 주소입니다
            size: {
              width: 40,
              height: 40,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
          style={{ border: 'none', display: 'flex', justifyContent: 'center' }}
          position={{ lat: state.latitude, lng: state.longitude }}
        >
          <div onClick={onclickMarker} style={{ height: '30px', padding: '2px', fontWeight: 'bold', border: '1px solid black', backgroundColor: 'white', width: '170px', position: 'absolute', left: '-10px', top: '-1px', borderRadius: '10px' }}>
            {state?.name}
          </div>
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
