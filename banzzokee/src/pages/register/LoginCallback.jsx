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
        .get('https://server.banzzokee.homes/login/oauth2/code/google', {
          params: {
            code: code,
          },
        })
        .then((response) => {
          const { accessToken, userData } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          console.log('User Data:', userData);
          if (userData.isFirstLogin) {
            navigate('/GoogleRegister');
          } else {
            navigate('/MyPage');
          }
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
          navigate('/LoginPage');
        });
    }
  }, [navigate]);

  return <></>;
};

export default LoginCallback;
