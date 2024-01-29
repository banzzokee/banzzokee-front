import styles from './Notification.module.css';
// import Back from '../../components/common/back/Back';
import BackHeader from '../../components/common/header/BackHeader';

export default function() {
  return(
    <>
      <BackHeader />
      <div className={styles.notification_Page}>
        <div className={styles.back}>
        </div>
        <div className={styles.notification_Header}>
          <div className={styles.notification_Logo}>
            <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
            <span>알림</span>
          </div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <button className={styles.button}>전체 확인</button>
      </div>
    </> 
  )
}