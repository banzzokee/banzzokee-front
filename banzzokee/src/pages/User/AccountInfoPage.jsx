import styles from './AccountInfoPage.module.css';
import BackHeader from '../../components/common/header/BackHeader';
export default function AccountInfoPage() {
  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <p className={styles.title}>개인정보 조회</p>
        <p>이메일: </p>
        <p>가입일: </p>
      </div>
    </>
  );
}
