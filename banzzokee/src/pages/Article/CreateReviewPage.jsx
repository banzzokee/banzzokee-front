import { useState } from 'react'
import Back from '../../components/common/back/Back';
import styles from './CreateReviewPage.module.css'

export default function CreateReviewPage() {
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  return (
    <div className={styles.create_Page}>
      <Back />
      <h2 className={styles.adopt_Title}>입양 후기 게시글</h2>
      <form className={styles.container}>
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
          <label>본문</label>
          <textarea id='content' placeholder='500자 이내로 작성해주세요.'></textarea>
        </div>
        <button className={styles.button}>게시글 등록</button>
      </form>
    </div>
  )
}