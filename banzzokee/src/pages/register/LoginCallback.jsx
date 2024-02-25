import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      axios
        .get('https://server.banzzokee.homes/api/oauth2/success', {
          params: {
            code: code,
          },
        })
        .then((response) => {
          const { accessToken, refreshToken, firstLogin } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          if (firstLogin) {
            navigate('/GoogleRegister');
          } else {
            navigate('/MyPage');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.error('400 에러');
          } else {
            console.error('사용자 정보를 가져오는 중 에러 발생:', error);
            navigate('/LoginPage');
          }
        });
    }
  }, [navigate]);

  return <></>;
};

export default LoginCallback;












