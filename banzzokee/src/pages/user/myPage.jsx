import styles from './myPage.module.css';
import Button from '../../components/common/button/Button';
import { Link, useNavigate } from 'react-router-dom';
// import BadgeIcon from '/src/components/BadgeIcon';
import MyPageHeader from '../../components/common/header/MyPageHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/common/nav/Nav';
import ReviewList from '../../components/ReviewList';
import MyArticleList from '../../components/MyArticleList';
import BookmarkList from '../../components/BookmarkList';

export default function MyPage() {
  const [buttonLColor, setButtonLColor] = useState('white');
  const [buttonRColor, setButtonRColor] = useState('#bebebe');
  const [selectButton, setSelectButton] = useState('L');
  const [userInfo, setUserInfo] = useState({});
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [profileImg, setProfileImage] = useState(null);
  // const [clickedL, setClickedL] = useState(false);
  // const [clickedR, setClickedR] = useState(false);

  const handleButtonClick = (buttonSelect) => {
    // Swap colors when either button is clicked
    if (buttonSelect === 'L') {
      setButtonLColor('white');
      setButtonRColor('#bebebe');
      setSelectButton('L');
      // setClickedL(true);
    } else {
      setButtonLColor('#bebebe');
      setButtonRColor('white');
      setSelectButton('R');
      // setClickedR(true);
    }
  };
  const getData = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/users/me',
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      sessionStorage.setItem('myInfo', JSON.stringify(response.data));
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('userInfo', userInfo);
  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const toMyPageEdit = () => {
    navigate(`/MyPageEdit/`, { state: userInfo });
  };
  const toShelterInfoPage = () => {
    navigate(`/ShelterInfoPage/`, { state: userInfo.shelter });
  };

  return (
    <>
      <MyPageHeader></MyPageHeader>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.profilePhoto}>
            <img src={userInfo.profileImgUrl}></img>
          </div>

          <div className={styles.profileHeader}>
            <div onClick={toShelterInfoPage}>
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
            </div>
            <p className={styles.userID}>{userInfo.nickname}</p>
            <div onClick={toMyPageEdit}>
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
            </div>
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
            {/* 다른 버튼 클릭시 재 랜더링되는게 아니라 display 만 none 으로 바꿔주는 작업을 적용하면 매번 버튼 누를때마다 rereder 깜빡임을 방지 */}
            {selectButton == 'L' && <BookmarkList />}
            {selectButton == 'R' && <MyArticleList userId={userInfo.userId} />}
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}