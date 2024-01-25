import styles from './ChatListPage.module.css';

import Header from '../../Header';
import Nav from '../../Nav';

export default function ChatListPage() {
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
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
