import styles from './ShelterRegisterPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ShelterRegisterPage() {
  const photo = <img src="../../../public/User.png"></img>;
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const navigate = useNavigate();

  const [shelterInfo, setShelterInfo] = useState({});
  const [newInfo, setNewInfo] = useState(userInfo);
  const onChange = (e) => {
    const { name, value } = e.target;
    setShelterInfo({
      ...shelterInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    setNewInfo({
      ...newInfo,
      ['shelter']: shelterInfo,
    });
  }, [shelterInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('db: ', newInfo);
    await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
    navigate('/SettingPage');
  };

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <form className={styles.edit} onSubmit={onSubmit}>
          <div className={styles.editInput}>
            <div className={styles.pictures}>
              <div className={styles.picture}>{photo}</div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
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
