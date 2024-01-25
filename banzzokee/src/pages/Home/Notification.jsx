import styles from './Notification.module.css';

export default function() {
  return(
    <div className={styles.notification_Page}>
      <div className={styles.notification_Header}>
        {/* <img src="/Arrow.png" alt="Arrow" className={styles.arrow} /> */}
        <div className={styles.notification_Logo}>
          <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
          알림
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