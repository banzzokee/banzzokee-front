import { useState } from 'react'
import styles from './CreateReviewPage.module.css'
import BackHeader from '../../components/common/header/BackHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateReviewPage() {
  const navigate = useNavigate();
  const [review, setReview] = useState({
    title: '',
    content: '',
  })

  const { title, content } = review;

  const onChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const postReview = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/review', 
    review).then((res) => {
      alert('등록되었습니다.');
      // navigate('');
    });
  };
  return (
    <div className={styles.CreateReviewPage}>
      <BackHeader style={{backgroundColor:"#FFFFFF", border:"none"}} />
      <div className={styles.create_Page}>
        <h2 className={styles.adopt_Title}>입양 후기 게시글</h2>
        <form className={styles.container}>
          <div className={styles.inputGroup}>
            <label className={styles.picLabel}>
              <span>사진</span>
              <span>(최대 8장)</span>
            </label>
            <input type='file' className={styles.img_upload}></input>
          </div>
          <div className={styles.inputGroup}>
            <label>제목</label>
            <input type='text' name='title' value={review.title} onChange={onChange} className={styles.input} placeholder='50자 이내로 작성해주세요.' maxLength='50'></input>
          </div>
          <div className={styles.inputGroup}>
            <label>본문</label>
            <textarea name='content' value={review.content} onChange={onChange} placeholder='500자 이내로 작성해주세요.' maxLength='500'></textarea>
          </div>
          <button onClick={postReview} className={styles.button}>게시글 등록</button>
        </form>
      </div>
    </div>
  )
}