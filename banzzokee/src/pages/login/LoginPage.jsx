import BackHeader from '../../components/common/header/BackHeader';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import GoogleLoginButton from '../register/GoogleLoginButton';
import MyPage from '../User/MyPage';
export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // const [cookies, setCookie, removeCookie] = useCookies();

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3001/login', inputValue);

      // setCookie('accessToken', data['accessToken'], { path: '/' });
      sessionStorage.setItem('userInfo', JSON.stringify(data.user));
      sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      document.location.href = '/MyPage';
    } catch (error) {
      console.log(error);
    }
  };
  if (sessionStorage.getItem('accessToken') == null) {
    return (
      <>
        <BackHeader />
        <div className={styles.container}>
          <img className={styles.logo} src="../../../public/Logo.svg"></img>
          <form className={styles.login} action="" onSubmit={onLogin}>
            <div className={styles.loginInput}>
              <input className={styles.input} type="email" placeholder="이메일" name="email" onChange={onChange} />
              <input className={styles.input} type="password" placeholder="비밀번호" name="password" onChange={onChange} />
            </div>
            <button className={styles.loginButton} type="submit">
              로그인
            </button>
            <div className={styles.text}>
              아직 회원이 아니신가요?
              <Link to="/Register">
                <span>회원가입</span>
              </Link>
            </div>
          </form>
          <div className={styles.orLines}>
            <div className={styles.line}></div>
            <div>or</div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.loginButton} style={{ fontSize: '16px' }}>
            <GoogleLoginButton style={{ backgroundColor: 'black' }} />
            {/* <img className={styles.googleLogo} src="../../../public/google.svg" alt="로고" />
          Google 계정으로 로그인 */}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <MyPage></MyPage>
      </>
    );
  }
}
