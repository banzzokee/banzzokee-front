import styles from './Message.module.css';
import Back from '../../components/common/back/Back';
import MessageContainer from './MessageContainer';
import InputField from './InputField';
import socket from './server';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Message() {
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState();
  const { nickname } = JSON.parse(sessionStorage.getItem('userInfo'));
  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     console.log("res",message)
  //     setMessageList((prevState) => prevState.concat(message))
  //   })
  // },[])

  const sendMessage = (e) => {
    e.preventDefault();
    // socket.emit('sendMessage', message, (res) => {
    //   console.log('sendMessage res', res);
    // });
  };
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chats`);
        const data = response.data;
        setMessageList(data);
        console.log(messageList);
        console.log(nickname);
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, []);
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.back}>
          <Back></Back>
        </div>
        <p className={styles.name}>user_123</p>
      </div>

      <div className={styles.messageContainer}>
        <MessageContainer messageList={messageList} user={nickname} />
      </div>

      <form onSubmit={sendMessage}>
        <div className={styles.messageInput}>
          <div className={styles.add}>
            <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
            <label className={styles.addIcon} htmlFor="fileInput">
              <img src="../../../public/add.svg" alt="" />
            </label>
          </div>

          <input className={styles.typeMessage} type="text" value={message} onChange={(event) => setMessage(event.target.value)}></input>
        </div>
      </form>
      {/* <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}></InputField> */}
    </>
  );
}
