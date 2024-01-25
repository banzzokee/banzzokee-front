import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src="../../../public/Logo.png"></img>
        <form className={styles.login} action="">
          <div className={styles.loginInput}>
            <input className={styles.input} type="text" placeholder="이메일" />
            <input className={styles.input} type="password" placeholder="비밀번호" />
          </div>
          <div className={styles.loginButton} onClick={'dothis'}>
            로그인
          </div>
          <div className={styles.text}>
            아직 회원이 아니신가요?
            <Link>
              <span>회원가입</span>
            </Link>
          </div>
        </form>
        <div className={styles.orLines}>
          <div className={styles.line}></div>
          <div>or</div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.loginButton} onClick={'dothis'} style={{ fontSize: '16px' }}>
          <img className={styles.googleLogo} src="../../../public/google.svg" alt="로고" />
          Google 계정으로 로그인
        </div>
      </div>
    </>
  );
}
