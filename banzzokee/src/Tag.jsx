import styles from './Tag.module.css'

export default function Tag() {
  return(
    <div className={styles.tag_container}>
      <label className={styles.label}>태그</label>
      <div className={styles.tag_box}>
        <div className={styles.tag_item}>
          <label>견종</label>
          <button>말티즈</button>
        </div>
        <div className={styles.tag_item}>
          <label>사이즈</label>
          <button>초소</button>
          <button>소</button>
          <button>중</button>
          <button>대</button>
        </div>
        <div className={styles.tag_item}>
          <label>건강검진</label>
          <button>검진 완료</button>
          <button>검진 미완료</button>
        </div>
        <div className={styles.tag_item}>
          <label>성별</label>
          <button>남</button>
          <button>여</button>
        </div>
        <div className={styles.tag_item}>
          <label>중성화</label>
          <button>예</button>
          <button>아니오</button>
        </div>
        <div className={styles.tag_item}>
          <label>나이</label>
        </div>
        <div className={styles.tag_item}>
          <label>유기견 등록 날짜</label>
        </div>
      </div>
    </div>
  )
}