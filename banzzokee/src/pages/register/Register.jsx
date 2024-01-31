import React, { useState } from "react";
import styles from './Register.module.css'
import BackHeader from "../../components/common/header/BackHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Register() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordconfirm: '',
    nickname: ''
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    passwordconfirm: null,
    nickname: null,
  });

  // const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies()

  // const [nicknameCheckResult, setNicknameCheckResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // const checkNickname = async () => {
  //   try {
  //     const nicknameCheckResponse = await axios.post(
  //       'http://localhost:3001/checkNickname',
  //       { nickname: inputValue.nickname }
  //     );

  //     setNicknameCheckResult(nicknameCheckResponse.data);

  //     if (nicknameCheckResponse.data.available === false) {
  //       setErrors({ ...errors, nickname: "이미 사용 중인 닉네임입니다." });
  //     } else {
  //       setErrors({ ...errors, nickname: null });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const doSignUp = async (e) => {
    e.preventDefault()
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!emailRegex.test(inputValue.email)) {
        setErrors({ ...errors, email: "올바른 이메일 형식이 아닙니다." });
        return;
      } else {
        setErrors({ ...errors, email: null });
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
      if (!passwordRegex.test(inputValue.password)) {
        setErrors({ ...errors, password: "비밀번호는 숫자, 영어 대소문자, 특수기호를 모두 사용하고 8자 이상이어야 합니다." });
        return;
      } else {
        setErrors({ ...errors, password: null });
      }

      if (inputValue.password !== inputValue.passwordconfirm) {
        setErrors({ ...errors, passwordconfirm: "비밀번호가 일치하지 않습니다." });
        return;
      } else {
        setErrors({ ...errors, passwordconfirm: null });
      }

      // await checkNickname();
     

      const { data } = await axios.post(
        'http://localhost:3001/register',
        inputValue,
      );

      setCookie('accessToken', data['accessToken'], { path: '/' })
      // navigate("/LoginPage");
      console.log(data);
    } catch (error) {
      setErrors({ ...errors, email: "이미 존재하는 이메일입니다." });
      console.error(error);
    }
  };

  return (
    <>
      <BackHeader />
      <div className={styles.register_Page}>
        <h2 className={styles.registerTitle}>회원가입</h2>
        <form className={styles.container} onSubmit={doSignUp}>
          <div className={styles.infoContainer}>
            <h4 className={styles.info}>기본정보</h4>
          </div>  
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <div>
              <input type="text" name="email" value={inputValue.email} onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>
                {errors.email}
              </div>
            </div>
            <button type="submit" id="emailconfirmButton" className={styles.emailconfirm_Button}>인증하기</button>
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <div>
              <input type="password" name="password" value={inputValue.password} onChange={onChange} className={styles.input} />
              <div className={styles.errorMessage}>
                {errors.password}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호 확인</label>
            <div>
              <input type="password" name="passwordconfirm" value={inputValue.passwordconfirm} onChange={onChange} className={styles.input}  />
              <div className={styles.errorMessage}>
                {errors.passwordconfirm}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <div>
              <input type="text" name="nickname" value={inputValue.nickname} onChange={onChange} className={styles.input}  />
              <button type="button" id="confirmButton"  className={styles.confirmButton}>
                중복확인
              </button>
              <div className={styles.errorMessage}>
                {errors.nickname}
              </div>
            </div>
          </div>
          <button type="submit" id="registerButton" onClick={doSignUp} className={styles.registerButton}>가입하기</button>
        </form>
      </div>
    </>
  );
}
