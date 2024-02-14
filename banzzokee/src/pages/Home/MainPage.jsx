import React, { useState } from 'react';
import Header from '../../components/common/header/Header';
import styles from './MainPage.module.css';
import Nav from '../../components/common/nav/Nav';
import ArticleList from '../../components/ArticleList';
import Filter from './Filter';

export default function MainPage() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.mainPage_Header}>
          <div className={styles.datesort}>최신순 / 오래된순</div>
          <div>
            <button className={styles.filter} onClick={handleFilter}>
              필터  
              <img src='/Filter.png' alt='필터' className={styles.filter_Img} />
            </button>
          </div>
        </div>
        <ArticleList/>
      {isFilterOpen&& <Filter />}
      </div>
      <Nav />
    </>
  );
}


