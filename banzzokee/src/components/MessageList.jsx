import React, { useState } from 'react';
import styles from './MessageList.module.css';
import axios from 'axios';
import { useEffect } from 'react';
export default function MessageList({ roomId }) {
  const [messageList, setMessageList] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const getMessageList = async (e) => {
    console.log('roomID', roomId);
    if (roomId != null) {
      console.log('roomID', roomId);
      try {
        // const resp = await axios.get('http://localhost:3001/adoption');

        // setArticleList(resp.data);
        // console.log(resp.data);
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/chats/rooms/${roomId}?page=0&size=10`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log('MessageList data:::::::', response);
        setMessageList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  useEffect(() => {
    getMessageList();
  }, [roomId]);
  return <></>;
}

// <div key={message.id} className={styles.messageContainer}>
//   {message.messageType === 'EXIT' ? (
//     <div className={styles.systemMessageContainer}>
//       <div className={styles.systemMessage}>{message.message}</div>
//     </div>
//   ) : message.user.nickname === user ? (
//     <div className={styles.myMessageContainer}>
//       <div className={styles.myMessage}>{message.message}</div>
//     </div>
//   ) : (
//     <div className={styles.otherMessageContainer}>
//       <div className={styles.profileImage}>{/* <img src="../../profile.jpeg" className={styles.profileImage} style={(index === 0 ? { visibility: 'visible' } : messageList[index - 1].user.name === user.name) || messageList[index - 1].user.name === 'system' ? { visibility: 'visible' } : { visibility: 'hidden' }} /> */}</div>
//       <div className={styles.otherMessage}>{message.message}</div>
//     </div>
//   )}
// </div>
