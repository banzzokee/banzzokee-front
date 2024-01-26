import Button from '../../components/Button';
import styles from './SettingPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function MyPage() {
  const [button1Color, setButton1Color] = useState('#bebebe');
  const [button2Color, setButton2Color] = useState('#b7e017');
  let flag = 1;
  const handleButtonClick = (buttonNumber) => {
    // Swap colors when either button is clicked
    if (buttonNumber === 1) {
      setButton1Color('#bebebe');
      setButton2Color('#b7e017');
      flag = 2;
    } else {
      setButton1Color('#b7e017');
      setButton2Color('#bebebe');
      flag = 1;
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.eachSetting}>
          <p className={styles.title}>알림 설정</p>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>채팅 알림</p>
            <div style={{ backgroundColor: button1Color }} onClick={() => handleButtonClick(flag)} className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>채팅 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>채팅 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>채팅 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
        </div>
        <div className={styles.eachSetting}>
          <p className={styles.title}>디스플레이 설정</p>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>채팅 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
        </div>
        <div className={styles.eachSetting}>
          <p className={styles.title}>보호소 등록</p>
          <p>보호소 등록 요청</p>
          <p>보호소 정보 수정</p>
        </div>
        <div className={styles.eachSetting}>
          <p className={styles.title}>계정 설정</p>
          <Link to="/AccountInfoPage">
            <p>계정 정보 조회</p>
          </Link>
          <p>비밀번호 변경</p>
          <p>계정 삭제</p>
        </div>
        <div className={styles.logOut}>
          <Button style={{ width: '100%' }}>로그아웃</Button>
        </div>
      </div>
    </>
  );
}
