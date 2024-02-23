import React, { useState } from 'react';
import styles from './MessageList.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
export default function MessageList({ roomId }) {
  const [messageList, setMessageList] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const myInfo = JSON.parse(sessionStorage.getItem('myInfo'));
  const getMessageList = async (e) => {
    if (roomId != null) {
      console.log('roomID', roomId);
      try {
        // const resp = await axios.get('http://localhost:3001/adoption');

        // setArticleList(resp.data);
        // console.log(resp.data);
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/chats/rooms/${roomId}?page=0&size=100`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log('MessageList data:::::::', response);
        setMessageList(response.data.content);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  useEffect(() => {
    getMessageList();
  }, [roomId]);
  const loadFunc = () => {
    return 1;
  };
  return (
    <>
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
          getScrollParent={() => this.scrollParentRef}
        >
          {messageList &&
            messageList.map((message) => (
              <div key={message.createdAt} className={styles.messageContainer}>
                {message.messageType === 'NONE' ? (
                  <div className={styles.systemMessageContainer}>
                    <div className={styles.systemMessage}>{message.message}</div>
                  </div>
                ) : message.user.nickname === `${myInfo.nickname}` ? (
                  <div className={styles.myMessageContainer}>
                    <div className={styles.myMessage}>{message.message}</div>
                  </div>
                ) : (
                  <div className={styles.otherMessageContainer}>
                    <div className={styles.profileImage}>{message.user.profileImgUrl ? <img src={message.user.profileImgUrl} className={styles.profileImage} /> : <img src="../../public/user.png" className={styles.defaultProfileImage}></img>}</div>
                    <div className={styles.otherMessage}>{message.message}</div>
                  </div>
                )}
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
