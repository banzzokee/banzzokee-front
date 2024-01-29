import React, { useState } from "react";
import Back from "../../components/common/back/Back";
import styles from './GoogleRegister.module.css'
import BackHeader from "../../components/common/header/BackHeader";

export default function GoogleRegister() {
  const [nickname, setNickname] = useState("");
  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === "nickname") {
      setNickname(value)
    }  
  }

  return (
    <>
      <BackHeader/>
      <div className={styles.google_page}>
        <div className={styles.back}>
        </div>
        <div className={styles.GoogleRegister}>
          <h2>회원가입</h2>
          <form className={styles.container}>
            <label>닉네임</label>
            <input type="text" name="nickname" value={nickname} onChange={onChange}  />
            <button type="submit" id="confirmButton" className={styles.confirmButton}>중복확인</button>
          </form>
          <button type="submit" id="registerButton" className={styles.registerButton}>가입하기</button>
        </div>
      </div>
    </>
  )
}  