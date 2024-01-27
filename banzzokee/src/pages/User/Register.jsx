import React, { useState } from "react";
import styles from './Register.module.css'
import { Link } from "react-router-dom";
import Back from "../../Back";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "passwordconfirm") {
      setPasswordconfirm(value)
    } else if (name === "nickname") {
      setNickname(value)
    }
  }
  
  return (
      <div className={styles.register_Page}>
        <Back/>
        <h2 className={styles.registerTitle}>회원가입</h2>
        <form className={styles.container}>
          <div className={styles.infoContainer}>
            <h4 className={styles.info}>기본정보</h4>
          </div>  
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <div>
              <input type="email" name="email" value={email} onChange={onChange} />
              <div className={styles.errorMessage}>
                올바른 이메일을 입력해 주세요.
              </div>
            </div>
            <button type="submit" id="emailconfirmButton" className={styles.emailconfirm_Button}>인증하기</button>
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <div>
              <input type="password" name="password" value={password} onChange={onChange} />
              <div className={styles.errorMessage}>
                {/* 숫자, 영어 대소문자, 특수기호를 포함한 8자 이상의 비밀번호를 입력해주세요. */}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호 확인</label>
            <div>
              <input type="password" name="passwordconfirm" value={passwordconfirm} onChange={onChange}  />
              <div className={styles.errorMessage}>
                비밀번호가 일치하지 않습니다.
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <div>
              <input type="text" name="nickname" value={nickname} onChange={onChange}  />
              <div className={styles.errorMessage}>
                이미 사용 중인 닉네임입니다.
              </div>
            </div>
            <button type="submit" id="confirmButton" className={styles.confirmButton}>중복확인</button>
          </div>
          <button type="submit" id="registerButton" className={styles.registerButton}>가입하기</button>
        </form>
      </div>
  )
}