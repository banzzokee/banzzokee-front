import styles from './EmailConfirm.module.css'
import Back from '../../Back'

export default function EmailConfirm () {
  return(
    <div className={styles.emailConfirm}>
      <div className={styles.back}>
        <Back />
      </div>
      <div className={styles.container}>
        <p>이메일 인증하기</p>
        <p>아래의 이메일 주소로 인증 메일이 발송되었습니다.</p>
        <div className={styles.body}>
          <p>banzzokee@naver.com</p>
          <div className={styles.validTime}>
            <span>유효시간 3:00</span>
            <button className={styles.resendButton}>재발송</button>
          </div>
        </div>
        <button className={styles.completionButton}>인증완료</button>
      </div>
    </div>
  )
}