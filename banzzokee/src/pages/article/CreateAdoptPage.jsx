import { useState } from 'react';
import styles from './CreateAdoptPage.module.css';
import Tag from '../../Tag';
import BackHeader from '../../components/common/header/BackHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateAdoptPage() {
  const navigate = useNavigate();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [adoption, setAdoption] = useState({
    imageUrls: [],
    title: '',
    tags: {
      breeds: '',
      size: '',
      healthChecked: '',
      gender: '',
      neutering: '',
      age: '',
      registeredAt: '1111-11-11',
    },
    content: '',
  });

  const { title, content, tags, imageUrls } = adoption;
  const formData = new FormData();
  const [profileImage, setProfileImage] = useState();
  const [submitImage, setSubmitImage] = useState(null);
  const onFileChange = (e) => {
    console.log('images!!');
    setSubmitImage(e.target.files[0]);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
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

  const postAdoption = async (e) => {
    e.preventDefault();
    console.log('adoption', adoption);
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
            age: 3,
            healthChecked: true,
            registeredAt: adoption.tags.registeredAt,
          }),
        ],
        { type: 'application/json' }
      )
    );
    console.log('form', formData);

    const config = {
      method: 'post',
      url: 'https://server.banzzokee.homes/api/adoptions',
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
      data: formData,
    };

    try {
      console.log('data', formData);
      const response = await axios.request(config);
      alert('게시 완료');
      navigate('/');
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
            <label>사진</label>
            <input type="file" multiple accept="image/*" name="image" className={styles.img_upload} onChange={onFileChange}></input>
            <div className={styles.addedImage}>{profileImage && <img src={profileImage} />}</div>
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
          <div className={styles.buttonContainer}>
            <button onClick={postAdoption} className={styles.button}>
              게시글 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
