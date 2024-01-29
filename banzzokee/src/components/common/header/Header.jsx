import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <img src='/Logo.png' alt='로고' className={styles.logo} />
            <Link className='Notification' to='/Notification'>
            <img src='/Notification.png' alt='알림' className={styles.notification} />    
            </Link>
        </div>
    )
}
