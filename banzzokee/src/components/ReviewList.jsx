import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';

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
    const filtered = list.filter((obj) => obj.status === '분양완료');
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
              <Link to={`/ReviewList/${adoption.id}`} key={adoption.id}>
                {adoption.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
