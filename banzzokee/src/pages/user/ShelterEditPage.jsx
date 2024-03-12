import styles from './ShelterEditPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import cx from 'clsx';
import { useInRouterContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShelterEditPage() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const myInfo = JSON.parse(sessionStorage.getItem('myInfo'));
  const navigate = useNavigate();

  const [newInfo, setNewInfo] = useState(myInfo.shelter);

  const [profileImage, setProfileImage] = useState();
  const [submitImage, setSubmitImage] = useState(null);
  const [shelterInfo, setShelterInfo] = useState(myInfo.shelter);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
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
  const onSubmit = async (e) => {
    e.preventDefault();
    let sendData = new FormData();
    sendData.append('profileImg', submitImage);
    sendData.append('request', new Blob([JSON.stringify(newInfo)], { type: 'application/json' }));
    try {
      const config = {
        method: 'patch',
        url: `https://server.banzzokee.homes/api/shelters/${shelterInfo.shelterId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: sendData,
      };
      await axios.request(config).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
    alert('수정완료.');
    navigate('/SettingPage');
    // document.location.href = '/SettingPage';
  };

  const onDelete = async () => {
    try {
      const config = {
        method: 'delete',
        url: `https://server.banzzokee.homes/api/shelters/${myInfo.shelter.shelterId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.request(config).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
    alert('보호소 등록을 삭제하였습니다.');
    navigate('/SettingPage');
  };

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <form className={styles.edit} onSubmit={onSubmit}>
          <div className={styles.editInput}>
            <div className={styles.pictures}>
              <div className={styles.picture}>{shelterInfo?.shelterImgUrl ? <img src={shelterInfo.shelterImgUrl} /> : <></>}</div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
                <label className={styles.addIcon} htmlFor="fileInput">
                  <img src="../../../public/addPhoto.svg" alt="" />
                </label>
              </div>
            </div>
            <div className={styles.shelterInfo}>
              <p>보호소 이름:</p>
              <input className={styles.input} type="text" name="name" onInput={onChange} value={newInfo.name} placeholder="" />
              <p>보호소 소개:</p>
              <input className={styles.input} type="text" name="description" onInput={onChange} value={newInfo.description} placeholder="" />
              <p>연락처: (예시:000-000-0000)</p>
              <input className={styles.input} type="text" name="tel" onInput={onChange} value={newInfo.tel} placeholder="" />
              <p>주소:</p>
              <input className={styles.input} type="text" name="address" onInput={onChange} value={newInfo.address} placeholder="" />
              <p>위도:</p>
              <input className={styles.input} type="number" step="0.001" name="latitude" value={newInfo.latitude} onInput={onChange} placeholder="" />
              <p>경도:</p>
              <input className={styles.input} type="number" step="0.001" name="longitude" value={newInfo.longitude} onInput={onChange} placeholder="" />
            </div>
          </div>
          <button className={styles.button} type="submit">
            보호소 수정
          </button>
          <button className={cx(styles.button, styles.deleteButton)} onClick={onDelete}>
            보호소 삭제
          </button>
        </form>
      </div>
    </>
  );
}
