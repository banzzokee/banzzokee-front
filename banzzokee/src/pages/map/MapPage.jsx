import styles from './MapPage.module.css';
import MapHeader from '../../components/common/header/MapHeader';
import Nav from '../../components/common/nav/Nav';
import Kakao from './Kakao';
import { useLocation } from 'react-router-dom';
export default function MapPage() {
  const { state } = useLocation();
  if (state == null) {
    return (
      <>
        <MapHeader></MapHeader>
        <div className={styles.container}>
          <Kakao></Kakao>
        </div>
        <Nav></Nav>
      </>
    );
  }
  return (
    <>
      <MapHeader></MapHeader>
      <div className={styles.container}>
        <Kakao state={state}></Kakao>
      </div>
      <Nav></Nav>
    </>
  );
}
