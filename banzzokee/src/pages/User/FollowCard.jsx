import React from 'react';
import styles from './FollowCard.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FollowCard = ({ follower, list, setList }) => {
  const [follow, setFollow] = useState(true);

  const onClick = async (event) => {
    event.preventDefault();
    if (!follow) {
      const newFollower = { userid: follower.userId, nickname: follower.nickname };
      setList([...list, newFollower]);
      console.log(list);
      try {
        console.log(list);
        axios.patch(`http://localhost:3001/users/APmgnc1/`, { followers: list });
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      const updatedList = list.filter((user) => user.userId !== follower.userId);
      console.log('update', updatedList);
      setList(updatedList);

      try {
        axios.patch(`http://localhost:3001/users/APmgnc1`, { followers: updatedList });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setFollow(!follow);
  };
  return (
    <>
      <div className={styles.follower}>
        <Link to={`/OtherMyPage/${follower.userId}`} key={follower.userId}>
          <div className={styles.followerInfo}>
            <div className={styles.userImage}></div>
            <div className={styles.userName}>{follower.nickname}</div>
            <div></div>
          </div>
        </Link>
        <div>
          <button className={styles.followButton} style={{ backgroundColor: follow ? '#bebebe' : '#add8e6' }} onClick={onClick}>
            {follow ? '팔로잉' : '팔로우'}
          </button>
        </div>
      </div>
    </>
  );
};

export default FollowCard;
