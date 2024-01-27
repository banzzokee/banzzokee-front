import styles from './Notification.module.css';
import Back from '../../Back';

export default function() {
  return(
    <div className={styles.notification_Page}>
      <div className={styles.back}>
        <Back />
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
  )
}