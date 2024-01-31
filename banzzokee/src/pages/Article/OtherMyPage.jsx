import styles from './OtherMyPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function OtherMyPage() {
  const [follow, setFollow] = useState(false);
  function onClick() {
    setFollow(!follow);
  }

  const photo = <img src="../../../public/User.png"></img>;

  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
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
            <button style={{ width: '100%', color: 'white', backgroundColor: follow ? '#bebebe' : '#add8e6', fontSize: '20px' }} onClick={onClick}>
              {follow ? '팔로잉' : '팔로우'}
            </button>
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
