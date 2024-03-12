import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header({ unreadCount }) {
  return (
    <div className={styles.header}>
      <img src="/Logo.svg" alt="로고" className={styles.logo} />
      <div className={styles.notification}>
        <Link to="/Notification">
          <img src="/Notification.png" alt="알림" className={styles.notification} />
          {unreadCount > 0 && (
            <div className={styles.notificationCount}>{unreadCount}</div>
          )}
        </Link>
      </div>
    </div>
  );
}
