import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';

export default function ArticleList() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    try {
      // const resp = await axios.get('http://localhost:3001/adoption');

      // setArticleList(resp.data);
      // console.log(resp.data);
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions?page=0&size=10&direction=desc`,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      };
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

  return (
    <div className={styles.listBox}>
      <ul>
        {articleList &&
          articleList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.id} className={styles.link}>
                <div className={styles.imageContainer}>
                  <img src="../../../public/dog.webp" alt="" />
                  <div className={styles.status}>{adoption.status}</div>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.user}>
                    {/* <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} /> */}
                    {/* 여기에는 게시글 작성자 프로필까지 들어가면 너무 정보가 많을것 같아 빼는게 좋을것 같아요!*/}
                    <div className={styles.name}>{adoption.userNickname}</div>
                    <div className={styles.date}>2023-01-03</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  {/* <div className={styles.tags}>
                    <div className={styles.tag}>{adoption.tags.breeds}</div>
                    <div className={styles.tag}>{adoption.tags.size}</div>
                    <div className={styles.tag}>{adoption.tags.healthChecked}</div>
                    <div className={styles.tag}>{adoption.tags.gender}</div>
                  </div> */}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}  