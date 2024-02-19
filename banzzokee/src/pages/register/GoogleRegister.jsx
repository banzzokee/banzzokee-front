import React, { useState } from "react";
import styles from './GoogleRegister.module.css'
import BackHeader from "../../components/common/header/BackHeader";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function GoogleRegister() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [nickname, setNickname] = useState("");
  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === "nickname") {
      setNickname(value)
    }  
  }

  const doGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      const inputdata = { nickname: nickname };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.banzzokee.homes/api/oauth2/sign-up',
        headers: {},
        data: inputdata,
      };
      const response = await axios.request(config);
      setCookie('accessToken', response.data['accessToken'], { path: '/', secure: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackHeader/>
      <div className={styles.google_page}>
        <div className={styles.GoogleRegister}>
          <h2>회원가입</h2>
          <form className={styles.container} onSubmit={doGoogleSignUp}>
            <label>닉네임</label>
            <input type="text" name="nickname" value={nickname} onChange={onChange} maxLength='10' />
            <button type="submit" id="registerButton" className={styles.registerButton}>가입하기</button>
          </form>
        </div>
      </div>
    </>
  );
}





