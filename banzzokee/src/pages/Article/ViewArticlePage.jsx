import styles from './ViewArticlePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function ViewArticlePage() {
  // const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  // setCookie('accessToken', data['accessToken'], { path: '/' });
  const [adoption, setAdoption] = useState({});
<<<<<<< HEAD
  const navigate = useNavigate();

  const openEdit = () => {
    const editBox = document.getElementById('edit');
    editBox.style.display = editBox.style.display === 'none' ? 'block' : 'none';
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  }

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`http://localhost:3001/adoption/${id}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/');
      })
    }
  }
  
  const getAdoption = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/adoption/${id}`);
      setAdoption(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

=======
  // sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
  const { adoptionId } = useParams();
>>>>>>> 6865fdbb65154337fd8a982f3c81465145d1fe0e
  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/adoption/1`);
        setAdoption(response.data);
        console.log(adoption);
      } catch (error) {
        console.error(error);
      }
    };
    getArticle();
  }, [adoptionId]);
  // const adoption = JSON.parse(sessionStorage.getItem('articleInfo'));
  const tags = [adoption.breed, adoption.size, adoption.neutering ? '중성화' : '중성화안됨', adoption.gender, `${adoption.age}살`, adoption.healthChecked ? '건강검진' : '검진x', `보호소 등록: ${adoption.registeredAt}`];

  return (
    <>
      <div>
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
                    <div className={styles.name}>{adoption.nickname}</div>
                    <div className={styles.date}>{adoption.createdAt}</div>
                  </div>
                </div>
              </Link>
              <Link className="chat" to="/Message">
                <div className={styles.messageButton}>
                  메세지
                  <img className={styles.messageIcon} src="../../../public/Message.png" />
                </div>
              </Link>
            </div>

            <div className={styles.articlePhotos}>
              <div className={styles.imgContainer}>
                <img src={adoption.imageUrls} alt="" />
              </div>

              <div className={styles.status}>분양중</div>
            </div>
            <div className={styles.articleTexts}>
              <div className={styles.titleAndSave}>
                <div className={styles.title}>{adoption.title}</div>
                <img src="../../../public/save.svg" alt="저장하기" style={{ width: '45px', height: '30px' }} />
              </div>
<<<<<<< HEAD
            </Link>
            <button style={{padding:0}} onClick={openEdit}>
              <img src='../../../public/edit.svg' style={{ transform: 'rotate(90deg)' }} />
            </button >
            <div id='edit' className={styles.edit}>
              <button onClick={handleEdit}>
                <img src='../../../public/Pencil.svg' />
                수정
              </button>
              <button onClick={handleDelete}>
                <img src='../../../public/Delete.svg'/>
                삭제
              </button>
            </div>
          </div>
=======
>>>>>>> 6865fdbb65154337fd8a982f3c81465145d1fe0e

              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.body}>{adoption.content}</div>
            </div>
<<<<<<< HEAD

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
                  <div className={styles.tag}>
                    유기견등록일{adoption.tags.registeredAt}
                    </div>
                </>
              )}
            </div>
            <div className={styles.body}>{adoption.content}</div>
=======
>>>>>>> 6865fdbb65154337fd8a982f3c81465145d1fe0e
          </div>
        </div>
        <Nav></Nav>
      </div>
    </>
  );
}
