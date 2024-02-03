import { useState } from 'react'
import styles from './CreateAdoptPage.module.css'
import Tag from '../../Tag';
import BackHeader from '../../components/common/header/BackHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateAdoptPage() {
  const navigate = useNavigate();
  const [adoption, setAdoption] = useState({
    // image:'',
    title: '',
    content: '',
  })

  const { title, content } = adoption;

  const onChange = (e) => {
    const { name, value } = e.target;
    setAdoption({
      ...adoption,
      [name]: value,
    });
  };

  const postAdoption = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/adoption', 
    adoption).then((res) => {
      alert('등록되었습니다.');
      // navigate('/Article/:idx');
      navigate('/');
    });
  };



  return (
    <div className={styles.CreateAdoptPage}>
      <BackHeader style={{backgroundColor:"#FFFFFF", border:"none"}} />
      <div className={styles.create_Page}>
        <h2 className={styles.adopt_Title}>분양 구하기 게시글</h2>

        {/* 스크롤 시작되는 부분 */}
        <form style={{ overflowY: 'scroll', maxHeight: '800px' }} className={styles.container}>
          <div className={styles.inputGroup}>
            <label>
              <p>사진</p>
              <p>(최대 8장)</p>
            </label>
            <input type="file" multiple accept="image/*" name="image" className={styles.img_upload}></input>
          </div>
          <div className={styles.inputGroup}>
            <label>제목</label>
            <input type='text' name='title' value={adoption.title} onChange={onChange} className={styles.input} placeholder='50자 이내로 작성해주세요.' maxLength='50'></input>
          </div>
          <div className={styles.inputGroup}>
            <Tag />
          </div>
          <div className={styles.inputGroup}>
            <label>상태</label>
            <div className={styles.stateBox}>
              <button type='button' className={styles.ongoing}>분양중</button>
              <button type='button' className={styles.booking}>예약중</button>
              <button type='button' className={styles.completion}>분양완료</button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.textTitle}>본문</label>
            <textarea name='content' value={adoption.content} onChange={onChange} placeholder='500자 이내로 작성해주세요.' maxLength='500'></textarea>
          </div>
          <button onClick={postAdoption} className={styles.button}>게시글 등록</button>
        </form>
      </div>
    </div>
  )
}