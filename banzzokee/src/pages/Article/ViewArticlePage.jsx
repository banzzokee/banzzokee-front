import styles from './ViewArticlePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from './imageSlider';

export default function ViewArticlePage() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const { id } = useParams();
  const navigate = useNavigate();

  const openEdit = () => {
    const editBox = document.getElementById('edit');
    editBox.style.display = editBox.style.display === 'none' ? 'block' : 'none';
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`http://localhost:3001/adoption/${id}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/');
      });
    }
  };

  const [adoption, setAdoption] = useState({});
  const getAdoption = async () => {
    try {
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions/${id}`,
      };
      // const config = {
      //   method: 'get',
      //   url: `http://localhost:3001/adoption/vIztRk24`,
      // };
      const response = await axios.request(config);
      console.log('ViewArticlePage response', response);
      setAdoption(response.data);
      console.log('adoption', adoption);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAdoption();
  }, []);

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <Link to={`/OtherMyPage/${adoption.id}`}>
              <div className={styles.headerLeft}>
                <div className={styles.userImage}>
                  <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>{/* {adoption.user.nickname} */}</div>

                  <div className={styles.date}>{adoption.createdAt}</div>
                </div>
              </div>
            </Link>
            <div className={styles.headerRight}>
              <Link className="chat" to="/Message">
                <div className={styles.messageButton}>
                  메세지
                  <img className={styles.messageIcon} src="../../../public/Message.png" />
                </div>
              </Link>
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
              {/* <img src={adoption.imageUrls[1]} alt="" /> */}
              <ImageSlider images={adoption.imageUrls} />
            </div>

            <div className={styles.status}>{/* {adoption.status} */}</div>
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>{/* {adoption.title} */}</div>
              <img src="../../../public/save.svg" alt="저장하기" style={{ width: '45px', height: '30px' }} />
            </div>

            <div className={styles.tags}>
              {/* 나중에 리스트로 받아서 map 으로 뿌려준다 */}
              {adoption && adoption.tags && (
                <>
                  <div className={styles.tag}>{adoption.tags.breeds}</div>
                  <div className={styles.tag}>{adoption.tags.size}</div>
                  <div className={styles.tag}>{adoption.tags.healthChecked}</div>
                  <div className={styles.tag}>{adoption.tags.gender}</div>
                  <div className={styles.tag}>{adoption.tags.neutering}</div>
                  <div className={styles.tag}>{adoption.tags.age}</div>
                  <div className={styles.tag}>유기견등록일{adoption.tags.registeredAt}</div>
                </>
              )}
            </div>
            <div className={styles.body}>{/* {adoption.content} */}</div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
