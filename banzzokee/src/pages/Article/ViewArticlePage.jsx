import styles from './ViewArticlePage.module.css';
import { Link } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import axios from 'axios';

export default function ViewArticlePage() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  // setCookie('accessToken', data['accessToken'], { path: '/' });
  // sessionStorage.setItem('userInfo', JSON.stringify(data.user));
  // sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));

  const { data } = axios.get(`http://localhost:3001/adoption/}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <Link to="/OtherMyPage">
              <div className={styles.headerLeft}>
                <div className={styles.userImage}>
                  <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>user_123</div>
                  <div className={styles.date}>2023-01-03</div>
                </div>
              </div>
            </Link>
            <Link className="chat" to="/Message">
              <div className={styles.messageButton}>
                메세지
                <img className={styles.messageIcon} src="../../../public/Message.png" />
              </div>
            </Link>
          </div>

          <div className={styles.articlePhotos}>
            <div className={styles.imgContainer}>
              <img src="../../../public/dog.webp" alt="" />
            </div>

            <div className={styles.status}>분양중</div>
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>제목은 이곳에 들어갑니다</div>
              <img src="../../../public/save.svg" alt="저장하기" style={{ width: '45px', height: '30px' }} />
            </div>

            <div className={styles.tags}>
              {/* 나중에 리스트로 받아서 map 으로 뿌려준다 */}
              <div className={styles.tag}>태그1</div>
              <div className={styles.tag}>태그2</div>
              <div className={styles.tag}>태그2222</div>
              <div className={styles.tag}>태그2</div>
              <div className={styles.tag}>태그2</div>
              <div className={styles.tag}>태그2</div>
              <div className={styles.tag}>태그2</div>
              <div className={styles.tag}>태그2</div>
            </div>
            <div className={styles.body}>내용은 500자로 제한됩니다.내용은 500자로 제한됩니다.내용은 500자로 제한됩니다.내용은 500자로 제한됩니다.내용은 500자로 제한됩니다.</div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
