import Button from '../../components/common/button/Button';
import styles from './DeleteAccount.module.css';

import BackHeader from '../../components/common/header/BackHeader';

export default function MyPage() {
  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <p>비밀번호를 입력하세요</p>
        <input type="password"></input>
        <Button style={{ width: '100%', backgroundColor: 'red', marginTop: '20px' }}>계정을 삭제합니다</Button>
      </div>
    </>
  );
}
