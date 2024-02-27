import 'firebase/compat/messaging';
import firebase from "firebase/compat/app";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const firebaseConfig = {
  apiKey: "AIzaSyBnucp4FYPJDz9Dg8qr5abHbTdMGC4Nem4",
  authDomain: "banzzokee-6e38c.firebaseapp.com",
  projectId: "banzzokee-6e38c",
  storageBucket: "banzzokee-6e38c.appspot.com",
  messagingSenderId: "706417801572",
  appId: "1:706417801572:web:3ce06d0ae06cde78a1a271",
  measurementId: "G-YPCP2D21P6"
};

// Firebase 앱 초기화가 여러 번 실행되지 않도록 확인
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화된 경우, 해당 인스턴스를 사용
}

// 새로운 appendMessage 함수 정의
function appendMessage(payload) {
  console.log('Message received.', payload);
  // 이 부분에서 받은 메시지를 처리하거나 알림 페이지에 추가하는 등의 작업을 수행할 수 있습니다.
}


export default function NotificationToken() {
  const navigate = useNavigate();
  const sendTokenToServer = async (token) => {
    try {
      const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
      const response = await axios.put(
        'https://server.banzzokee.homes/api/notifications/tokens',
        { token },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Token sent to server:', response.data);
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  useEffect(() => {
    const messaging = firebase.messaging();

    // 사용자로부터 알림 권한 요청
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification 권한 허용.');
        messaging.getToken(messaging, { vapidKey: 'BJgALk-acWHVF6O1MSyRXKW-6upKKByfWfp3lLEHpdonzLJtdIxzRdhrnD64rECNHeC9A1dp7mWZTeZpk_WKZ1w' }).then((currentToken) => {
          console.log('Current token:', currentToken);
          if (currentToken) {
            sendTokenToServer(currentToken);
          } else {
            console.log('토큰 사용불가. 토큰 사용을 위해서 권한 요청 필요.');
          }
        }).catch((err) => {
          console.log('토큰 에러. ', err);
        });
      }
    });


      // 포그라운드 메시지 수신 처리
    messaging.onMessage((payload) => {
      console.log('Message received.', payload);
      appendMessage(payload);

      const { title, body } = payload.notification;
      alert(` ${title}\n${body}`);
      if (Notification.permission === 'granted') {
        // 알림 권한이 허용된 경우
        showNotification(title, body);
      } else {
        // 알림 권한이 없는 경우, 권한을 요청
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // 권한이 허용된 경우
            showNotification(title, body);
          }
        });

      }
    });

    // 알림을 화면에 표시하는 함수
    function showNotification(title, body) {
      const options = {
        body: body,
      };

      new Notification(title, options);
    }


    const handleNotificationClick = (payload) => {
      if (payload.data && payload.data.notificationType) {
        const notificationType = payload.data.notificationType;
        const notificationId = payload.data.notificationId;
  
        if (notificationType === 'chat') {
          navigate(`/Message/${notificationId}`);
        } else if (notificationType === 'post') {
          navigate(`/posts/${notificationId}`);
        }
      }
    };





  }, []);

  return null;
}