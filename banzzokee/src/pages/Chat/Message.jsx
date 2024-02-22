import styles from './Message.module.css';
import Back from '../../components/common/back/Back';
import MessageContainer from './MessageContainer';
import InputField from './InputField';
// import socket from './server';
import axios from 'axios';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Message() {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState();
  const { nickname } = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : 'unknown';
  const [chatMessages, setChatMessages] = useState([]);
  const [hasRoom, setHasRoom] = useState(true);
  //stomp 메세지 socket
  const location = useLocation();
  const stompClient = useRef({});

  const path = location.pathname;

  const gameId = path.split('/')[2];
  const checkRoom = async () => {
    try {
      console.log('try enter Chat room');
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/rooms?page=0&size=10`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('enterChat checkRoom response::', response.data);
      const rooms = response.data.content;
      let changeHasroom = true;
      for (let i = 0; i < rooms.length; i++) {
        console.log('comparing room id', rooms[i]);
        if (rooms[i].adoption.adoptionId == id) {
          changeHasroom = false;
          console.log('set hasroom: true, do not create new room');
          break;
        }
      }
      if (changeHasroom) {
        setHasRoom(false);
      }
      // const response = await axios.get('http://localhost:3001/adoption');
      // setArticleList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    checkRoom();
  }, []);

  useEffect(() => {
    if (!hasRoom) {
      createRoom();
    }
  }, [hasRoom]);

  const createRoom = async () => {
    try {
      console.log('try connecting Chat POST');
      const config = {
        method: 'post',
        url: `https://server.banzzokee.homes/api/rooms/adoptions/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('createRoom::', response.data);
      // const response = await axios.get('http://localhost:3001/adoption');
      // setArticleList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect(() => {
  //   const sockJs = new SockJs(`/ws-stomp`);

  //   stompClient.current = Stomp.over(sockJs);

  //   stompClient.current.connect({}, () => {
  //     stompClient.current.subscribe(`/sub/chat/room/${gameId}`, (chat) => {
  //       const content = JSON.parse(chat.body);

  //       const { message } = content;
  //       const { name } = content;
  //       const { writer } = content;
  //       const { enter } = content;

  //       setChatMessages((chatMessages) => [
  //         ...chatMessages,
  //         {
  //           message,
  //           name,
  //           writer,
  //           enter,
  //         },
  //       ]);
  //     });

  //     stompClient.current.send(
  //       '/pub/chat/enter',
  //       {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       JSON.stringify({ roomId: gameId, writer: nickname })
  //     );
  //   });

  //   return () => {
  //     if (stompClient.current.connected) {
  //       stompClient.current.disconnect(() => {
  //         stompClient.current.connected = false;
  //       });
  //     }
  //   };
  // }, []);

  // const publish = (message) => {
  //   if (!stompClient.current.connected) {
  //     return;
  //   }
  //   stompClient.current.send(
  //     '/pub/chat/message',
  //     { Authorization: `Bearer ${accessToken}` },
  //     JSON.stringify({
  //       roomId: gameId,
  //       writer: nickname,
  //       message,
  //     })
  //   );
  //   setMessage('');
  // };

  // const publishMessage = (message) => {
  //   publish(message);
  // };

  // const messageChange = (value) => {
  //   setMessage(value);
  // };

  //stomp 메세지 socket 끝

  useEffect(() => {
    // socket.on('message', (message) => {
    //   console.log('res', message);
    //   setMessageList((prevState) => prevState.concat(message));
    // });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // socket.emit('sendMessage', message, (res) => {
    //   console.log('sendMessage res', res);
    // });
  };
  // useEffect(() => {
  //   const getList = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/chats`);
  //       const data = response.data;
  //       setMessageList(data);
  //       // console.log(messageList);
  //       // console.log(nickname);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getList();
  // }, []);
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
