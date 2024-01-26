import styles from './ShelterMyPage.module.css';
import Header from '../../Header';
import Nav from '../../Nav';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function ShelterMyPage() {
  const photo = <img src="../../../public/User.png"></img>;
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.shelterInfo}>
          <div className={styles.picture}>{photo}</div>
          <div className={styles.infoAndName}>
            <Link
              className={styles.viewShelterInfoButton}
              to={{
                pathname: '/ShelterInfoPage',
                data: { name: '서울보호소', body: '주소: 서울시 ㅇㅇ구 ㅇㅇ길' },
              }}
            >
              <Button>보호소 조회</Button>
            </Link>
            <div className={styles.shelterName}>user_123</div>
          </div>
          <p>500자 미만으로 자기소개.500자 미만으로 자기소개500자 미만으로 자기소개.500자 미만으로 자기소개500자 미만으로 자기소개</p>
          <div>
            <Button style={{ width: '100%', color: 'white', fontSize: '20px' }}>팔로우</Button>
          </div>
        </div>
        <div className={styles.articleContainer}>
          <div className={styles.articleHeader}>작성 게시물</div>
          <div className={styles.articleList}>
            <Link>
              <div className={styles.article}>article</div>
            </Link>
            <Link>
              <div className={styles.article}>article</div>
            </Link>
            <Link>
              <div className={styles.article}>article</div>
            </Link>
            <Link>
              <div className={styles.article}>article</div>
            </Link>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
