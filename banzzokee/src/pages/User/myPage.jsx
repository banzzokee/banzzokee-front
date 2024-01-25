import styles from './myPage.module.css';
import Button from '/src/components/Button';
// import BadgeIcon from '/src/components/BadgeIcon';
// import BasicProfileIcon from '../../../public/BasicProfileIcon';
import { useState } from 'react';
import Header from '../../Header';
import Nav from '../../Nav';
import CreateAdoptPage from '../Article/CreateAdoptPage';

export default function MyPage() {
  const [button1Color, setButton1Color] = useState('#bebebe');
  const [button2Color, setButton2Color] = useState('white');

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

  return (
    <>
      <Header></Header>
      <div className={styles.sese}></div>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.profilePhoto}>
            {/* <BasicProfileIcon size="big"></BasicProfileIcon> */}
          </div>
          {/* <BadgeIcon className={styles.badgeIcon}></BadgeIcon> */}
          <div className={styles.profileContent}>
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
            <span className={styles.userID}>User ID</span>
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
          <p>500자 미만으로 작성해 주세 작성해 주세요.500자 미만으로 작성해 주세요500자 미만으로 작성해 주세요</p>
          <div className={styles.buttons}>
            <Button type="submit" size="big">
              <Link to="/CreateAdoptPage" className={styles.createAdopt}>
                게시물 작성
              </Link>
            </Button>
            <Button type="submit" size="big">
              팔로잉 보호소
            </Button>
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
