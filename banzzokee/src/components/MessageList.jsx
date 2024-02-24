import React, { useState } from 'react';
import styles from './MessageList.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MessageList({ roomId }) {
  const [messageList, setMessageList] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const myInfo = JSON.parse(sessionStorage.getItem('myInfo'));

  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);

  // const getMessageList = async (e) => {
  //   if (roomId != null) {
  //     console.log('roomID', roomId);
  //     try {
  //       // const resp = await axios.get('http://localhost:3001/adoption');

  //       // setArticleList(resp.data);
  //       // console.log(resp.data);
  //       const config = {
  //         method: 'get',
  //         url: `https://server.banzzokee.homes/api/chats/rooms/${roomId}?page=0&size=10`,
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       };
  //       const response = await axios.request(config);
  //       console.log('MessageList data:::::::', response);
  //       setMessageList(response.data.content);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  // };
  useEffect(() => {
    getMessageList();
  }, [roomId]);

  const getMessageList = async () => {
    console.log('roomId, getMessageList', roomId);
    const config = {
      method: 'get',
      url: `https://server.banzzokee.homes/api/chats/rooms/${roomId}?page=${index}&size=10`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const response = await axios.request(config);
    //       console.log('MessageList data:::::::', response);
    //       setMessageList(response.data.content);
    const newMessages = response.data.content;
    setMessageList([...messageList, ...newMessages]);
    response.data.content.length > 0 ? setHasMore(true) : setHasMore(false);

    setIndex(index + 1);
  };

  return (
    <>
      <div>
        <InfiniteScroll dataLength={messageList.length} next={getMessageList} hasMore={hasMore} loader={messageList.length != 0 ? <>loading...</> : <></>} scrollThreshold={1.0} inverse={true}>
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
