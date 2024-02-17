import React, { useState } from 'react';
import styles from './Register.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Register() {
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

  const [number, setNumber] = useState('');
  const [mailnumber, setMailNumber] = useState(false);
  const [authDone, setAuthDone] = useState(false);
  const [authError, setAuthError] = useState(false);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const onChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const onCheckNumber = async (e) => {
    e.preventDefault();
    try {
      const verifyData = { email: `${inputValue.email}`, code: `${number}` };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/auth/verify',
        headers: {},
        data: number,
      };

      const response = await axios.request(config);

      if (response.status == 200) {
        setAuthDone(true);
        setAuthError(false);
        setMailNumber(false);
      } else {
        setAuthDone(false);
        setAuthError(true);
      }
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

  const doEmailVerification = async (e) => {
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

      if (response.status == 200) {
        alert('인증번호가 이메일로 전송되었습니다.');
        setMailNumber(true);
      } else {
        alert('이메일 인증 메일 전송에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkNickname = async (e) => {
    e.preventDefault();

    try {
      const inputdata = { nickname: `${inputValue.nickname}` };
      const config = {
        maxBodyLength: Infinity,
        url: `https://server.banzzokee.homes/api/auth/nickname-check?nickname=${inputdata.nickname}`,
        headers: {},
        data: inputdata,
      };
      const response = await axios.request(config);

      if (response.data) {
        if (response.data === true) {
          alert('사용 가능한 닉네임입니다.');
        } else {
          alert('이미 사용 중인 닉네임입니다.');
        }
      } else {
        alert('닉네임 확인에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const doSignUp = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue.email)) {
        setErrors({ ...errors, email: '올바른 이메일 형식이 아닙니다.' });
        return;
      } else {
        setErrors({ ...errors, email: null });
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
      if (!passwordRegex.test(inputValue.password)) {
        setErrors({ ...errors, password: '비밀번호는 숫자, 영어 대소문자, 특수기호를 모두 사용하고 8자 이상이어야 합니다.' });
        return;
      } else {
        setErrors({ ...errors, password: null });
      }

      if (inputValue.password !== inputValue.passwordconfirm) {
        setErrors({ ...errors, passwordconfirm: '비밀번호가 일치하지 않습니다.' });
        return;
      } else {
        setErrors({ ...errors, passwordconfirm: null });
      }

      const inputdata = { email: `${inputValue.email}`, password: `${inputValue.password}`, passwordconfirm: `${inputValue.passwordconfirm}` };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/auth/sign-in',
        headers: {},
        data: inputdata,
      };
      const response = await axios.request(config);

      setCookie('accessToken', response.data['accessToken'], { path: '/', secure: true });

      navigate('/LoginPage');
      console.log(response.data);
    } catch (error) {
      setErrors({ ...errors, error: '이미 존재하는 이메일입니다.' });
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
              {mailnumber ? (
                <p style={{ marginTop: 10, marginLeft: 20, width: 200 }} className={styles.numberVerify}>
                  <input placeholder="인증번호 입력" name="user-emailcheck" type="text" value={number} onChange={onChangeNumber} />
                  {/* <br /> */}
                  <button type="button" onClick={onCheckNumber} disabled={authDone} style={{ marginLeft: 20 }} className={styles.emailconfirm_Button}>
                    확인
                  </button>
                  {authDone && <div style={{ color: 'blue' }}>인증 완료되었습니다.</div>}
                  {authError && <div style={{ color: 'red' }}>인증번호가 일치하지 않습니다.</div>}
                </p>
              ) : null}
              <div className={styles.errorMessage}>{errors.email}</div>
            </div>
            <button type="button" id="emailconfirmButton" onClick={doEmailVerification} className={styles.emailconfirm_Button}>
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
              <input type="password" name="passwordconfirm" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.passwordconfirm}</div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label>닉네임</label>
              <input type="text" name="nickname" onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>{errors.nickname}</div>
            </div>
            {/* <button type="button" id="confirmButton" onClick={checkNickname} className={styles.confirmButton}>
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

// 'Content-Type': 'application/json',
// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 'Access-Control-Allow-Credentials': 'true',
// 'Access-Control-Allow-Headers': 'content-type',

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
