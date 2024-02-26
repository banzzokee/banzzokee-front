import styles from './SettingPage.module.css';
import { Link } from 'react-router-dom';

import SettingHeader from '../../components/common/header/SettingHeader';
import React, { useState } from 'react';

export default function SettingPage() {
  const [chatNotification, setChatNotification] = useState(true);
  const [interestPostNotification, setInterestPostNotification] = useState(true);
  const [reviewPostNotification, setReviewPostNotification] = useState(true);
  const [followShelterNotification, setFollowShelterNotification] = useState(true);
  const logout = () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('accessToken');
    document.location.href = '/';
  };

  return (
    <>
      <SettingHeader style={{ backgroundColor: '#e1e1e1' }}></SettingHeader>
      <div className={styles.container}>
        <div className={styles.eachSetting}>
          <p className={styles.title}>디스플레이 설정</p>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>라이트 / 다크 모드</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
        </div>
        <div className={styles.eachSetting}>
          <p className={styles.title}>보호소 등록</p>
          <Link to="/ShelterRegisterPage">
            <p className={styles.option}>보호소 등록 요청</p>
          </Link>
          <Link to="/ShelterEditPage">
            <p className={styles.option}>보호소 정보 수정/삭제</p>
          </Link>
        </div>
        <div className={styles.eachSetting}>
          <p className={styles.title}>계정 설정</p>
          <Link to="/AccountInfoPage">
            <p className={styles.option}>계정 정보 조회</p>
          </Link>
          <Link to="/DeleteAccount">
            <p className={styles.option}>계정 삭제</p>
          </Link>
          <Link to="/ChangePass">
            <p className={styles.option}>비밀번호 변경</p>
          </Link>
        </div>
        <button className={styles.logout} onClick={logout}>
          로그아웃
        </button>
      </div>
    </>
  );
}
