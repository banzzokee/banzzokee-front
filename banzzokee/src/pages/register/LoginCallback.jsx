import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
    const isFirstLogin = urlParams.get('isFirstLogin');

    if (isFirstLogin) {
      navigate('/GoogleRegister');
    } else {
      navigate('/MyPage');
    }
  }, []);

  return <></>;
};

export default LoginCallback;
