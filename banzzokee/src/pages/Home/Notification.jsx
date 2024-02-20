import styles from './Notification.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const notificationsResponse = await axios.get('https://server.banzzokee.homes/api/notifications?page=0&size=10&checked=false', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setNotifications(notificationsResponse.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.post(`https://server.banzzokee.homes/api/notifications/${notificationId}/check`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getNotifications();
    } catch (error) {
      console.error('Error', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await axios.post('https://server.banzzokee.homes/api/notifications/all-check', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getNotifications();
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      <BackHeader />
      <div className={styles.notification_Page}>
        <div className={styles.notification_Header}>
          <div className={styles.notification_Logo}>
            <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
            <span>알림</span>
          </div>
        </div>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <div className={styles.deleteIcon} onClick={() => markNotificationAsRead(notification.id)}>
                <img src="../../../public/X.svg" alt="" style={{ width: '14px', height: '14px' }} />
              </div>
              <div>{notification.message}</div>
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={markAllNotificationsAsRead}>
          전체 확인
        </button>
      </div>
    </>
  );
}
