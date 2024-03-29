import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './Tags';

export default function BookmarkList() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  // console.log(userId);
  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/bookmarks/adoptions`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      // url: `https://server.banzzokee.homes/api/bookmarks/adoptions?page=0&size=10&direction=desc`,
      const response = await axios.request(config);
      console.log(response.data.content);
      setArticleList(response.data.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getArticleList();
  }, []);
  if (articleList.length == 0) {
    return <div>북마크한 게시물이 없습니다.</div>;
  }
  return (
    <div className={styles.listBox}>
      <ul>
        {articleList &&
          articleList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? <img src={adoption.imageUrls[0]}></img> : <img src="../../../public/dog.webp" alt="" />}

                  {adoption.status ? <div className={adoption.status.value == '분양중' ? styles.statusAdopting : adoption.status.value == '예약중' ? styles.statusReserving : styles.statusFinished}>{adoption.status.value}</div> : <div className={styles.status}>loading</div>}
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.user}>
                    <div className={styles.name}>{adoption.userNickname.substring(0, 15)}</div>
                    <div className={styles.date}>{adoption.createdAt.substring(0, 10)}</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  <div className={styles.tags}>
                    <Tags adoption={adoption}></Tags>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
