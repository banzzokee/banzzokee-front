import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.Header}>
            <img src='/Logo.png' alt='로고' className={styles.Logo} />
            <Link className='Notification' to='/Notification'>
            <img src='/Notification.png' alt='알림' className={styles.Notification} />    
            </Link>
        </div>
    )
}
