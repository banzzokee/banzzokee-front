import React, { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.css';

const filterOptions = {
  상태: ['분양중', '예약중', '분양완료'],
  사이즈: ['초소형', '소형', '중형', '대형'],
  건강검진: ['검진 완료', '검진 미완료'],
 
};

export default function Filter({ onApplyFilter, onResetFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    size: [],
    healthChecked: [],
    gender: [],
    neutering: [],
    age: [],
    breed: [],
  });

  const [isOpen, setOpen] = useState(false);
  const side = useRef();

  const toggleMenu = () => {
    setOpen(isOpen => !isOpen);
  };

  const handleClose = (e) => {
    if (isOpen && side.current && !side.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [isOpen]);

  const handleFilter = (filterType, filterValue) => {
    const currentSelectedFilters = selectedFilters[filterType];
    const updatedSelectedFilters = currentSelectedFilters.includes(filterValue)
      ? currentSelectedFilters.filter(value => value !== filterValue)
      : [...currentSelectedFilters, filterValue];

    setSelectedFilters(prevState => ({
      ...prevState,
      [filterType]: updatedSelectedFilters,
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      status: [],
      size: [],
      healthChecked: [],
      gender: [],
      neutering: [],
      age: [],
      breed: [],
    });
    onResetFilters();
  };

  const applyFilters = () => {
    onApplyFilter(selectedFilters);
  };

  return (
    <div className={styles.filterPage}>
      <div className={styles.filterHeader}>
        필터
        <button onClick={toggleMenu}>
          <img src='../../../public/X.svg' alt="Close" />
        </button>
      </div>
      <form style={{ overflowY: 'scroll', maxHeight: '570px' }} className={styles.container}>
        {Object.entries(filterOptions).map(([filterType, options]) => (
          <div key={filterType} className={styles.inputGroup}>
            <label>{filterType}</label>
            <div className={styles[`${filterType}Box`]}>
            {options.map(option => (
              <button
                key={option}
                type="button"
                name={filterType}
                onClick={() => handleFilter(filterType, option)}
                style={(selectedFilters[filterType] || []).includes(option) ? { backgroundColor: '#B7E017' } : {}}
              >
                {option}
              </button>
            ))}
            </div>
          </div>
        ))}
      </form>
      <div className={styles.filterButton}>
        <button onClick={resetFilters} className={styles.reset}>
          초기화
        </button>
        <button onClick={applyFilters} className={styles.apply}>
          적용하기
        </button>
      </div>
    </div>
  );
}
