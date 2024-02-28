import React, { useEffect } from 'react';
import styles from './FollowCard.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FollowCard = ({ follower, userId }) => {
  const [follow, setFollow] = useState(true);
  const [otherInfo, setOtherInfo] = useState();
  // const [updatedList, setUpdatedList] = useState(list);
  const navigate = useNavigate();
  //newList is for JSON-SERVER local
  // const newList = updatedList.filter((user) => user.userId !== follower.userId);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  useEffect(() => {
    const getInfo = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/users/${userId}`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log('userId get', response.data);
        setOtherInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInfo();
  }, []);
  const onClick = async (event) => {
    event.preventDefault();
    if (!follow) {
      try {
        // axios.patch(`http://localhost:3001/users/APmgnc1`, { followers: list });
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/users/${userId}/follow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
      setFollow(!follow);
    } else {
      try {
        // axios.patch(`http://localhost:3001/users/APmgnc1`, { followers: newList });
        const config = {
          method: 'post',
          url: `https://server.banzzokee.homes/api/users/${userId}/unfollow`,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
      setFollow(!follow);
    }
  };
  const onclickName = async () => {
    navigate(`/OtherMyPage/${userId}`, { state: otherInfo });
  };
  return (
    <>
      <div className={styles.follower}>
        <div onClick={onclickName} key={userId}>
          <div className={styles.followerInfo}>
            <div className={styles.userImage}>
              <img src={otherInfo?.profileImgUrl}></img>
            </div>
            <div className={styles.userName}>{follower}</div>
            <div></div>
          </div>
        </div>

        <button className={styles.followButton} style={{ backgroundColor: follow ? '#bebebe' : '#9aaee057' }} onClick={onClick}>
          {follow ? '팔로잉' : '팔로우'}
        </button>
      </div>
    </>
  );
};

export default FollowCard;
