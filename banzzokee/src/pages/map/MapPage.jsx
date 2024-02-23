import styles from './MapPage.module.css';
import MapHeader from '../../components/common/header/MapHeader';
import Nav from '../../components/common/nav/Nav';
import Kakao from './Kakao';
export default function MapPage() {
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
