import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './Tags.jsx';

import { useInView } from 'react-intersection-observer';

export default function ReviewList({ sortBy }) {
  const [articleList, setArticleList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const getArticleList = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions?page=${page}&size=10&direction=${sortBy}`,
      };

      const response = await axios.request(config);
      setPage((page) => page + 1);
      setArticleList(response.data.content);
      console.log('page:', page);
      console.log('resp.data.content', response.data.content);

      if (response.data.content.length < 10) {
        setHasMore(false);
        console.log('sethasmore: false');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  function doFilter() {
    const filtered = articleList.filter((obj) => obj?.status?.value === '분양완료');
    setReviewList([...reviewList, ...filtered]);
    console.log('reviewList', filtered);
  }

  useEffect(() => {
    console.log('firstGetArticle()');
    getArticleList();
  }, [sortBy]);
  useEffect(() => {
    if (hasMore && page !== 0) {
      getArticleList();
      console.log('inview getArticleList');
    }
  }, [inView]);
  useEffect(() => {
    console.log('dofilter');
    doFilter();
  }, [articleList]);
  return (
    <div className={styles.listBox}>
      <ul>
        {reviewList &&
          reviewList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? <img src={adoption.imageUrls[0]}></img> : <img src="../../../public/dog.webp" alt="" />}

                  {adoption.status ? <div className={adoption.status.value == '분양중' ? styles.statusAdopting : adoption.status.value == '예약중' ? styles.statusReserving : styles.statusFinished}>{adoption.status.value}</div> : <div className={styles.status}>loading</div>}
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.user}>
                    <div className={styles.name}>{adoption.userNickname?.substring(0, 15)}</div>
                    <div className={styles.date}>{adoption.createdAt?.substring(0, 10)}</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  <div className={styles.tags}>
                    <Tags adoption={adoption}></Tags>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        <div className={styles.observer} ref={ref}>
          {hasMore ? 'loading...' : 'end'}
          {inView}
        </div>
      </ul>
    </div>
  );
}
