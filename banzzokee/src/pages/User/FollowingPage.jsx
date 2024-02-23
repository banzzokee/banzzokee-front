import styles from './FollowingPage.module.css';

import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FollowCard from './FollowCard';

export default function FollowingPage() {
  const [list, setList] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const getList = async () => {
    try {
      const config = {
        method: 'get',
        url: 'https://server.banzzokee.homes/api/users/me/followers',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);
      setList(response.data.content);
      console.log('list set', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <div className={styles.followTitle}></div>
        <div className={styles.listBox}>{list && list.map((follower) => <FollowCard key={follower.id} follower={follower} list={list} />)}</div>
      </div>

      <Nav></Nav>
    </>
  );
}
