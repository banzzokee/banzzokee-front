import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './AdoptEdit.module.css';
import Tag from '../../Tag';
import BackHeader from '../../components/common/header/BackHeader';
import { useNavigate, useParams } from 'react-router-dom';

export default function ArticleUpdate() {
  const navigate = useNavigate();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const { id } = useParams();
  const [adoption, setAdoption] = useState({
    id: 0,
    imageUrls: [],
    title: '',
    tags: {
      breeds: '',
      size: '',
      healthChecked: '',
      gender: '',
      neutering: '',
      age: '',
      registeredAt: '',
    },
    content: '',
  });

  const { title, content, tags, imageUrls } = adoption;
  const formData = new FormData();

  const [submitImage, setSubmitImage] = useState(null);

  const onFileChange = (e) => {
    console.log('images!!');
    setSubmitImage(e.target.files[0]);
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
    } else if (name.includes('tag_')) {
      const tagButton = name.replace('tag_', '');
      setAdoption({
        ...adoption,
        tags: {
          ...tags,
          [tagButton]: value,
        },
      });
    } else if (name === 'breed') {
      setAdoption({
        ...adoption,
        tags: {
          ...tags,
          breeds: value,
        },
      });
    } else {
      setAdoption({
        ...adoption,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const getAdoption = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/adoptions/${id}`,
        };

        const response = await axios.request(config);
        setAdoption(response.data);
        console.log('adoption', adoption);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAdoption();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    formData.append('images', submitImage);
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            title: adoption.title,
            content: adoption.content,
            breed: adoption.tags.breeds,
            size: adoption.tags.size,
            neutering: adoption.tags.neutering,
            gender: adoption.tags.gender,
            age: adoption.tags.age,
            healthChecked: adoption.tags.healthChecked,
            registeredAt: adoption.tags.registeredAt,
          }),
        ],
        { type: 'application/json' }
      )
    );
    console.log('form', formData);

    const config = {
      method: 'put',
      url: `https://server.banzzokee.homes/api/adoptions/${id}`,
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
      data: formData,
    };

    try {
      console.log('data', formData);
      const response = await axios.request(config);
      alert('수정되었습니다.');
      navigate(`/ArticleList/${id}`);
      console.log(response);
    } catch (error) {
      console.error('Error posting adoption:', error);
    }
  };

  return (
    <div className={styles.CreateAdoptPage}>
      <BackHeader style={{ backgroundColor: '#FFFFFF', border: 'none' }} />
      <div className={styles.create_Page}>
        <h2 className={styles.adopt_Title}>분양 구하기 게시글</h2>

        {/* 스크롤 시작되는 부분 */}
        <form style={{ overflowY: 'scroll', maxHeight: '800px' }} className={styles.container}>
          <div className={styles.inputGroup}>
            <label>
              <p>사진</p>
              <p>(최대 8장)</p>
            </label>
            <input type="file" multiple accept="image/*" name="image" className={styles.img_upload} onChange={onFileChange}></input>
          </div>
          <div className={styles.inputGroup}>
            <label>제목</label>
            <input type="text" name="title" value={adoption.title} onChange={onChange} className={styles.input} placeholder="50자 이내로 작성해주세요." maxLength="50"></input>
          </div>
          <div className={styles.inputGroup}>
            <Tag onChange={onChange} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.textTitle}>본문</label>
            <textarea name="content" value={adoption.content} onChange={onChange} className={styles.input} placeholder="500자 이내로 작성해주세요." maxLength="500"></textarea>
          </div>
          <button onClick={handleEdit} className={styles.button}>
            게시글 수정
          </button>
        </form>
      </div>
    </div>
  );
}

// const handleStatus = (status) => {
//   setAdoption({
//     ...adoption,
//     status,
//   });

//   setIsActive({
//     ongoing: status === '분양중',
//     booking: status === '예약중',
//     completion: status === '분양완료',
//   });
// };

//           {/* <div className={styles.inputGroup}>
//             <label>상태</label>
//             <div className={styles.stateBox}>
//               <button type='button' name='status' value='분양중' onClick={() => handleStatus('분양중')} style={isActive.ongoing ? { backgroundColor: '#FFEE55' } : {}} className={styles.ongoing}>분양중</button>
//               <button type='button' name='status' value='예약중' onClick={() => handleStatus('예약중')} style={isActive.booking ? { backgroundColor: '#FFB155' } : {}} className={styles.booking}>예약중</button>
//               <button type='button' name='status' value='분양완료' onClick={() => handleStatus('분양완료')} style={isActive.completion ? { backgroundColor: '#79C7DF' } : {}} className={styles.completion}>분양완료</button>
//             </div>
//           </div> */}
