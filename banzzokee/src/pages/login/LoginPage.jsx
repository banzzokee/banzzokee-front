import BackHeader from '../../components/common/header/BackHeader';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import MyPage from '../user/MyPage';
import Nav from '../../components/common/nav/Nav';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/button/Button';
import LoginCallback from '../register/LoginCallback';
import { useQuery } from 'react-query';
import { loginState } from '../../recoilState';

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

  const URL_MEMBER_SINGUP = 'http://server.banzzokee.homes/oauth2/authorization/google';

  const handleGoogleLogin = () => {
    window.location.href = URL_MEMBER_SINGUP;
  };
  const resultQuery = useQuery('@getUser', onLogin);
  console.log('resultQuery', resultQuery);

  if (sessionStorage.getItem('accessToken') == null) {
    return (
      <>
        <BackHeader />
        <div className={styles.container}>
          <div className={styles.logoFrame}>
            <img className={styles.logo} src="/Logo.svg"></img>
          </div>
          <div className={styles.loginMethod}>
            <form className={styles.login} action="" onSubmit={onLogin}>
              <div className={styles.loginInput}>
                <input className={styles.input} type="email" placeholder="이메일" name="email" onChange={onChange} />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="비밀번호"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <button className={styles.loginButton} type="submit" onClick={onLogin}>
                로그인
              </button>
            </form>
            <div className={styles.loginAndRegister}>
              <div className={styles.text}>
                아직 회원이 아니신가요?
                <Link to="/Register">
                  <span>회원가입</span>
                </Link>
              </div>
              <div className={styles.orLines}>
                <div className={styles.line}></div>
                <div className={styles.or}>or</div>
                <div className={styles.line}></div>
              </div>
              <button className={styles.googleLogin} onClick={handleGoogleLogin}>
                <img src="/google.svg"></img>
                구글 소셜 로그인
              </button>
            </div>
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
