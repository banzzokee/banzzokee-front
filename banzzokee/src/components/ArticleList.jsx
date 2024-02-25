import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './Tags';

import { useInView } from 'react-intersection-observer';

export default function ArticleList({ sortBy, appliedFilters }) {
  const [articleList, setArticleList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  console.log('setPage 0');
  const [page, setPage] = useState(0);
  console.log('page:', page);
  const { ref, inView } = useInView();
  // appliedFilters를 사용하여 데이터를 필터링하는 함수
  const applyFilters = (data, filters) => {
    // 여기에 필터링 로직을 추가
    // filters에 따라 데이터를 필터링하고 결과를 반환
    return data.filter((item) => {
      // 예시: size 필터링
      if (filters.size.length > 0 && !filters.size.includes(item.size)) {
        return false;
      }

      // 다른 필터에 대한 로직 추가

      return true;
    });
  };

  const getArticleList = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions?page=${page}&size=5&direction=${sortBy}`,
      };
      const response = await axios.request(config);

      setPage((page) => page + 1);

      // 데이터 받아온 후 appliedFilters를 사용하여 필터링
      const filteredList = applyFilters(response.data.content, appliedFilters);

      if (filteredList.length == 0) {
        setHasMore(false);
      }

      setArticleList([...articleList, ...filteredList]);
      // setArticleList([...articleList, ...response.data.content]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log('sortby, filter applied:::::::::::::');
    getArticleList();
    setPage(0);
    setArticleList([]);
  }, [sortBy, appliedFilters]);
  useEffect(() => {
    console.log('inview', inView);
    if (inView) {
      console.log('inview 무한스크롤 진행', inView);
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
        <div className={styles.observer} ref={ref}>
          {hasMore ? 'loading' : 'end'}
        </div>
      </ul>
    </div>
  );
}
