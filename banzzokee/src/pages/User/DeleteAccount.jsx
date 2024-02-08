import styles from './DeleteAccount.module.css';
import axios from 'axios';
import BackHeader from '../../components/common/header/BackHeader';

export default function DeleteAccount() {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  console.log('detelte account');

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(accessToken);
    // axios.post(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    // await axios.put(
    //   `http://localhost:3001/users/${userInfo.id}`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    //   newInfo
    // );
    await axios.delete(`http://localhost:3001/users/${userInfo.id}`, {
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
    });
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('accessToken');
    // axios.put(`http://localhost:3001/users/${userInfo.id}`, newInfo);
    document.location.href = '/';
  };

  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <p>비밀번호를 입력하세요</p>
        <input className={styles.input} type="password"></input>
        <button className={styles.button} onClick={onSubmit}>
          계정을 삭제합니다
        </button>
      </div>
    </>
  );
}
