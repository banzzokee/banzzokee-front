import styles from './ViewArticlePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from './ImageSlider';
export default function ViewReviewPage({id}) {
  // const { id } = useParams();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const navigate = useNavigate();
  // const [bookmark, setBookmark] = useState();

  const [review, setReview] = useState({});
  const getReview = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/reviews/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.request(config);
      const reviewData = response.data;
      setReview(reviewData);
      console.log('viewArticle response.data', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getReview();
    console.log('getAdoption run');
  }, [id]);


  const openEdit = () => {
    console.log('Open Edit Clicked');
    const editBox = document.getElementById('edit');
    editBox.style.display = editBox.style.display === 'none' ? 'block' : 'none';
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const config = {
          method: 'delete',
          url: `https://server.banzzokee.homes/api/reviews/${id}`,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        };

        const response = await axios.request(config);
        alert('삭제되었습니다.');
        // navigate('/');
        console.log(response);
      } catch (error) {
        console.error('Error deleting adoptionarticle:', error);
      }
    }
  };

  let reviewNickname = '';
  if (review.user && review.user.nickname) {
    reviewNickname = review.user.nickname;
  }
  const toOtherMyPage = () => {
    if (review.user && review.user.userId) {
      const dataSend = review.user;
      navigate(`/OtherMyPage/${review.user.userId}`, { state: dataSend });
    }
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <div onClick={toOtherMyPage}>
              <div className={styles.headerLeft}>
                <div className={styles.userImage}>
                  <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>{reviewNickname}</div>

                  <div className={styles.date}>{String(review.createdAt).substring(0, 10)}</div>
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button style={{ padding: 0, backgroundColor: 'white' }} onClick={openEdit}>
                <img src="../../../public/edit.svg" style={{ transform: 'rotate(90deg)' }} />
              </button>
              <div id="edit" className={styles.edit}>
                <button onClick={handleEdit}>
                  <img src="../../../public/Pencil.svg" />
                  수정
                </button>
                <button onClick={handleDelete}>
                  <img src="../../../public/Delete.svg" />
                  삭제
                </button>
              </div>
            </div>
          </div>

          <div className={styles.articlePhotos}>
            <div className={styles.imgContainer}>
              <ImageSlider images={review.images} />
            </div>
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>{review.title}</div>
            </div>
            <div className={styles.body}>{review.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
