import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './Tags.jsx';
export default function ReviewList() {
  const [articleList, setArticleList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const getArticleList = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions?page=0&size=10&direction=desc`,
      };
      const response = await axios.request(config);
      setArticleList(response.data.content);
      console.log(response.data.content);

      // const response = await axios.get('http://localhost:3001/adoption');
      // setArticleList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  function doFilter(list) {
    const filtered = list.filter((obj) => obj.status.value === '분양완료');
    setReviewList(filtered);
    console.log('reviewList', reviewList);
  }
  useEffect(() => {
    getArticleList();
  }, []);
  useEffect(() => {
    doFilter(articleList);
  }, [articleList]);
  return (
    <div className={styles.listBox}>
      <ul>
        {reviewList &&
          reviewList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ReviewList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? <img src={adoption.imageUrls[0]}></img> : <img src="../../../public/dog.webp" alt="" />}

                  {adoption.status ? <div className={styles.status}>{adoption.status.value}</div> : <div className={styles.status}>loading</div>}
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
