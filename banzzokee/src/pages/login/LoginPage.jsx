import BackHeader from '../../components/common/header/BackHeader';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('click login');
    console.log('ID : ', inputValue['email']);
    console.log('PW : ', inputValue['password']);
    axios
      .post('http://localhost:3001/users', null, {
        params: {
          user_id: inputValue['email'],
          user_pw: inputValue['password'],
        },
      })
      .then((res) => {
        console.log(res);
        console.log('res.data.userId :: ', res.data.email);
        // console.log('res.data.msg :: ', res.data.msg);
        if (res.data.userId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log('======================', res.data.msg);
          // alert('입력하신 id 가 일치하지 않습니다.');
        } else if (res.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log('======================', '입력하신 비밀번호 가 일치하지 않습니다.');
          // alert('입력하신 비밀번호 가 일치하지 않습니다.');
        } else if (res.data.userId === inputValue['email']) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log('======================', '로그인 성공');
          sessionStorage.setItem('user_id', inputValue['email']);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = '/MyPage';
      })
      .catch();
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      sessionStorage.setItem('userInfo', JSON.stringify(response.data[0]));
      console.log(response.data);
      document.location.href = '/MyPage';
    } catch (error) {
      console.error(error);
    }
    // return response
  };
  // const putData = async () => {
  //   try {
  //     const { data } = await axios.post('http://localhost:3001/users', inputValue);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // return response
  // };

  return (
    <>
      <BackHeader />
      <div className={styles.container}>
        <img className={styles.logo} src="../../../public/Logo.svg"></img>
        <form className={styles.login} action="" onSubmit={onSubmit}>
          <div className={styles.loginInput}>
            <input className={styles.input} type="email" placeholder="이메일" name="email" onChange={onChange} />
            <input className={styles.input} type="password" placeholder="비밀번호" name="password" onChange={onChange} />
          </div>
          <button className={styles.loginButton} type="submit" onClick={onsubmit}>
            로그인
          </button>
          <div className={styles.text}>
            아직 회원이 아니신가요?
            <Link to="/Register">
              <span>회원가입</span>
            </Link>
          </div>
        </form>
        <div className={styles.orLines}>
          <div className={styles.line}></div>
          <div>or</div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.loginButton} onClick={getData} style={{ fontSize: '16px' }}>
          <img className={styles.googleLogo} src="../../../public/google.svg" alt="로고" />
          Google 계정으로 로그인
        </div>
      </div>
    </>
  );
}
