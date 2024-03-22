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
    setUnreadCount(notifications.filter((notification) => !notification.checked).length);
  }, [notifications]);

  const getNotifications = async () => {
    try {
      const config = {
        method: 'get',
        url: 'https://server.banzzokee.homes/api/notifications',
        params: {
          page: 0,
          size: 4,
          checked: 'false',
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      console.log('Before API Request');
      const response = await axios.request(config);

      console.log('API Response:', response.data);

      if (Array.isArray(response.data.content)) {
        console.log('Setting Notifications:', response.data.content);
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
    console.log('Clicked notification:', notification);
    if (notification.message?.data?.chatRoomId) {
      console.log('Chat message ID:', notification.message.data.chatRoomId);
      let index = notification.message.notification.title.indexOf('님이');
      console.log(index);
      const sendName = notification.message.notification.title.substring(0, index);
      console.log(sendName);
      navigate(`/Message/${notification.message.data.chatRoomId}`, {
        state: { roomId: notification.message.data.chatRoomId, otherName: sendName },
      });
    } else if (notification.message?.data?.adoptionId) {
      console.log('Post ID:', notification.message.data.adoptionId);
      navigate(`/ArticleList/${notification.message.data.adoptionId}`);
    }
  };

  useEffect(() => {
    setUnreadCount(notifications.filter((notification) => !notification.checked).length);
  }, [notifications]);

  return (
    <>
      <BackHeader />
      <div className={styles.notification_Page}>
        <div className={styles.notification_Header}>
          <div className={styles.notification_Logo}>
            <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
            <span className={styles.alert}>알림</span>
          </div>
        </div>
        {notifications.length === 0 ? (
          <p>알림이 없습니다.</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <div className={styles.content}>
                  <div className={styles.liBox} onClick={() => handleNotificationClick(notification)}>
                    {notification.message.notification?.image && (
                      <div className={styles.profileImg}>
                        <img
                          src={notification.message.notification.image}
                          alt="Notification"
                          className={styles.notificationImage}
                        />
                      </div>
                    )}
                    <div className={styles.notificationContainer}>
                      <div className={styles.notificationTitle}>{notification.message.notification?.title}</div>
                      <div className={styles.notificationBody}>{notification.message.notification?.body}</div>
                      <div className={styles.notificationDate}>{notificationDate(notification.notifiedAt)}</div>
                    </div>
                  </div>
                  <div className={styles.deleteIcon} onClick={() => markNotificationAsRead(notification.id)}>
                    <img src="../../../public/X.svg" alt="" style={{ width: '14px', height: '14px' }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {notifications.length > 0 && (
          <button className={styles.button} onClick={markAllNotificationsAsRead}>
            전체 확인
          </button>
        )}
      </div>
    </>
  );
}
