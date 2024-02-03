import styles from './ViewArticlePage.module.css';
import { Link, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewArticlePage() {
  const { id } = useParams();
  const [adoption, setAdoption] = useState({});
  
  const getAdoption = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/adoption/${id}`);
      setAdoption(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getAdoption();
  }, [id]);

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
            <button>
              <img src='../../../public/edit.svg'></img>
            </button>
          </div>

          <div className={styles.articlePhotos}>
            <div className={styles.imgContainer}>
              <img src="../../../public/dog.webp" alt="" />
            </div>

            <div className={styles.status}>분양중</div>
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>{adoption.title}</div>
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
            <div className={styles.body}>{adoption.content}</div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
