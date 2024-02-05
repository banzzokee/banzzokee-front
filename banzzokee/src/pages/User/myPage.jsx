import styles from './MyPage.module.css';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
// import BadgeIcon from '/src/components/BadgeIcon';
import MyPageHeader from '../../components/common/header/MyPageHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/common/nav/Nav';

export default function MyPage() {
  const [button1Color, setButton1Color] = useState('#bebebe');
  const [button2Color, setButton2Color] = useState('white');
  const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem('userInfo')));

  const handleButtonClick = (buttonNumber) => {
    // Swap colors when either button is clicked
    if (buttonNumber === 1) {
      setButton1Color('white');
      setButton2Color('#bebebe');
    } else {
      setButton1Color('#bebebe');
      setButton2Color('white');
    }
  };
  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/APmgnc1`);
        const data = response.data;
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getArticle();
  }, []);
  console.log('userinfo', userInfo);
  return (
    <>
      <MyPageHeader></MyPageHeader>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.profilePhoto}>{userInfo.profileImgUrl}</div>

          <div className={styles.profileHeader}>
            <Link to={{ pathname: '/ShelterInfoPage', state: 'hi' }}>
              <Button
                className={styles.viewShelterButton}
                style={{
                  position: 'absolute',
                  left: '0',
                }}
                type="submit"
                size="small"
              >
                보호소 조회
              </Button>
            </Link>
            <span className={styles.userID}>{userInfo.nickname}</span>
            <Link to="/MyPageEdit">
              <Button
                className={styles.profileEditButton}
                style={{
                  position: 'absolute',
                  right: '0',
                }}
                type="submit"
                size="small"
              >
                프로필 수정
              </Button>
            </Link>
          </div>
          <p>{userInfo.introduce}</p>
          <div className={styles.buttons}>
            <Link to="/CreateAdoptPage" className={styles.createAdopt}>
              <div className={styles.button}>게시물 작성</div>
            </Link>
            <Link to="/FollowingPage">
              <div className={styles.button}>팔로잉 보호소</div>
            </Link>
          </div>
        </div>
        <div className={styles.viewArticles}>
          <div className={styles.chooseCategory}>
            <div style={{ backgroundColor: button1Color }} onClick={() => handleButtonClick(1)} className={styles.category}>
              관심 게시물
            </div>
            <div style={{ backgroundColor: button2Color }} onClick={() => handleButtonClick(2)} className={styles.category}>
              내가 쓴 게시물
            </div>
          </div>
          <div className={styles.articleList}></div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
