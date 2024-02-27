import React, { useState } from 'react';
import Header from '../../components/common/header/Header';
import styles from './MainPage.module.css';
import Nav from '../../components/common/nav/Nav';
import ArticleList from '../../components/ArticleList';
import Filter from './Filter';

export default function MainPage() {
  const [sortBy, setSortBy] = useState('desc');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    // status: '',
    size: '',
    healthChecked: '',
    gender: '',
    neutering: '',
    minAge: '',
    maxAge: '',

    breed: [''],
  });
  const sortOrder = (order) => {
    setSortBy(order);
  };

  const handleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const applyFilter = (filters) => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setAppliedFilters({
      // status: [],
      size: [],
      healthChecked: [],
      gender: [],
      neutering: [],
      ageRange: {
        minAge: '',
        maxAge: '',
      },
      breed: [],
    });
  };

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.mainPage_Header}>
          <div>
            <button onClick={() => sortOrder('desc')} className={styles.sortButton}>
              최신순
            </button>
            <span>/</span>
            <button onClick={() => sortOrder('asc')} className={styles.sortButton}>
              오래된순
            </button>
          </div>
          <div>
            <button className={styles.filter} onClick={handleFilter}>
              필터
              <img src="/Filter.png" alt="필터" className={styles.filter_Img} />
            </button>
          </div>
        </div>
        {isFilterOpen && <Filter onApplyFilter={applyFilter} onResetFilters={resetFilters} />}
        <ArticleList appliedFilters={appliedFilters} sortBy={sortBy} />
      </div>
      <Nav />
    </>
  );
}
