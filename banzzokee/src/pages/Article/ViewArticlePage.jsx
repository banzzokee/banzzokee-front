import styles from './ViewArticlePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewArticlePage() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const { id } = useParams();
  const [adoption, setAdoption] = useState({});
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

  const getAdoption = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://server.banzzokee.homes/api/adoptions/`,
        headers: { 'Content-Type': `application/json`, Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log(response);
      setAdoption(response.data);

      // const resp = await axios.get(`http://localhost:3001/adoptions/${id}`);
      // setAdoption(resp.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAdoption();
  }, [id]);

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <Link to="/OtherMyPage">
              <div className={styles.headerLeft}>
                <div className={styles.userImage}>
                  <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>user_123</div>
                  <div className={styles.date}>2023-01-03</div>
                </div>
              </div>
            </Link>
            <Link className="chat" to="/Message">
              <div className={styles.messageButton}>
                메세지
                <img className={styles.messageIcon} src="../../../public/Message.png" />
              </div>
            </Link>
            <button style={{ padding: 0 }} onClick={openEdit}>
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

          <div className={styles.articlePhotos}>
            <div className={styles.imgContainer}>
              <img src="../../../public/dog.webp" alt="" />
            </div>

            <div className={styles.status}>{adoption.status}</div>
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>{adoption.title}</div>
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
            <div className={styles.body}>{adoption.content}</div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
