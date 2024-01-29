import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <img src="/Logo.png" alt="로고" className={styles.logo} />
      <div className={styles.notification}>
        <Link to="/Notification">
          <img src="/Notification.png" alt="알림" className={styles.notification} />
        </Link>
      </div>
    </div>
  );
}
