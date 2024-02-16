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
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/adoptions',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer {${accessToken}}` },
      };
      await axios.request(config).then((response) => {
        console.log(response);
      });
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
              <Link to={`/ArticleList/${adoption.id}`} key={adoption.id} className={styles.link}>
                <div className={styles.image}>
                  <img src="../../../public/dog.webp" alt="" />
                  <div className={styles.status}>{adoption.status}</div>
                </div>
                <div>
                  <div className={styles.user}>
                    <div className={styles.userInfo}>
                      <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                      <div className={styles.name}>user_123</div>
                    </div>
                    <div className={styles.date}>2023-01-03</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  <div className={styles.tags}>
                    <div className={styles.tag}>{adoption.tags.breeds}</div>
                    <div className={styles.tag}>{adoption.tags.size}</div>
                    <div className={styles.tag}>{adoption.tags.healthChecked}</div>
                    <div className={styles.tag}>{adoption.tags.gender}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
