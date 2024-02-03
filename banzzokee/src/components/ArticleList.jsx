import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);

  const getArticleList = async () => {
    try {
      const resp = await axios.get('http://localhost:3001/adoption');
      setArticleList(resp.data);
      console.log(resp.data);
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
              <Link to={`/ArticleList/${adoption.id}`}>{adoption.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
