// importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js')
// importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js')

// const config =  { 
// 	apiKey: "AIzaSyBnucp4FYPJDz9Dg8qr5abHbTdMGC4Nem4",
//   authDomain: "banzzokee-6e38c.firebaseapp.com",
//   projectId: "banzzokee-6e38c",
//   storageBucket: "banzzokee-6e38c.appspot.com",
//   messagingSenderId: "706417801572",
//   appId: "1:706417801572:web:3ce06d0ae06cde78a1a271",
//   measurementId: "G-YPCP2D21P6"
// }; 

// const messaging = firebase.messaging();

// firebase.initializeApp(config);

import { initializeApp } from '@firebase/app-compat';
import { getMessaging } from '@firebase/messaging-compat';

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
const messaging = getMessaging(firebaseApp);