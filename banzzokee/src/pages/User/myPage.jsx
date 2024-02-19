import styles from './MyPage.module.css';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
// import BadgeIcon from '/src/components/BadgeIcon';
import MyPageHeader from '../../components/common/header/MyPageHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/common/nav/Nav';
import ReviewList from '../../components/ReviewList';

export default function MyPage() {
  const [buttonLColor, setButtonLColor] = useState('white');
  const [buttonRColor, setButtonRColor] = useState('#bebebe');
  const [selectButton, setSelectButton] = useState('L');
  const [userInfo, setUserInfo] = useState({});
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

  const handleButtonClick = (buttonSelect) => {
    // Swap colors when either button is clicked
    if (buttonSelect === 'L') {
      setButtonLColor('white');
      setButtonRColor('#bebebe');
      setSelectButton('L');
    } else {
      setButtonLColor('#bebebe');
      setButtonRColor('white');
      setSelectButton('R');
    }
  };
  const getData = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/users',
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('response', response);
      sessionStorage.setItem('myInfo', JSON.stringify(response.data));
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
            <p className={styles.userID}>{userInfo.nickname}</p>
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
          <p className={styles.introduce}>{userInfo.introduce}</p>
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
            <div style={{ backgroundColor: buttonLColor }} onClick={() => handleButtonClick('L')} className={styles.category}>
              관심 게시물
            </div>
            <div style={{ backgroundColor: buttonRColor }} onClick={() => handleButtonClick('R')} className={styles.category}>
              내가 쓴 게시물
            </div>
          </div>
          <div className={styles.articleList}>
            {/* {selectButton == 'L' && <ReviewList />} */}
            {/* {selectButton == 'R' && <ReviewList />} */}
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
