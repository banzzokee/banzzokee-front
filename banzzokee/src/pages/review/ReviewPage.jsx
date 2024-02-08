import React from 'react';
import Header from '../../components/common/header/Header';
import styles from './ReviewPage.module.css';
import Nav from '../../components/common/nav/Nav';
import ArticleList from '../../components/ArticleList';

export default function ReviewPage() {
  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.mainPage_Header}>
          <div className={styles.datesort}>최신순 / 오래된순</div>
          <div>
            <button className={styles.filter}>
              필터
              <img src="/Filter.png" alt="필터" className={styles.filter_Img} />
            </button>
          </div>
        </div>
        <ArticleList />
      </div>
      <Nav />
    </>
  );
}
