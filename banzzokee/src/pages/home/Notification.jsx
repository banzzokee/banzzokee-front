import styles from './Notification.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { notificationDate } from '../../components/dateUtils';
import { useNavigate } from 'react-router-dom';


export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

  useEffect(() => {
    setUnreadCount(notifications.filter(notification => !notification.checked).length);
  }, [notifications]); 

  const getNotifications = async () => {
    try {
      const config = {
        method: 'get',
        // url: 'https://server.banzzokee.homes/api/notifications?page=?&size=?&checked=boolean',
        url: 'https://server.banzzokee.homes/api/notifications',
        params: {
          page: 0,
          size: 4,
          checked: 'false',
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);

      console.log('API Response:', response.data);

      if (Array.isArray(response.data.content)) {
        setNotifications(response.data.content);
      } else {
        console.error('Invalid data format received:', response.data);
      }
    } catch (error) {
      console.error(error);
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
      await axios.post('https://server.banzzokee.homes/api/notifications/check-all', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getNotifications();
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    console.log('Notification component mounted.');
    getNotifications();
  }, []); 


  const navigate = useNavigate();
  const handleNotificationClick = (notification) => {
    if (notification.type === 'chat') {
      navigate(`/Message/${notification.id}`);
    } else if (notification.type === 'post') {
      navigate(`/posts/${notification.postId}`);
    }
  };

  useEffect(() => {
    setUnreadCount(notifications.filter(notification => !notification.checked).length);
  }, [notifications]); 


  return (
    <>
      <BackHeader />
      <div className={styles.notification_Page}>
        <div className={styles.notification_Header}>
          <div className={styles.notification_Logo}>
            <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
            <span>알림</span>
            {/* {unreadCount > 0 && (
            <div className={styles.notificationCount}>{unreadCount}</div>
          )} */}
          </div>
        </div>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
              <div className={styles.liBox}>
                <div className={styles.notificationContainer}>
                  <div className={styles.notificationTitle}>{notification.title}</div>
                  <div className={styles.notificationBody}>{notification.body}</div>
                  {/* <div className={styles.notificationDate}>{String(notification.notifiedAt).substring(0,10)}</div> */}
                  <div className={styles.notificationDate}>{notificationDate(notification.notifiedAt)}</div>

                </div>
                <div className={styles.deleteIcon} onClick={() => markNotificationAsRead(notification.id)}>
                  <img src="../../../public/X.svg" alt="" style={{ width: '14px', height: '14px' }} />
                </div>
              </div>
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



