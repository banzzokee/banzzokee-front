import styles from './MyPageEdit.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export default function MyPageEdit() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  let photo = <img src={userInfo.profile_img_url}></img>;
  let nickname = userInfo.nickname;
  let introduce = userInfo.introduce;
  // const [newNickname, setNewNickname] = useState(nickname);
  // const [newIntroduce, setNewIntroduce] = useState(introduce);
  const [newInfo, setNewInfo] = useState(userInfo);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(accessToken);

    await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo).then(() => {
      alert('수정완료');
      navigate('/MyPage');
    });
    console.log('userinfo:', userInfo);
    console.log('newinfo:', newInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
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
              <p>닉네임:</p>
              <input className={styles.input} type="text" name="nickname" value={newInfo.nickname} onChange={onChange} />
              <p>자기 소개:</p>
              <textarea className={styles.textarea} type="password" name="introduce" value={newInfo.introduce} onChange={onChange} />
            </div>
          </div>
          <button className={styles.button} type="submit">
            수정 완료
          </button>
        </form>
      </div>
    </>
  );
}
