import styles from './MapPage.module.css';
import MapHeader from '../../components/common/header/MapHeader';
import Nav from '../../components/common/nav/Nav';

export default function MapPage() {
  return (
    <>
      <MapHeader></MapHeader>
      <div className={styles.container}>지도가 들어갑니다</div>
      <Nav></Nav>
    </>
  );
}
