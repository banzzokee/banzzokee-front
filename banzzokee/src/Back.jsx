import React from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './Back.module.css'

export default function Back() {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1); //이전 페이지로 이동
  }

  return(
      <img src="/Arrow.png" alt="Arrow" className={styles.arrow} onClick={onClickBtn} />
  )
}