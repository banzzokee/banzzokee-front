import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './tags';
export default function ArticleList({sortBy}) {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    try {
      // const resp = await axios.get('http://localhost:3001/adoption');

      // setArticleList(resp.data);
      // console.log(resp.data);
      const config = {
        method: 'get',
        url:`https://server.banzzokee.homes/api/adoptions?page=0&size=10&direction=${sortBy}`,
      };
      const response = await axios.request(config);
      console.log(response.data.content);
      setArticleList(response.data.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const healthChecked = (adoption) => {
    if (!adoption.healthChecked == true) {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Medical.png"></img>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const gender = (adoption) => {
    if (adoption.gender == '수컷') {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Male.svg"></img>
        </div>
      );
    } else {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Female.svg"></img>
        </div>
      );
    }
  };
  useEffect(() => {
    getArticleList({ sortBy });
  }, [sortBy]);

  return (
    <div className={styles.listBox}>
      <ul>
        {articleList &&
          articleList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  <img src="../../../public/dog.webp" alt="" />
                  <div className={styles.status}>{adoption.status}</div>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.user}>
                    <div className={styles.name}>{adoption.userNickname}</div>
                    <div className={styles.date}>{adoption.createdAt}</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  <div className={styles.tags}>
                    <div className={styles.tag}>{adoption.breed}</div>
                    <div className={styles.tag}>{adoption.size}</div>
                    {/* <div className={styles.tag}>{adoption.healthChecked}</div> */}
                    {/* {healthChecked(adoption.healthChecked)} */}
                    {/* {gender(adoption.healthChecked)} */}
                    <Tags adoption={adoption}></Tags>
                    {/* <div className={styles.tag}>{adoption.gender}</div> */}
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
