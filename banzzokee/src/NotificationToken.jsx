// import { getToken, deleteToken, onMessage } from '@firebase/messaging';
import { getMessaging, getToken, onTokenRefresh } from "@firebase/messaging-compat";
import { initializeApp } from "@firebase/app-compat";
import { useEffect } from "react";
import axios from "axios";
// import React from 'react';
// import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBnucp4FYPJDz9Dg8qr5abHbTdMGC4Nem4",
  authDomain: "banzzokee-6e38c.firebaseapp.com",
  projectId: "banzzokee-6e38c",
  storageBucket: "banzzokee-6e38c.appspot.com",
  messagingSenderId: "706417801572",
  appId: "1:706417801572:web:3ce06d0ae06cde78a1a271",
  measurementId: "G-YPCP2D21P6"
};

const firebaseApp = initializeApp(firebaseConfig);

export default function NotificationToken()  {

  useEffect(() => {
    const messaging = getMessaging();

    getToken(messaging).then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

    onTokenRefresh(messaging, () => {
      getToken(messaging).then((refreshedToken) => {
        console.log('Token refreshed. ', refreshedToken);
        sendTokenToServer(refreshedToken);
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token. ', err);
      });
    });

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });
  }, []);

  const sendTokenToServer = (token) => {
    const accessToken = sessionStorage.getItem('accessToken');

    axios({
      method: 'put',
      url: 'https://server.banzzokee.homes/api/notifications/tokens',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        token: token,
      },
    })
    .then((response) => {
      console.log('Token sent to server successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending token to server:', error);
    });
  };





  // useEffect(() => {
  //   const messaging = getMessaging();

  //     getToken(messaging)
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         sendTokenToServer(currentToken);
  //         // updateUIForPushEnabled(currentToken);
  //       } else {
  //         console.log('No Instance ID token available.');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Error ', err);
  //     });

  //   messaging.onTokenRefresh(() => {
  //       getToken(messaging)
  //       .then((refreshedToken) => {
  //         console.log('Token refreshed. ', refreshedToken);
  //         sendTokenToServer(refreshedToken);
  //       })
  //       .catch((err) => {
  //         console.log('Unable to retrieve refreshed token. ', err);
  //       });
  //   });

  //   messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //   });
  // }, []);

  // const sendTokenToServer = (token) => {
  //   const accessToken = sessionStorage.getItem('accessToken');

  //   axios({
  //     method: 'put',
  //     url: 'https://server.banzzokee.homes/api/api/notifications/tokens',
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       token: token,
  //     },
  //   })
  //   .then((response) => {
  //     console.log('Token sent to server successfully:', response);
  //   })
  //   .catch((error) => {
  //     console.error('Error sending token to server:', error);
  //   });
  // };

}

