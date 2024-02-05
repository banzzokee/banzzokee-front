import styles from './ShelterEditPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import cx from 'clsx';
import { useInRouterContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShelterEditPage() {
  const photo = <img src="../../../public/User.png"></img>;
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const navigate = useNavigate();

  const [newInfo, setNewInfo] = useState(userInfo);
  const [shelterInfo, setShelterInfo] = useState(userInfo.shelter);
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

  const onSubmit = async () => {
    console.log('db: ', newInfo);
    await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
    // navigate('/SettingPage');
    document.location.href = '/SettingPage';
  };

  const onDelete = () => {
    console.log('delete clicked');
    setShelterInfo({
      name: '',
      description: '',
      tel: '',
      address: '',
    });
    console.log('newinfo should be updated', newInfo);
    setNewInfo({
      ...newInfo,
      ['shelter']: shelterInfo,
    });
  };

  const deleteShelter = async (e) => {
    e.preventDefault();
    onDelete();
    console.log('newINfo', newInfo);
    await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
    // document.location.href = '/SettingPage';
    // navigate('/SettingPage');
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
              <input className={styles.input} type="text" name="name" onInput={onChange} placeholder={shelterInfo.name} />
              <p>보호소 소개:</p>
              <input className={styles.input} type="text" name="description" onInput={onChange} placeholder={shelterInfo.description} />
              <p>연락처:</p>
              <input className={styles.input} type="text" name="tel" onInput={onChange} placeholder={shelterInfo.tel} />
              <p>주소:</p>
              <input className={styles.input} type="text" name="address" onInput={onChange} placeholder={shelterInfo.address} />
            </div>
          </div>
          <button className={styles.button} type="submit">
            보호소 수정
          </button>
          <button className={cx(styles.button, styles.deleteButton)} onClick={deleteShelter}>
            보호소 삭제
          </button>
        </form>
      </div>
    </>
  );
}
