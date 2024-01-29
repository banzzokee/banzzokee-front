import styles from './MapPage.module.css';
import Header from '../../components/common/header/Header';
import Nav from '../../components/common/nav/Nav';

export default function MapPage() {
  return (
    <>
      <Header></Header>
      <div className={styles.container}>지도가 들어갑니다</div>
      <Nav></Nav>
    </>
  );
}
