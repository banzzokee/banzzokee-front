import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Back.module.css';

export default function SettingBack() {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate('/MyPage');
  };

  return <img src="/Arrow.png" alt="Arrow" className={styles.arrow} onClick={onClickBtn} />;
}
