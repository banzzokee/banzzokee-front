import { useEffect, useState } from 'react'
import styles from './CreateReviewPage.module.css'
import BackHeader from '../../components/common/header/BackHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateReviewPage() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { adoptionId } = state;
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [review, setReview] = useState({
    // imageUrls: [],
    title: '',
    content: '',
    adoptionId: ''
  });

  useEffect(() => {
    setReview(prevReview => ({
      ...prevReview,
      adoptionId: Number(adoptionId) 
    }));
  }, [adoptionId]);

  const { title, content, imageUrls } = review;
  const formData = new FormData();
  const [submitImage, setSubmitImage] = useState(null);

  const onFileChange = (e) => {
    console.log('formData before file change:', formData);
    console.log('images!!');
    setSubmitImage(e.target.files[0]);
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }
    console.log('formData after file change:', formData);
  };
  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
    } else if (name === 'adoptionId') {
      console.warn("adoptionId는 직접 변경할 수 없습니다.");
    } else {
      setReview((prevReview) => ({
        ...prevReview,
        [name]: value,
      }));
    }
  };

  const postReview = async (e) => {
    e.preventDefault();
    console.log('submitImage:', submitImage);
    console.log('review:', review);
    formData.append('images', submitImage);
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            adoptionId: review.adoptionId,
            title: review.title,
            content: review.content,
          }),
        ],
        { type: 'application/json' }
      )
    );

    
    const config = {
      method: 'post',
      url: 'https://server.banzzokee.homes/api/reviews',
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
      data: formData,
    };
    try {
      console.log('data', formData);
      const response = await axios.request(config);
      alert('등록되었습니다');
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error('Error posting adoption:', error);
      console.log('Response data:', error.response.data); 
    }
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
            <input type="file" multiple accept="image/*" name="image" className={styles.img_upload} onChange={onFileChange}></input>
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