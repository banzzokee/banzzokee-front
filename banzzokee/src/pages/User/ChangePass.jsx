import Button from '../../components/Button';
import styles from './ChangePass.module.css';

import BackHeader from '../../BackHeader';

export default function ChangePass() {
  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <p className={styles.title}>비밀번호 변경</p>
        <form action="">
          <p>현재 비밀번호</p>
          <input type="password"></input>
          <p>새로운 비밀번호</p>
          <input type="password"></input>
          <p>새로운 비밀번호 확인</p>
          <input type="password"></input>
          <Button style={{ width: '100%', height: '50px', marginTop: '20px' }}>비밀번호 변경</Button>
        </form>
      </div>
    </>
  );
}
