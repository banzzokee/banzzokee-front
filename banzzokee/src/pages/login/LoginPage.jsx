import BackHeader from '../../components/common/header/BackHeader';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import MyPage from '../User/MyPage.jsx';
import Nav from '../../components/common/nav/Nav';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/button/Button';
// import GoogleLoginButton from '../register/GoogleLoginButton';
import LoginCallback from '../register/LoginCallback';
export default function LoginPage() {
  const navigate = useNavigate();
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
      const inputdata = { email: `${inputValue.email}`, password: `${inputValue.password}` };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/auth/sign-in',
        headers: { 'Content-Type': `application/json` },
        data: inputdata,
      };
      const response = await axios.request(config);
      console.log(response);

      sessionStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      navigate('/MyPage');
    } catch (error) {
      console.log(error);
      alert('로그인 실패 아이디 또는 비밀번호를 재 확인하세요');
    }
  };

  const URL_MEMBER_SINGUP = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=679888049936-k5otspaavapavud961if59cjnstpb7rb.apps.googleusercontent.com&redirect_uri=https://server.banzzokee.homes/login/oauth2/code/google&response_type=code&scope=profile%20email';
  const handleGoogleLogin = () => {
    window.location.href = URL_MEMBER_SINGUP;
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
            <button className={styles.button__google__login} onClick={handleGoogleLogin}>
              구글 소셜 로그인
            </button>
            <LoginCallback />
          </div>
        </div>
        <Nav></Nav>
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
