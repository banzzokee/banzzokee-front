import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';
import Tags from './tags';
export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    try {
      // const resp = await axios.get('http://localhost:3001/adoption');

      // setArticleList(resp.data);
      // console.log(resp.data);
      const config = {
        method: 'get',
        url: `https://server.banzzokee.homes/api/adoptions?page=0&size=10&direction=desc`,
      };
      const response = await axios.request(config);
      console.log(response.data.content);
      setArticleList(response.data.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <div className={styles.listBox}>
      <ul>
        {articleList &&
          articleList.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? <img src={adoption.imageUrls[0]}></img> : <img src="../../../public/dog.webp" alt="" />}

                  {adoption.status ? <div className={styles.status}>{adoption.status.value}</div> : <div className={styles.status}>loading</div>}
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.user}>
                    <div className={styles.name}>{adoption.userNickname}</div>
                    <div className={styles.date}>{adoption.createdAt}</div>
                  </div>
                  <div className={styles.title}>{adoption.title}</div>
                  <div className={styles.tags}>
                    {/* <div className={styles.tag}>{adoption.breed}</div> */}
                    {/* <div className={styles.tag}>{adoption.size}</div> */}
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
