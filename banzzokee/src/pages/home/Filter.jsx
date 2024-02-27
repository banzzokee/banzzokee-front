import React, { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.css';

export default function Filter({ onApplyFilter, onResetFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    // status: '',
    size: '',
    healthChecked: false,
    gender: '',
    neutering: false,
    minAge: '',
    maxAge: '',
    breed: [],
  });

  const [isActive, setIsActive] = useState({
    dogSize: '',
    breed: '',
    // status: '',
    healthCheck: '',
    gender: '',
    neutering: '',
  });

  const selectStyle = {
    backgroundColor: '#9aaee057',
  };

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

  const handleFilter = (filterName, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
  
      if (Array.isArray(prev[filterName])) {
        if (!prev[filterName].includes(value)) {
          updatedFilters[filterName] = [value];
        } else {
          updatedFilters[filterName] = null;
        }
      } else {
        updatedFilters[filterName] = prev[filterName] === value ? null : value;
      }
  
      setIsActive((prev) => ({ ...prev, [filterName]: value }));
  
      return updatedFilters;
    });
  };

  const handleAgeRange = (e, type) => {
    const value = e.target.value;
    setSelectedFilters(prev => ({
      ...prev,
      ageRange: {
        ...prev.ageRange,
        [type]: value,
      },
    }));
  };
  
  

  const applyFilters = (e) => {
    e.preventDefault();
    onApplyFilter(selectedFilters);
  };


  const resetFilters = (e) => {
    e.preventDefault();
    setSelectedFilters({
      status: '',
      size: '',
      healthChecked: false,
      gender: '',
      neutering: false,
      minAge: '',
      maxAge: '',
      breed: [],
    });
    setIsActive({
      status: '',
      size: '',
      healthChecked: '',
      gender: '',
      neutering: '',
      breed: '',
    });
    onResetFilters();
  };

  // const fixedMinPrice = 1000;
  // const fixedMaxPrice = 100000;
  // const priceGap = 10000;

  // const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  // const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  // const [rangeMinPercent, setRangeMinPercent] = useState(0);
  // const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  // const prcieRangeMinValueHandler = e => {
  //   setRangeMinValue(parseInt(e.target.value));
  // };

  // const prcieRangeMaxValueHandler = e => {
  //   setRangeMaxValue(parseInt(e.target.value));
  // };

  // const twoRangeHandler = () => {
  //   if (rangeMaxValue - rangeMinValue < priceGap) {
  //     setRangeMaxValue(rangeMinValue + priceGap);
  //     setRangeMinValue(rangeMaxValue - priceGap);
  //   } else {
  //     setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
  //     setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
  //   }
  // };

  


  return (
    <div className={styles.filterPage}>
      <div className={styles.filterHeader}>
        필터
        {/* <button onClick={toggleMenu}>
          <img src='../../../public/X.svg' alt="Close" />
        </button> */}
      </div>
      <form style={{ overflowY: 'scroll', maxHeight: '520px' }} className={styles.container}>
        {/* <div className={styles.tag_item}>
          <label>상태</label>
          <button type="button" name="status" onClick={() => handleFilter('status', 'ADOPTING')} style={isActive.status === 'ADOPTING' ? { backgroundColor: '#FFEE55' } : {}}>
            분양중
          </button>
          <button type="button" name="status" onClick={() => handleFilter('status', 'RESERVING')} style={isActive.status === 'RESERVING' ? { backgroundColor: '#FFB155' } : {}}>
            예약중
          </button>
          <button type="button" name="status" onClick={() => handleFilter('status', 'FINISHED')} style={isActive.status === 'FINISHED' ? { backgroundColor: '#79C7DF' } : {}}>
            분양완료
          </button>
        </div> */}
        <div className={styles.tag_item}>
          <label>사이즈</label>
          <button type="button" name="size" onClick={() => handleFilter('size', 'ULTRA_SMALL')} style={isActive.size === 'ULTRA_SMALL' ? { ...selectStyle } : {}}>
            초소형
          </button>
          <button type="button" name="size" onClick={() => handleFilter('size', 'SMALL')} style={isActive.size === 'SMALL' ? { ...selectStyle } : {}}>
            소형
          </button>
          <button type="button" name="size" onClick={() => handleFilter('size', 'MEDIUM')} style={isActive.size === 'MEDIUM' ? { ...selectStyle } : {}}>
            중형
          </button>
          <button type="button" name="size" onClick={() => handleFilter('size', 'LARGE')} style={isActive.size === 'LARGE' ? { ...selectStyle } : {}}>
            대형
          </button>
        </div>
        <div className={styles.tag_item}>
          <label>건강검진</label>
          <button type="button" name="healthChecked" onClick={() => handleFilter('healthChecked', true)} style={isActive.healthChecked === true ? { ...selectStyle } : {}}>
            검진 완료
          </button>
          <button type="button" name="healthChecked" onClick={() => handleFilter('healthChecked', false)} style={isActive.healthChecked === false ? { ...selectStyle } : {}}>
            검진 미완료
          </button>
        </div>
        <div className={styles.tag_item}>
          <label>성별</label>
          <button type="button" name="gender" onClick={() => handleFilter('gender', 'MALE')} style={isActive.gender === 'MALE' ? { ...selectStyle } : {}}>
            <img src="../../../public/Male.svg" alt="Male" />
          </button>
          <button type="button" name="gender" onClick={() => handleFilter('gender', 'FEMALE')} style={isActive.gender === 'FEMALE' ? { ...selectStyle } : {}}>
            <img src="../../../public/Female.svg" alt="Female" />
          </button>
        </div>
        <div className={styles.tag_item}>
          <label>중성화</label>
          <button type="button" name="neutering" onClick={() => handleFilter('neutering', true)} style={isActive.neutering === true ? { ...selectStyle } : {}}>
            중성화
          </button>
        </div>
        <div className={styles.tag_item}>
        <label>나이</label>
        <div className={styles.age}>
          <input
            type="text"
            placeholder="최소 나이"
            value={selectedFilters.minAge}
            onChange={(e) => handleAgeRange(e, 'minAge')}
          />
          <span>~</span>
          <input
            type="text"
            placeholder="최대 나이"
            value={selectedFilters. maxAge}
            onChange={(e) => handleAgeRange(e, 'maxAge')}
          />
        </div>
      </div>

        {/* <div className={styles.tag_item}>
          <input className={`${styles.filterPriceRangeMin} ${styles.filterPriceRange}`} type="range" min={fixedMinPrice} max={fixedMaxPrice - priceGap} step="1000" value={rangeMinValue} onChange={e => {prcieRangeMinValueHandler(e);twoRangeHandler();}}/>
          <input className={`${styles.filterPriceRangeMax} ${styles.filterPriceRange}`} type="range" min={fixedMinPrice + priceGap} max={fixedMaxPrice} step="1000" value={rangeMaxValue} onChange={e => {prcieRangeMaxValueHandler(e);twoRangeHandler();}}/>
          <div className={styles.filterPriceSlide}>
            <div className={styles.filterPriceSlideInner} style={{ left: `${rangeMinPercent}%`, right: `${rangeMaxPercent}%` }} />
          </div>
        </div> */}

        <div className={styles.tag_item}>
          <label>견종</label>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'GREYHOUND')} style={isActive.breed === 'GREYHOUND' ? { ...selectStyle } : {}}>
          그레이하운드
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'DACHSHUND')} style={isActive.breed === 'DACHSHUND' ? { ...selectStyle } : {}}>
          닥스훈트
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'DOBERMAN')} style={isActive.breed === 'DOBERMAN' ? { ...selectStyle } : {}}>
          도베르만
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'RETRIEVER')} style={isActive.breed === 'RETRIEVER' ? { ...selectStyle } : {}}>
          리트리버
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'MALTESE')} style={isActive.breed === 'MALTESE' ? { ...selectStyle } : {}}>
          말티즈
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'MIX')} style={isActive.breed === 'MIX' ? { ...selectStyle } : {}}>
          믹스
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'BEDLINGTON_TERRIER')} style={isActive.breed === 'BEDLINGTON_TERRIER' ? { ...selectStyle } : {}}>
          베들링턴 테리어
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'BULLDOG')} style={isActive.breed === 'BULLDOG' ? { ...selectStyle } : {}}>
          불독
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'BICHON')} style={isActive.breed === 'BICHON' ? { ...selectStyle } : {}}>
          비숑
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SAMOYED')} style={isActive.breed === 'SAMOYED' ? { ...selectStyle } : {}}>
          사모예드
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SHEPHERD')} style={isActive.breed === 'SHEPHERD' ? { ...selectStyle } : {}}>
          셰퍼드
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SCHNAUZER')} style={isActive.breed === 'SCHNAUZER' ? { ...selectStyle } : {}}>
          슈나우저
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SPITZ')} style={isActive.breed === 'SPITZ' ? { ...selectStyle } : {}}>
          스피츠
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SHIBA_INU')} style={isActive.breed === 'SHIBA_INU' ? { ...selectStyle } : {}}>
          시바
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SIBERIAN_HUSKY')} style={isActive.breed === 'SIBERIAN_HUSKY' ? { ...selectStyle } : {}}>
          시베리안 허스키
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'SHIHTZU')} style={isActive.breed === 'SHIHTZU' ? { ...selectStyle } : {}}>
          시츄
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'ALASKAN_MALAMUTE')} style={isActive.breed === 'ALASKAN_MALAMUTE' ? { ...selectStyle } : {}}>
          알래스카 맬러뮤트
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'YORKSHIRE_TERRIER')} style={isActive.breed === 'YORKSHIRE_TERRIER' ? { ...selectStyle } : {}}>
          요크셔 테리어
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'WELSH_CORGI')} style={isActive.breed === 'WELSH_CORGI' ? { ...selectStyle } : {}}>
          웰시코기
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'JACK_RUSSELL_TERRIOR')} style={isActive.breed === 'JACK_RUSSELL_TERRIOR' ? { ...selectStyle } : {}}>
          잭 러셀 테리어
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'CHIHUAHUA')} style={isActive.breed === 'CHIHUAHUA' ? { ...selectStyle } : {}}>
          치와와
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'PAPILON')} style={isActive.breed === 'PAPILON' ? { ...selectStyle } : {}}>
          파피용
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'PUG')} style={isActive.breed === 'PUG' ? { ...selectStyle } : {}}>
          퍼그
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'POMERANIAN')} style={isActive.breed === 'POMERANIAN' ? { ...selectStyle } : {}}>
          포메라니안
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'POODLE')} style={isActive.breed === 'POODLE' ? { ...selectStyle } : {}}>
          푸들
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'LPINSCHER')} style={isActive.breed === 'LPINSCHER' ? { ...selectStyle } : {}}>
          핀셔
          </button>
          <button type="button" name="breed" onClick={() => handleFilter('breed', 'ETC')} style={isActive.breed === 'ETC' ? { ...selectStyle } : {}}>
          기타
          </button>
        </div>
      <div className={styles.filterButton}>
        <button onClick={resetFilters} className={styles.reset}>
          초기화
        </button>
        <button onClick={applyFilters}  className={styles.apply}>
          적용하기
        </button>
      </div>
      </form>
    </div>
  );
}
