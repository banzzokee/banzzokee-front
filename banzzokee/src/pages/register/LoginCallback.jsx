import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
    // console.log(code,"code")
    const isFirstLogin = urlParams.get('isFirstLogin');

    if (isFirstLogin) {
      navigate('/GoogleRegister');
    } else {
      navigate('/MyPage');
    }

    // if (code) {
    //   axios
    //     .get('https://server.banzzokee.homes/oauth2/authorization/google', {
    //       params: {
    //         code: code,
    //       },
    //     })
    //     .then((response) => {
    //       const { accessToken, refreshToken, FirstLogin } = response.data;
    //       sessionStorage.setItem('accessToken', accessToken);
    //       sessionStorage.setItem('refreshToken', refreshToken);
    //       console.log (response.data)

    //       if (FirstLogin) {
    //         navigate('/GoogleRegister');
    //       } else {
    //         navigate('/MyPage');
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.status === 400) {
    //         console.error('400 에러');
    //       } else {
    //         console.error('사용자 정보를 가져오는 중 에러 발생:', error);
    //         navigate('/LoginPage');
    //       }
    //     });
    // }
  }, []);

  return <></>;
};

export default LoginCallback;












