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
      console.log('ChatLists::', response.data);
      setRoomList(response.data.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    checkRooms();
  }, []);

  if (!userInfo) {
    alert('로그인 후 이용 가능한 서비스 입니다.');
    return (
      <>
        <ChatHeader></ChatHeader>
        <div className={styles.container}>
          <p>로그인을 해주세요</p>
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
            <Link to="/Message" key={room.roomId}>
              <div className={styles.message}>
                <div className={styles.userImage}>{/* <img src="/" alt="불러온 이미지" /> */}</div>
                <div className={styles.userContent}>
                  <div className={styles.userAndTime}>
                    <div className={styles.userName}>{room.adoption.nickname}</div>

                    <div className={styles.sendTime}>1시간 전</div>
                  </div>
                  <div className={styles.chatBody}> 대해 여쭤봅니다!</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Nav></Nav>
    </>
  );
}
