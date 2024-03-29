import styles from './MyPageEdit.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
export default function MyPageEdit() {
  const { state } = useLocation();
  // const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const navigate = useNavigate();
  // const [newNickname, setNewNickname] = useState(nickname);
  // const [newIntroduce, setNewIntroduce] = useState(introduce);
  const [newInfo, setNewInfo] = useState(state);
  const [profileImage, setProfileImage] = useState(state.profileImgUrl);
  const [submitImage, setSubmitImage] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };
  console.log('state', state);

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

    // await axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo).then(() => {
    //   alert('수정완료');
    //   navigate('/MyPage');
    // });
    let sendData = new FormData();
    sendData.append('profileImg', submitImage);
    sendData.append('request', new Blob([JSON.stringify(newInfo)], { type: 'application/json' }));
    // console.log('formdata', sendData);
    // sendData.append('profileUrl', submitImage);
    // sendData.append('request', newInfo);
    // sendData.append('introduce', JSON.stringify(newInfo.introduce));
    try {
      const config = {
        method: 'patch',
        url: 'https://server.banzzokee.homes/api/users/me',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: sendData,
      };
      await axios.request(config).then((response) => {
        alert('수정완료');
        navigate('/MyPage');
        sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
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
              <div className={styles.picture} id="profileImg">
                {profileImage && <img src={profileImage} />}
              </div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="profileImgUrl" id="fileInput" accept="image/*" onChange={handleImageChange}></input>
                <label className={styles.addIcon} htmlFor="fileInput">
                  <img src="../../../public/addPhoto.svg" alt="" />
                </label>
              </div>
            </div>
            <div className={styles.shelterInfo}>
              <p>닉네임:</p>
              <input className={styles.input} type="text" name="nickname" value={newInfo.nickname} onChange={onChange} />
              {/* value={newInfo.nickname} 추가해야됨*/}
              <p>자기 소개:</p>
              <textarea className={styles.textarea} type="text" name="introduce" value={newInfo.introduce} onChange={onChange} />
              {/* value={newInfo.introduce} */}
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
