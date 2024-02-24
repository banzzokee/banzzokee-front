import styles from './ShelterRegisterPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ShelterRegisterPage() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState();
  const [submitImage, setSubmitImage] = useState(null);
  const [shelterInfo, setShelterInfo] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setShelterInfo({
      ...shelterInfo,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSubmitImage(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  // useEffect(() => {
  //   setNewInfo({
  //     ...newInfo,
  //     ['shelter']: shelterInfo,
  //   });
  // }, [shelterInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('db: ', newInfo);
    // await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    // sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
    // navigate('/SettingPage');
    let sendData = new FormData();
    sendData.append('shelterImg', submitImage);
    sendData.append('request', new Blob([JSON.stringify(shelterInfo)], { type: 'application/json' }));
    try {
      const config = {
        method: 'post',
        url: 'https://server.banzzokee.homes/api/shelters',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: sendData,
      };
      await axios.request(config).then((response) => {
        alert('변경완료');
        console.log(response);
        navigate('/MyPage');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <form className={styles.edit} onSubmit={onSubmit}>
          <div className={styles.editInput}>
            <div className={styles.pictures}>
              <div className={styles.picture}>
                <img src={profileImage} alt="보호소 사진" />
              </div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="" id="fileInput" onChange={handleImageChange}></input>
                <label className={styles.addIcon} htmlFor="fileInput">
                  <img src="../../../public/addPhoto.svg" alt="" />
                </label>
              </div>
            </div>
            <div className={styles.shelterInfo}>
              <p>보호소 이름:</p>
              <input className={styles.input} type="text" name="name" onInput={onChange} placeholder="" />
              <p>보호소 소개:</p>
              <input className={styles.input} type="text" name="description" onInput={onChange} placeholder="" />
              <p>연락처: (예시:000-000-0000)</p>
              <input className={styles.input} type="text" name="tel" onInput={onChange} placeholder="" />
              <p>주소:</p>
              <input className={styles.input} type="text" name="address" onInput={onChange} placeholder="" />
              <p>위도:</p>
              <input className={styles.input} type="number" step="0.001" name="latitude" onInput={onChange} placeholder="" />
              <p>경도:</p>
              <input className={styles.input} type="number" step="0.001" name="longitude" onInput={onChange} placeholder="" />
            </div>
          </div>
          <button className={styles.button} type="submit">
            보호소 등록 요청
          </button>
        </form>
      </div>
    </>
  );
}
