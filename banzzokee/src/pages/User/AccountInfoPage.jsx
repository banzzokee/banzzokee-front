import styles from './SettingPage.module.css';

export default function MyPage() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>개인정보 조회</p>
        <p>이메일: </p>
        <p>가입일: </p>
      </div>
    </>
  );
}
