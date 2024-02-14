import styles from './FollowingPage.module.css';

import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FollowCard from './FollowCard';

export default function FollowingPage() {
  const defaultPhoto = <img style={{ width: '20px', height: 'auto' }} src="../../../public/User.png"></img>;
  const [list, setList] = useState([]);

  const getList = async (e) => {
    // e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:3001/users/APmgnc1/`);
      setList(data.followers);
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
        <div className={styles.listBox}>{list && list.map((follower) => <FollowCard key={follower.id} follower={follower} list={list} setList={setList} />)}</div>
      </div>

      <Nav></Nav>
    </>
  );
}
