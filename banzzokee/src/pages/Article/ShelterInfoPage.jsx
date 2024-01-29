import styles from './ShelterInfoPage.module.css';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';

export default function ShelterInfoPage() {
  const photo = <img src="../../../public/User.png"></img>;
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.picture}>{photo}</div>

        <Link to="/ShelterEditPage">
          <Button>보호소 수정</Button>
        </Link>

        <div className={styles.shelterInfo}>
          <p>
            보호소 이름: <span>서울 보호소</span>
          </p>
          <p>보호소 소개:</p>
          <p>연락처: </p>
          <p>주소: </p>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
