import 'firebase/compat/messaging';
import firebase from "firebase/compat/app";
import { useEffect } from "react";
import axios from "axios";



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


export default function NotificationToken() {
  useEffect(() => {
    const messaging = firebase.messaging();
  
    // 사용자로부터 알림 권한 요청
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification 권한 허용.');
  
        // 토큰 가져오기 및 서버에 전송
        messaging.getToken(messaging, { vapidKey: 'BJgALk-acWHVF6O1MSyRXKW-6upKKByfWfp3lLEHpdonzLJtdIxzRdhrnD64rECNHeC9A1dp7mWZTeZpk_WKZ1w' }).then((currentToken) => {
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
      console.log('Message received. ', payload);
      // 사용자 정의 알림 표시 등의 추가 로직
    });
  }, []);

  return null; // 혹시 render를 요구하는 linter 경고를 방지하기 위해 null을 반환합니다.

}  




