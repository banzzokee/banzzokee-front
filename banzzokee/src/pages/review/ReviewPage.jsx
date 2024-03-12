import React, { useState } from 'react';
import Header from '../../components/common/header/Header';
import styles from './ReviewPage.module.css';
import Nav from '../../components/common/nav/Nav';
import ReviewList from '../../components/ReviewList';

export default function ReviewPage() {
  const [sortBy, setSortBy] = useState('desc');
  const sortOrder = (order) => {
    setSortBy(order);
  };

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.mainPage_Header}>
          <div>
            <button onClick={() => sortOrder('desc')} className={styles.sortButton} >최신순</button>
            <span>/</span>
            <button onClick={() => sortOrder('asc')} className={styles.sortButton} >오래된순</button>
          </div>
        </div>
        <ReviewList sortBy={sortBy} />
      </div>
      <Nav />
    </>
  );
}
