import styles from './SettingPage.module.css';
export default function MyPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.eachSetting}>
          <p className={styles.title}>알림 설정</p>
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
          <p>계정 정보 조회</p>
          <p>비밀번호 변경</p>
          <p>계정 삭제</p>
        </div>
        <div className={styles.logOut}>로그아웃</div>
      </div>
    </>
  );
}
