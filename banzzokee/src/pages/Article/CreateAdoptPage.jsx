import { useState } from 'react'
import Back from '../../Back';
import styles from './CreateAdoptPage.module.css'
import Tag from '../../Tag';

export default function CreateAdoptPage() {
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  return (
    <div className={styles.create_Page}>
      <Back />
      <h2 className={styles.adopt_Title}>분양 구하기 게시글</h2>
      {/* 스크롤 시작되는 부분 */}
      <form style={{ overflowY: 'scroll', maxHeight: '800px' }} className={styles.container}>
        <div className={styles.inputGroup}>
          <label>
            <p>사진</p>
            <p>(최대 8장)</p>
          </label>
          <input type='file' className={styles.img_upload}></input>
        </div>
        <div className={styles.inputGroup}>
          <label>제목</label>
          <input type='text' id='title' className={styles.input} placeholder='50자 이내로 작성해주세요.' value={subject}></input>
        </div>
        <div className={styles.inputGroup}>
          <Tag />
        </div>
        <div className={styles.inputGroup}>
          <label>상태</label>
          <div className={styles.state_box}>
            <button className={styles.ongoing}>분양중</button>
            <button className={styles.booking}>예약중</button>
            <button className={styles.completion}>분양완료</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>본문</label>
          <textarea id='content' placeholder='500자 이내로 작성해주세요.'></textarea>
        </div>
        <button className={styles.button}>게시글 등록</button>
      </form>
    </div>
  )
}