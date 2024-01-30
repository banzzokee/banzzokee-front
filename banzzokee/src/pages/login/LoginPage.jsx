import BackHeader from '../../components/common/header/BackHeader';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function LoginPage() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  // const onChange = (e) => {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   if (name === 'email') {
  //     setEmail(value);
  //   } else if (name === 'password') {
  //     setPassword(value);
  //   }
  // };
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('login form submitted!');
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    // return response
  };
  const putData = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/users', inputValue);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // return response
  };
  return (
    <>
      <BackHeader />
      <div className={styles.container}>
        <img className={styles.logo} src="../../../public/Logo.svg"></img>
        <form className={styles.login} action="" onSubmit={onSubmit}>
          <div className={styles.loginInput}>
            <input className={styles.input} type="email" placeholder="이메일" name="email" onChange={onChange} />
            <input className={styles.input} type="password" placeholder="비밀번호" name="password" onChange={onChange} />
          </div>
          <button className={styles.loginButton} type="submit" onClick={putData}>
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
        <div className={styles.loginButton} onClick={getData} style={{ fontSize: '16px' }}>
          <img className={styles.googleLogo} src="../../../public/google.svg" alt="로고" />
          Google 계정으로 로그인
        </div>
      </div>
    </>
  );
}











