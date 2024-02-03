import styles from './ViewArticlePage.module.css';
import { Link, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function ViewArticlePage() {
  // const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  // setCookie('accessToken', data['accessToken'], { path: '/' });
  const [adoption, setAdoption] = useState({});
  // sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
  const { adoptionId } = useParams();
  useEffect(() => {
    const getArticle = async () => {
      try {
        console.log(adoptionId);
        const response = await axios.get(`http://localhost:3001/adoption/${adoptionId}`);
        setAdoption(response.data);
        // sessionStorage.setItem('articleInfo', JSON.stringify(response.data));
        // const response = axios.get(`http://localhost:3001/adoption/}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
      } catch (error) {
        console.error(error);
      }
    };
    getArticle();
  }, [adoptionId]);
  // const adoption = JSON.parse(sessionStorage.getItem('articleInfo'));
  const tags = [adoption.breed, adoption.size, adoption.neutering ? '중성화' : '중성화안됨', adoption.gender, `${adoption.age}살`, adoption.healthChecked ? '건강검진' : '검진x', `보호소 등록: ${adoption.registeredAt}`];
  // console.log(adoption);

  return (
    <>
      <div>
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
                    <div className={styles.name}>{adoption.nickname}</div>
                    <div className={styles.date}>{adoption.createdAt}</div>
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
                <img src={adoption.imageUrls} alt="" />
              </div>

              <div className={styles.status}>분양중</div>
            </div>
            <div className={styles.articleTexts}>
              <div className={styles.titleAndSave}>
                <div className={styles.title}>{adoption.title}</div>
                <img src="../../../public/save.svg" alt="저장하기" style={{ width: '45px', height: '30px' }} />
              </div>

              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.body}>{adoption.content}</div>
            </div>
          </div>
        </div>
        <Nav></Nav>
      </div>
    </>
  );
}
