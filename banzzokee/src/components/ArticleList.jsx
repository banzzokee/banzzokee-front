import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './Tags';

import { useInView } from 'react-intersection-observer';

export default function ArticleList({ sortBy, appliedFilters }) {
  const [articleList, setArticleList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  console.log('page:', page);
  const { ref, inView } = useInView();

  const getArticleList = async () => {
    try {
      if (hasMore) {
        console.log('Getarticle::: page:', page);
        const config = {
          method: 'get',
          // url: `https://server.banzzokee.homes/api/adoptions?page=${page}&size=7&direction=${sortBy}`,
          url: `https://server.banzzokee.homes/api/adoptions`,
          params: {
            breed: appliedFilters.breed.join(','), 
            dogSize: appliedFilters.size, 
            neutering: appliedFilters.neutering,
            healthChecked: appliedFilters.healthChecked,
            gender: appliedFilters.gender,
            minAge: appliedFilters.minAge,
            maxAge: appliedFilters.maxAge,
            direction: `${sortBy}`,
            page: page,
            size: 7,
            
          },
        };
        // console.log('url:', config.url);
        console.log('params:', config.params);
        const response = await axios.request(config);
        console.log('page', page);
        console.log('resp.data.content', response.data.content);
        const filteredList = (response.data.content);
        setArticleList([...articleList, ...filteredList]);
        if (response.data.content.length < 7) {
          setHasMore(false);
          console.log('hasmore:', hasMore);
        }
      }
      if (hasMore) {
        setPage((page) => page + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log('sortby, filter applied:::::::::::::');
    getArticleList();
    setPage(0);
  }, [sortBy, appliedFilters]);

  useEffect(() => {
    if (inView && page !== 0) {
      getArticleList();
    }
  }, [inView]);
  return (
    <div className={styles.listBox}>
      <ul>
        {articleList &&
          articleList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? <img src={adoption.imageUrls[0]} alt={adoption.title} /> : <img src="../../../public/dog.webp" alt="" />}
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
        <div className={styles.observer} ref={ref}>
          {hasMore ? 'loading...' : 'end'}
        </div>
      </ul>
    </div>
  );
}

