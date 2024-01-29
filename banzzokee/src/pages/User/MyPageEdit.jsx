import styles from './MyPageEdit.module.css';

export default function MyPageEdit() {
  return (
    <>
      <div className={styles.container}>
        <form className={styles.login} action="">
          <div className={styles.loginInput}>
            <input className={styles.input} type="text" placeholder="이메일" />
            <input className={styles.input} type="password" placeholder="비밀번호" />
          </div>
          <div className={styles.loginButton} onClick={'dothis'}>
            로그인
          </div>
          <div className={styles.text}>아직 회원이 아니신가요?</div>
        </form>

        <div className={styles.loginButton} onClick={'dothis'} style={{ fontSize: '16px' }}>
          <img className={styles.googleLogo} src="../../../public/google.svg" alt="로고" />
          Google 계정으로 로그인
        </div>
      </div>
    </>
  );
}
