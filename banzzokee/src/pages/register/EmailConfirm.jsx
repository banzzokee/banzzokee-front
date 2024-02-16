import styles from './EmailConfirm.module.css';
import axios from 'axios';
import Back from '../../components/common/back/Back';
import { useState } from 'react';
export default function EmailConfirm() {
  const [verify, setVerify] = useState({});

  setVerify({
    email: 'heejun1219@naver.com',
    code: '',
  });

  const onVerify = async (e) => {
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
  return (
    <form onSubmit={onVerify}>
      <div className={styles.emailConfirm}>
        <div className={styles.back}>
          <Back />
        </div>
        <div className={styles.container}>
          <p className={styles.bold}>이메일 인증하기</p>
          <p>아래의 이메일 주소로 인증 메일이 발송되었습니다.</p>
          <div className={styles.body}>
            <p>banzzokee@naver.com</p>
            <div className={styles.validTime}>
              <span>유효시간 3:00</span>
              <input type="text" name="verify" onChange={onChange} className={styles.input} />
              <button className={styles.resendButton}>재발송</button>
            </div>
          </div>
          <button className={styles.completionButton} type="submit">
            인증완료
          </button>
        </div>
      </div>
    </form>
  );
}
