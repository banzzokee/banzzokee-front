// import { getMessaging } from "firebase/messaging";
// import { initializeApp } from "firebase/app";
// export default function NotificationToken()  {
//   useEffect(() => {
//     getMessaging
//       .getToken()
//       .then((currentToken) => {
//         if (currentToken) {
//           sendTokenToServer(currentToken);
//           updateUIForPushEnabled(currentToken);
//         } else {
//           console.log('No Instance ID token available.');
//         }
//       })
//       .catch((err) => {
//         console.log('Error ', err);
//       });

//     getMessaging.onTokenRefresh(() => {
//       getMessaging
//         .getToken()
//         .then((refreshedToken) => {
//           console.log('Token refreshed. ', refreshedToken);
//           sendTokenToServer(refreshedToken);
//         })
//         .catch((err) => {
//           console.log('Unable to retrieve refreshed token. ', err);
//         });
//     });

//     getMessaging.onMessage((payload) => {
//       console.log('Message received. ', payload);
//     });
//   }, []);

//   const sendTokenToServer = (token) => {
//     const accessToken = sessionStorage.getItem('accessToken');

//     axios({
//       method: 'put',
//       url: '/api/notifications/tokens',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//       data: {
//         token: token,
//       },
//     })
//     .then((response) => {
//       console.log('Token sent to server successfully:', response);
//     })
//     .catch((error) => {
//       console.error('Error sending token to server:', error);
//     });
//   };

//   return(
//     <></>
//   )

// }

