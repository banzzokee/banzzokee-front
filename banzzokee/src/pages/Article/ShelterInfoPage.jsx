import styles from './ShelterInfoPage.module.css';
import Header from '../../Header';
import Nav from '../../Nav';

export default function ShelterInfoPage() {
  const photo = <img src="../../../public/User.png"></img>;
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.picture}>{photo}</div>
        <div className={styles.shelterName}>user_123</div>
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
