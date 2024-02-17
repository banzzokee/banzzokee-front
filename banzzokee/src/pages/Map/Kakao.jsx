import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
};

export default Kakao;
