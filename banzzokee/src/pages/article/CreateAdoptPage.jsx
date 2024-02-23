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
  // const [isActive, setIsActive] = useState({
  //   ongoing: false,
  //   booking: false,
  //   completion: false,
  // });

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

      // if (name === 'image') {
      //   const adoption = new FormData();
      //   for (let i = 0; i < e.target.files.length; i++) {
      //     adoption.append('image', e.target.files[i]);
      //   }

      //   axios
      //     .post('http://localhost:3001/adoption', adoption)
      //     .then((res) => {
      //       const newImageUrls = res.data.imageUrls || [];

      //       setAdoption((prevAdoption) => ({
      //         ...prevAdoption,
      //         imageUrls: [...prevAdoption.imageUrls, ...newImageUrls],
      //       }));
      //     })
      //     .catch((error) => {
      //       console.error('Error uploading image:', error);
      //     });
      // }
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
    // const data = new FormData();
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
    // adoption.imageUrls.forEach((imageUrl, index) => {
    //   data.append(`images[${index}]`, imageUrl);
    // });

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
      navigate('/MyPage');
      console.log(response);
    } catch (error) {
      console.error('Error posting adoption:', error);
    }
  };

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
          {/* <div className={styles.inputGroup}>
            <label>상태</label>
            <div className={styles.stateBox}>
              <button type="button" name="status" value="분양중" onClick={() => handleStatus('분양중')} style={isActive.ongoing ? { backgroundColor: '#FFEE55' } : {}} className={styles.ongoing}>
                분양중
              </button>
              <button type="button" name="status" value="예약중" onClick={() => handleStatus('예약중')} style={isActive.booking ? { backgroundColor: '#FFB155' } : {}} className={styles.booking}>
                예약중
              </button>
              <button type="button" name="status" value="분양완료" onClick={() => handleStatus('분양완료')} style={isActive.completion ? { backgroundColor: '#79C7DF' } : {}} className={styles.completion}>
                분양완료
              </button>
            </div>
          </div> */}
          <div className={styles.inputGroup}>
            <label className={styles.textTitle}>본문</label>
            <textarea name="content" value={adoption.content} onChange={onChange} placeholder="500자 이내로 작성해주세요." maxLength="500"></textarea>
          </div>
          <button onClick={postAdoption} className={styles.button}>
            게시글 등록
          </button>
        </form>
      </div>
    </div>
  );
}