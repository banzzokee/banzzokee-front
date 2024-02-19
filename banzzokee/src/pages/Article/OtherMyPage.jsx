import styles from './OtherMyPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function OtherMyPage() {
  const [follow, setFollow] = useState(false);
  const { state } = useLocation();
  console.log(state);
  function onClick() {
    setFollow(!follow);
  }
  let photo = <img src="../../../public/User.png"></img>;
  if (state.profileImgUrl) {
    photo = <img src={state.profileImgUrl} />;
  }
  let nickname = '';
  if (state.nickname) {
    nickname = state.nickname;
  }
  let introduce = '';
  if (state.introduce) {
    introduce = state.introduce;
  }

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
            <div className={styles.shelterName}>{nickname}</div>
          </div>
          <p className={styles.introduce}>{introduce}</p>
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
