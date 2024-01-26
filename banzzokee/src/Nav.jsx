import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
export default function Nav() {
  return (
    <div className={styles.Navigation}>
      <Link className="Chat" to="/ChatListPage">
        <img src="/Chatting.png" alt="채팅" className={styles.Chatting} />
      </Link>
      <Link className="Map" to="/MapPage">
        <img src="/Map.png" alt="지도" className={styles.Map} />
      </Link>
      <Link className="Home" to="/">
        <img src="/Home.png" alt="홈" className={styles.Home} />
      </Link>
      <Link className="Review" to="/ViewArticlePage">
        <img src="/Review.png" alt="후기" className={styles.Review} />
      </Link>
      <Link className="MyPage" to="/MyPage">
        <img src="/User.png" alt="마이페이지" className={styles.MyPage} />
      </Link>
    </div>
  );
}
