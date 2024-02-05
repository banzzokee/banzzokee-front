import styles from './ShelterRegisterPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import axios from 'axios';
import { useState, React } from 'react';
export default function ShelterRegisterPage() {
  const photo = <img src="../../../public/User.png"></img>;
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const [newInfo, setNewInfo] = useState(userInfo);
  const [shelterInfo, setShelterInfo] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setShelterInfo({
      ...shelterInfo,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setNewInfo({
      ...newInfo,
      ['shelter']: shelterInfo,
    });
    await axios.put(`http://localhost:3001/users/2rwCeob`, newInfo);
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
              <input className={styles.input} type="text" name="name" onChange={onChange} placeholder="" />
              <p>보호소 소개:</p>
              <input className={styles.input} type="text" name="description" onChange={onChange} placeholder="" />
              <p>연락처:</p>
              <input className={styles.input} type="text" name="tel" onChange={onChange} placeholder="000-000-0000" />
              <p>주소:</p>
              <input className={styles.input} type="text" name="address" onChange={onChange} placeholder="" />
            </div>
          </div>
          <div className={styles.button} onClick={onSubmit}>
            보호소 등록 요청
          </div>
        </form>
      </div>
    </>
  );
}
