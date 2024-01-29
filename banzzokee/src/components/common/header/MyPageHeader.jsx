import styles from './MyPageHeader.module.css';
import { Link } from 'react-router-dom';
export default function MyPageHeader() {
  return (
    <div className={styles.myPageHeader}>
      <div className={styles.settingIcon}>
        <Link to="/settingPage">
          <img src="../../../public/Setting.svg" style={{ width: '30px', height: '30px' }} />
        </Link>
      </div>
    </div>
  );
}
