import React, { useState } from 'react';
import styles from './Register.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registerr() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordconfirm: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    passwordconfirm: null,
    nickname: null,
  });

  const [verify, setVerify] = useState({});
  const navigate = useNavigate();

  // const [nicknameCheckResult, setNicknameCheckResult] = useState(null);

  const submitVerification = async (e) => {
    setVerify({
      email: `${inputValue.email}`,
      code: `${verify}`,
    });
    e.preventDefault();
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://server.banzzokee.homes/api/auth/verify`,
        data: verify,
      };
      await axios.request(config).then((response) => {
        alert('인증완료');
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const sendEmailVerification = async (e) => {
    e.preventDefault();

    try {
      const inputdata = { email: `${inputValue.email}` };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/auth/send-verify',
        headers: {},
        data: inputdata,
      };
      const response = await axios.request(config);
      if (response.data.success) {
        alert('이메일 인증 메일이 전송되었습니다.');
      } else {
        alert('이메일 인증 메일 전송에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const doSignUp = async (e) => {
    e.preventDefault();

    console.log('inputValue:', inputValue);
    try {
      console.log('inputValue:signup', inputValue);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/auth/sign-up',
        headers: { 'Content-Type': 'application/json' },
        data: inputValue,
      };
      await axios.request(config);

      navigate('/LoginPage');
    } catch (error) {
      setErrors({ ...errors, error: '이미 존재하는 이메일입니다dd.' });
      console.error(error);
    }
  };

  return (
    <>
      <BackHeader />
      <div className={styles.register_Page}>
        <h2 className={styles.registerTitle}>회원가입</h2>
        <form className={styles.container} onSubmit={doSignUp}>
          {/* <div className={styles.infoContainer}>
            <h4 className={styles.info}>기본정보</h4>
          </div> */}
          <div className={styles.inputGroup}>
            <div>
              <label>이메일</label>
              <input type="text" name="email" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.email}</div>
            </div>
            <button type="button" id="emailconfirmButton" onClick={sendEmailVerification} className={styles.emailconfirm_Button}>
              인증요청
            </button>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label>인증코드</label>
              <input type="text" name="code" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.email}</div>
            </div>
            <button type="button" id="emailconfirmButton" onClick={submitVerification} className={styles.emailconfirm_Button}>
              인증하기
            </button>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label>비밀번호</label>
              <input type="password" name="password" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.password}</div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label>비밀번호 확인</label>
              <input type="password" name="confirmPassword" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.passwordconfirm}</div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label>닉네임</label>
              <input type="text" name="nickname" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.nickname}</div>
            </div>
            {/* <button type="button" id="confirmButton" className={styles.confirmButton}>
              중복확인
            </button> */}
          </div>
          <div className={styles.errorMessage}>{errors.error}</div>
          <button type="submit" id="registerButton" className={styles.registerButton}>
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}

// "dev": "concurrently \"npm run server\" \"npm run react-vite\"",
// "build": "vite build",
// "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
// "preview": "vite preview",
// "server": "npx json-server db.json --port 3001 -r routes.json",
// "react-vite": "vite dev"

// "dev": "npm run react-vite",
// "build": "vite build",
// "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
// "preview": "vite preview",
// "server": "npx json-server db.json --port 3001 -r routes.json",
// "react-vite": "vite dev"

// 'Content-Type': 'application/json',
// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 'Access-Control-Allow-Credentials': 'true',
// 'Access-Control-Allow-Headers': 'content-type',
