import styles from './ChatListPage.module.css';
import { Link } from 'react-router-dom';
import ChatHeader from '../../components/common/header/ChatHeader.jsx';
import axios from 'axios';
import Nav from '../../components/common/nav/Nav.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
export default function ChatListPage() {
  const userInfo = JSON.parse(sessionStorage.getItem('accessToken'));
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [roomList, setRoomList] = useState([]);

  const checkRooms = async () => {
    try {
      console.log('try enter Chat room');
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/rooms?page=0&size=10`,
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const response = await axios.request(config);
      console.log('ChatLists::', response.data.content);
      setRoomList(response.data.content);
      // console.log('long::: ', response.data.content[0].adoption.adoptionId);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    checkRooms();
  }, []);

  if (!userInfo) {
    return (
      <>
        <ChatHeader></ChatHeader>
        <div className={styles.noLoginContainer}>
          <div className={styles.noLogin}>
            <div className={styles.logoBox}>
              <img src="/Logo.svg" alt="로고" className={styles.logo} />
            </div>
            <p>로그인을 해주세요</p>
          </div>
        </div>
        <Nav></Nav>
      </>
    );
  }
  return (
    <>
      <ChatHeader></ChatHeader>
      <div className={styles.container}>
        {roomList &&
          roomList.map((room) => (
            <Link to={`/Message/${room.adoption.adoptionId}`} key={room.roomId}>
              <div className={styles.message}>
                <div className={styles.userImage}>
                  <div className={styles.profileImage}>{room.shelter.user.profileImgUrl ? <img src={room.shelter.user.profileImgUrl} className={styles.profileImage} /> : <img src="../../public/user.png" className={styles.defaultProfileImage}></img>}</div>
                </div>
                <div className={styles.userContent}>
                  <div className={styles.userAndTime}>
                    <div className={styles.userName}>{room.user.nickname}</div>

                    <div className={styles.sendTime}>{room.lastMessageCreatedAt.substring(0, 10)}</div>
                  </div>
                  <div className={styles.chatBody}>{room.lastMessage}</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Nav></Nav>
    </>
  );
}
