import styles from './ChatListPage.module.css';
import { Link } from 'react-router-dom';
import ChatHeader from '../../components/common/header/ChatHeader.jsx';
import Nav from '../../components/common/nav/Nav.jsx';

export default function ChatListPage() {
  const userInfo = JSON.parse(sessionStorage.getItem('accessToken'));
  if (!userInfo) {
    alert('로그인 후 이용 가능한 서비스 입니다.');
    return (
      <>
        <ChatHeader></ChatHeader>
        <div className={styles.container}>
          <p>로그인을 해주세요</p>
        </div>
        <Nav></Nav>
      </>
    );
  }
  return (
    <>
      <ChatHeader></ChatHeader>
      <div className={styles.container}>
        <Link to="/Message">
          <div className={styles.message}>
            <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
            <div className={styles.userContent}>
              <div className={styles.userAndTime}>
                <div className={styles.userName}>user_123</div>

                <div className={styles.sendTime}>1시간 전</div>
              </div>
              <div className={styles.chatBody}> 대해 여쭤봅니다!</div>
            </div>
          </div>
        </Link>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
          <div className={styles.userContent}>
            <div className={styles.userAndTime}>
              <div className={styles.userName}>user_123</div>

              <div className={styles.sendTime}>1시간 전</div>
            </div>
            <div className={styles.chatBody}>입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다입양에 대해 여쭤봅니다!</div>
          </div>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
