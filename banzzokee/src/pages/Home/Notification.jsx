import styles from './Notification.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

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
      const response = await axios.request(config);
  
      console.log('Server Response:', response);

      console.log('Response Data:', response.data);

      // console.log(response.data.data?.content);
  
      // response.data가 정의되어 있으면 content를 사용하고, 그렇지 않으면 빈 배열 사용
      const contents = response.data?.contents || [];

      console.log('Contents:', contents);

      console.log('Notifications Length:', notifications.length);

      const initialNotifications = contents || [];



  
      setNotifications(initialNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
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

  useEffect(() => {
    getNotifications();
  }, []); // 컴포넌트 마운트 시에만 실행

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
        {notifications.length === 0 ? (
          <p className={styles.noNotificationsMessage}>알림이 없습니다.</p>
        ) : (
          <>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <div className={styles.deleteIcon} onClick={() => markNotificationAsRead(notification.id)}>
                    <img src="../../../public/X.svg" alt="" style={{ width: '14px', height: '14px' }} />
                  </div>
                  {/* <div>{notification.message}</div> */}
                  <div className={styles.notificationTitle}>{notification.title}</div>
                <div className={styles.notificationBody}>{notification.body}</div>
                </li>
              ))}
            </ul>
            <button className={styles.button} onClick={markAllNotificationsAsRead}>
              전체 확인
            </button>
          </>
        )}
      </div>
    </>
  );
}






// import styles from './Notification.module.css';
// import BackHeader from '../../components/common/header/BackHeader';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
//   const getNotifications = async () => {
//     try {
//       const config = {
//         method: 'get',
//         // url: 'https://server.banzzokee.homes/api/notifications?page=?&size=?&checked=boolean',
//         url: 'https://server.banzzokee.homes/api/notifications',
//         params: {
//           page: 0,
//           size: 4,
//           checked: 'false',
//         },
//         headers: { Authorization: `Bearer ${accessToken}` },
//       };
//       const response = await axios.request(config);

//       console.log('API Response:', response.data);

//       if (Array.isArray(response.data)) {
//         setNotifications(response.data);
//       } else {
//         console.error('Invalid data format received:', response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  


//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       await axios.post(`https://server.banzzokee.homes/api/notifications/${notificationId}/check`, null, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       getNotifications();
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   const markAllNotificationsAsRead = async () => {
//     try {
//       await axios.post('https://server.banzzokee.homes/api/notifications/all-check', null, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       getNotifications();
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   return (
//     <>
//       <BackHeader />
//       <div className={styles.notification_Page}>
//         <div className={styles.notification_Header}>
//           <div className={styles.notification_Logo}>
//             <img src="/Notification.png" alt="Notification" className={styles.notification_Img} />
//             <span>알림</span>
//           </div>
//         </div>
//         <ul>
//           {notifications.map((notification) => (
//             <li key={notification.id}>
//               <div className={styles.deleteIcon} onClick={() => markNotificationAsRead(notification.id)}>
//                 <img src="../../../public/X.svg" alt="" style={{ width: '14px', height: '14px' }} />
//               </div>
//               <div className={styles.notificationTitle}>{notification.title}</div>
//               <div className={styles.notificationBody}>{notification.body}</div>
//             </li>
//           ))}
//         </ul>
//         <button className={styles.button} onClick={markAllNotificationsAsRead}>
//           전체 확인
//         </button>
//       </div>
//     </>
//   );
// }



