import Button from '../../components/common/button/Button';
import styles from './ChangePass.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackHeader from '../../components/common/header/BackHeader';

export default function ChangePass() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const [passwordError, setPasswordError] = useState('');
  const [newInfo, setNewInfo] = useState({});
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const onChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (newInfo.newPassword !== newInfo.confirmPassword) {
      setPasswordError('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다');
    } else {
      try {
        console.log('newInfo', newInfo);
        const config = {
          method: 'patch',
          url: 'https://server.banzzokee.homes/api/users/me/change-password',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: JSON.stringify(newInfo),
        };
        await axios.request(config).then((response) => {
          alert('변경완료');
          navigate('/MyPage');
        });
      } catch (error) {
        console.error(error);
      }

      // await axios.patch(`http://localhost:3001/users/${userInfo.id}`, newInfo).then((res) => {
      //   if ('error' in res) {
      //     alert('현재 비밀번호가 일치하지 않습니다.');
      //   } else {
      //     alert('수정완료');
      //   }
      //   sessionStorage.setItem('userInfo', JSON.stringify(newInfo));
      //   navigate('/MyPage');
      // });
    }
  };

  return (
    <>
      <BackHeader style={{ backgroundColor: '#e1e1e1' }}></BackHeader>
      <div className={styles.container}>
        <p className={styles.title}>비밀번호 변경</p>
        <form action="submit" onSubmit={onSubmit}>
          <p>현재 비밀번호</p>
          <input className={styles.input} name="originPassword" onChange={onChange} type="password"></input>
          <p>새로운 비밀번호</p>
          <input className={styles.input} name="newPassword" onChange={onChange} type="password"></input>
          <p>새로운 비밀번호 확인</p>
          <input className={styles.input} name="confirmPassword" onChange={onChange} type="password"></input>
          {passwordError && <span className={styles.passwordError}>{passwordError}</span>}
          <Button style={{ width: '100%', height: '50px', marginTop: '20px' }}>비밀번호 변경</Button>
        </form>
      </div>
    </>
  );
}
