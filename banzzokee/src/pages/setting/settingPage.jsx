import styles from './SettingPage.module.css';
import { Link } from 'react-router-dom';

import BackHeader from '../../components/common/header/BackHeader';

export default function MyPage() {
  const logout = () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('accessToken');
    document.location.href = '/';
  };
  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
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
            <p className={styles.settingTitle}>관심 게시물 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>후기 게시물 등록 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
          <div className={styles.eachOnOff}>
            <p className={styles.settingTitle}>팔로우 보호소 새로운 게시물 등록 알림</p>
            <div className={styles.onOffBox}>
              <div className={styles.onOffCircle}></div>
            </div>
          </div>
        </div>
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
