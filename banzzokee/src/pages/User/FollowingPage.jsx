import styles from './FollowingPage.module.css';

import Header from '../../Header';
import Nav from '../../Nav';
import Button from '../../components/Button';
export default function FollowingPage() {
  const defaultPhoto = <img style={{ width: '20px', height: 'auto' }} src="../../../public/User.png"></img>;
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.follower}>
          <div className={styles.followerInfo}>
            <div className={styles.userImage}>{defaultPhoto}</div>
            <div className={styles.userName}>user_123</div>
            <div></div>
          </div>
          <div className={styles.followButton}>
            <Button>팔로우</Button>
          </div>
        </div>
        <div className={styles.follower}>
          <div className={styles.followerInfo}>
            <div className={styles.userImage}>{defaultPhoto}</div>
            <div className={styles.userName}>user_123</div>
            <div></div>
          </div>
          <div className={styles.followButton}>
            <Button>팔로우</Button>
          </div>
        </div>
        <div className={styles.follower}>
          <div className={styles.followerInfo}>
            <div className={styles.userImage}>{defaultPhoto}</div>
            <div className={styles.userName}>user_123</div>
            <div></div>
          </div>
          <div className={styles.followButton}>
            <Button>팔로우</Button>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
