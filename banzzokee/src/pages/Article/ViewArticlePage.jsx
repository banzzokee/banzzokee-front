import styles from './ViewArticlePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from './imageSlider';
import TagsAll from '../../components/TagsAll';
export default function ViewArticlePage() {
  const { id } = useParams();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(false);

  const addBookmark = async () => {
    if (!bookmark) {
      try {
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/${id}/follow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/${id}/follow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const openEdit = () => {
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
        url: `https://server.banzzokee.homes/api/adoptions/${id}`,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      };
  
      

        const response = await axios.request(config);
        alert('삭제되었습니다.');
        navigate('/');
        console.log(response);
      } catch (error) {
        console.error('Error deleting adoptionarticle:', error);
      }

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
      // console.log('ViewArticlePage response', response);
      setAdoption(response.data);
      console.log('response.data', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAdoption();
  }, []);
  let adoptionNickname = '';
  if (adoption.user && adoption.user.nickname) {
    adoptionNickname = adoption.user.nickname;
  }
  const toOtherMyPage = () => {
    if (adoption.user && adoption.user.userId) {
      const dataSend = adoption.user;
      navigate(`/OtherMyPage/${adoption.user.userId}`, { state: dataSend });
    }
  };
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <div onClick={toOtherMyPage}>
              <div className={styles.headerLeft}>
                <div className={styles.userImage}>
                  <img src="../../../public/User.png" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>{adoptionNickname}</div>

                  <div className={styles.date}>{adoption.createdAt}</div>
                </div>
              </div>
            </div>
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

            {adoption.status ? <div className={styles.status}>{adoption.status.value}</div> : <div className={styles.status}>loading</div>}
          </div>
          <div className={styles.articleTexts}>
            <div className={styles.titleAndSave}>
              <div className={styles.title}>{adoption.title}</div>
              <img src="../../../public/save.svg" alt="저장하기" style={{ width: '45px', height: '30px' }} />
            </div>

            <div className={styles.tags}>
              {/* 나중에 리스트로 받아서 map 으로 뿌려준다 */}
              {adoption && (
                <>
                  <TagsAll adoption={adoption}></TagsAll>
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
