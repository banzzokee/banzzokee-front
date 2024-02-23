import styles from './Message.module.css';
import Back from '../../components/common/back/Back';
import MessageContainer from './MessageContainer';
import InputField from './InputField';
// import socket from './server';
import axios from 'axios';
import * as SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import { Client } from '@stomp/stompjs';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MessageList from '../../components/MessageList';
import { useNavigate } from 'react-router-dom';
export default function Message() {
  const navigate = useNavigate();
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const myInfo = JSON.parse(sessionStorage.getItem('myInfo'));
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState();
  const { nickname } = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : 'unknown';
  const [chatMessages, setChatMessages] = useState([]);
  const [hasRoom, setHasRoom] = useState(true);
  const [roomInfo, setRoomInfo] = useState({});
  const location = useLocation();
  // const client = useRef({});

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
      // console.log('enterChat checkRoom response::', response.data);
      const rooms = response.data.content;
      let changeHasroom = true;

      // 채팅방 목록에 현제 게시글에서 연결된 방이 개설된곳이 있는지 확인
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].adoption.adoptionId == id) {
          changeHasroom = false;
          setRoomInfo(rooms[i]);
          console.log('do not create new room');
          break;
        }
      }
      if (changeHasroom) {
        setHasRoom(false);
      }
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
      console.log('createRoom');
      const config = {
        method: 'post',
        url: `https://server.banzzokee.homes/api/rooms/adoptions/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('createRoom::', response.data);
      setRoomInfo(response.data);
      // const response = await axios.get('http://localhost:3001/adoption');
      // setArticleList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [stompClient, setStompClient] = useState();
  const [messages, setMessages] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const stomp = new Client({
          brokerURL: 'wss://server.banzzokee.homes/ws-stomp',
          connectHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
          // reconnectDelay: 10000, //자동 재 연결
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });
        setStompClient(stomp);

        stomp.activate();

        stomp.onConnect = () => {
          console.log('WebSocket 연결이 열렸습니다.');
          const subscriptionDestination = `/topic/chats.rooms.${roomInfo.roomId}`;

          stomp.subscribe(subscriptionDestination, (frame) => {
            try {
              console.log('subscribe');
              const parsedMessage = JSON.parse(frame.body);

              console.log('parsedMessage', parsedMessage);
              setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            } catch (error) {
              console.error('오류가 발생했습니다:', error);
            }
          });
        };
      } catch (error) {
        console.error('채팅 룸 생성 중 오류가 발생했습니다:', error);
      }
    };

    // 채팅 초기설정
    initializeChat();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [roomInfo]);

  const sendMessage = () => {
    // 메시지 전송
    if (stompClient && stompClient.connected) {
      const destination = `/api/chats/rooms/${roomInfo.roomId}`;

      stompClient.publish({
        destination,
        body: JSON.stringify({
          message: `${inputMessage}`,
          messageType: 'TEXT',
        }),
      });
    }
    console.log('roomInfo', roomInfo);
    console.log('sendmessage', inputMessage);

    setMessage('');
  };
  const onLeaveRoom = async () => {
    try {
      console.log('deleteRoom');
      const config = {
        method: 'delete',
        url: `https://server.banzzokee.homes/api/rooms/${roomInfo.roomId}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('createRoom::', response.data);
      setRoomInfo(response.data);

      //unsubscribe
      console.log('WebSocket 연결을 취소합니다 unsubscribe.');

      const stomp = new Client({
        brokerURL: 'wss://server.banzzokee.homes/ws-stomp',
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        // reconnectDelay: 10000, //자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stomp.unsubscribe(roomInfo.roomId, {});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onclickBack = () => {
    console.log('back!!');
    navigate(`/ChatListPage`);
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
  //   };]
  //   getList();
  // }, []);
  return (
    <>
      <div className={styles.Header}>
        <div onClick={onclickBack} className={styles.back}>
          {/* <Back></Back> */}
          <img src="/Arrow.png" alt="Arrow" className={styles.arrow} />
        </div>
        <div className={styles.headerFeature}>
          <div className={styles.name}>roomInfo</div>
          <div className={styles.leaveRoom} onClick={onLeaveRoom}>
            나가기
          </div>
        </div>
      </div>

      <div className={styles.messageContainer}>
        {/* <MessageContainer messageList={messageList} user={nickname} /> */}
        <MessageList roomId={roomInfo.roomId}></MessageList>
        {messages &&
          messages.map((message) => (
            <div key={message.chatId} className={styles.messageContainer}>
              {message.messageType === 'EXIT' ? (
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
      </div>

      <form onSubmit={sendMessage}>
        <div className={styles.messageInput}>
          <div className={styles.add}>
            <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
            <label className={styles.addIcon} htmlFor="fileInput">
              <img src="../../../public/add.svg" alt="" />
            </label>
          </div>
          <div className={styles.typeMessage}>
            <input className={styles.textbox} type="text" value={message} onChange={(e) => setInputMessage(e.target.value)}></input>
            <div className={styles.sendButton} onClick={sendMessage}>
              <img src="../../public/message.png"></img>
            </div>
          </div>
        </div>
      </form>
      {/* <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}></InputField> */}
    </>
  );
}