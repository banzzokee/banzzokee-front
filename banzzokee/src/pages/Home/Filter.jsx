import React, { useEffect, useRef, useState } from 'react'
import styles from './Filter.module.css'

export default function Filter() {
  // const [isFilterVisible, setFilterVisible] = useState(false);

  // useEffect(() => {
  //   setFilterVisible(isOpen);
  // }, [isOpen]);
  
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-300);
  const side = useRef();
  
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-300);
      setOpen(false);
    }
  };

  const handleCloseButtonClick = () => {
    setX(-300);
    setOpen(false);
  };
  
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = (e) => {
    // side가 null이 아니고 side 안쪽에서 클릭된 경우에만 닫히도록 수정
    if (isOpen && side.current && !side.current.contains(e.target)) {
      setX(-300);
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [isOpen]);

  return(
    <div className={styles.filterPage}>
      <div className={styles.filterHeader}>
        필터
        <button onClick={toggleMenu}>
          <img src='../../../public/X.svg' alt="Close" />
        </button>
      </div>
      <form style={{ overflowY: 'scroll', maxHeight: '570px' }} className={styles.container}>
        <div className={styles.inputGroup}>
          <label>상태</label>
          <div className={styles.stateBox}>
            <button type='button' name='status' value='분양중' >분양중</button>
            <button type='button' name='status' value='예약중' className={styles.booking}>예약중</button>
            <button type='button' name='status' value='분양완료' className={styles.completion}>분양완료</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>사이즈</label>
          <div className={styles.sizeBox}>
            <button type="button" name='size' >초소형</button>
            <button type="button" name='size' >소형</button>
            <button type="button" name='size' >중형</button>
            <button type="button" name='size' >대형</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>건강검진</label>
          <div className={styles.healthcheckBox}>
            <button type="button" name='healthChecked' >검진 완료</button>
            <button type="button" name='healthChecked' >검진 미완료</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>성별</label>
          <div className={styles.genderBox}>
            <button type="button" name='gender'><img src='../../../public/Male.svg' alt="Male" /></button>
            <button type="button" name='gender'><img src='../../../public/Female.svg' alt="Female" /></button>
          </div>
        </div>
        <div className={styles.inputGroup}> 
          <label>중성화</label>
          <div className={styles.neuteringBox}>
            <button type="button" name='neutering'>중성화</button>
          </div>
        </div>
        <div className={styles.inputGroup}>나이</div>
        <div className={styles.inputGroup}>
          <label>견종</label>
          <div className={styles.breedBox}>
            <button type="button" name='breed'>그레이하운드</button>
            <button type="button" name='breed'>닥스훈트</button>
            <button type="button" name='breed'>도베르만</button>
            <button type="button" name='breed'>리트리버</button>
            <button type="button" name='breed'>말티즈</button>
            <button type="button" name='breed'>믹스</button>
            <button type="button" name='breed'>베들링턴 테리어</button>
            <button type="button" name='breed'>불독</button>
            <button type="button" name='breed'>비숑</button>
            <button type="button" name='breed'>사모예드</button>
            <button type="button" name='breed'>셰퍼드</button>
            <button type="button" name='breed'>슈나우저</button>
            <button type="button" name='breed'>스피츠</button>
            <button type="button" name='breed'>시바</button>
            <button type="button" name='breed'>시베리안 허스키</button>
            <button type="button" name='breed'>시츄</button>
            <button type="button" name='breed'>알래스카 맬러뮤트</button>
            <button type="button" name='breed'>요크셔 테리어</button>
            <button type="button" name='breed'>웰시코기</button>
            <button type="button" name='breed'>잭 러셀 테리어</button>
            <button type="button" name='breed'>치와와</button>
            <button type="button" name='breed'>파피용</button>
            <button type="button" name='breed'>퍼그</button>
            <button type="button" name='breed'>포메라니안</button>
            <button type="button" name='breed'>푸들</button>
            <button type="button" name='breed'>핀셔</button>
            <button type="button" name='breed'>기타</button>
          </div>
        </div>
      </form>
      <div className={styles.filterButton}>
        <button className={styles.reset}>초기화</button>
        <button className={styles.apply}>적용하기</button>
      </div>
    </div>
  )
}