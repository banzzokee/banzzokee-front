import React, { useState } from 'react';
import styles from './MessageContainer.module.css';

const MessageContainer = ({ messageList, user }) => {
  console.log(messageList);
  if (messageList !== undefined) {
    return (
      <div>
        {messageList.map((message, index) => {
          return (
            <div key={message._id} className={styles.messageContainer}>
              {message.messageType === 'EXIT' ? (
                <div className={styles.systemMessageContainer}>
                  <div className={styles.systemMessage}>{message.message}</div>
                </div>
              ) : message.user.nickname === user ? (
                <div className={styles.myMessageContainer}>
                  <div className={styles.myMessage}>{message.message}</div>
                </div>
              ) : (
                <div className={styles.otherMessageContainer}>
                  <div className={styles.profileImage}>{/* <img src="../../profile.jpeg" className={styles.profileImage} style={(index === 0 ? { visibility: 'visible' } : messageList[index - 1].user.name === user.name) || messageList[index - 1].user.name === 'system' ? { visibility: 'visible' } : { visibility: 'hidden' }} /> */}</div>
                  <div className={styles.otherMessage}>{message.message}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MessageContainer;
