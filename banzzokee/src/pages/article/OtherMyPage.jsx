import styles from './OtherMyPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyArticleList from '../../components/MyArticleList';
import { useNavigate } from 'react-router-dom';
export default function OtherMyPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const myInfo = JSON.parse(sessionStorage.getItem('myInfo'));
  // adding feature to git branch bookmark
  const [follow, setFollow] = useState();

  function onClick() {
    setFollow(!follow);
    if (accessToken) {
      addFollow();
    } else {
      alert('로그인후 이용 가능한 서비스 입니다.');
    }
  }
  const checkFollow = async () => {
    if (accessToken != null) {
      try {
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/users/${state.userId}`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log('userId get', response.data);
        setFollow(response.data.isFollowingUser);
      } catch (error) {
        console.error(error);
      }
    } else {
      setFollow(false);
    }
  };
  useEffect(() => {
    checkFollow();
  }, []);
  const addFollow = async () => {
    console.log('other', state);
    console.log('myInfo', myInfo);
    if (!follow) {
      try {
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/users/1/follow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/users/1/unfollow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };
  let photo = <img src="../../../public/User.png"></img>;
  if (state.profileImgUrl) {
    photo = <img src={state.profileImgUrl} />;
  }
  let nickname = '';
  if (state.nickname) {
    nickname = state.nickname;
  }
  let introduce = '';
  if (state.introduce) {
    introduce = state.introduce;
  }
  const onClickShelter = () => {
    navigate('/ShelterInfoPage', { state: state.shelter });
  };
  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <div className={styles.shelterInfo}>
          <div className={styles.picture}>{photo}</div>
          <div className={styles.infoAndName}>
            <div className={styles.viewShelterInfoButton} onClick={onClickShelter}>
              <Button>보호소 조회</Button>
            </div>
            <div className={styles.shelterName}>{nickname}</div>
          </div>
          <p className={styles.introduce}>{introduce}</p>
          <div>
            <button style={{ width: '100%', color: 'white', backgroundColor: follow ? '#bebebe' : '#add8e6', fontSize: '20px' }} onClick={onClick}>
              {follow ? '팔로잉' : '팔로우'}
            </button>
          </div>
        </div>
        <div className={styles.articleContainer}>
          <div className={styles.articleHeader}>작성 게시물</div>
          <div className={styles.articleList}>
            <MyArticleList userId={state.userId}></MyArticleList>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
