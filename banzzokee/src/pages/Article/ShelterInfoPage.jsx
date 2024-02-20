import styles from './ShelterInfoPage.module.css';
import Button from '../../components/common/button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackHeader from '../../components/common/header/BackHeader';
import Nav from '../../components/common/nav/Nav';
import { useEffect } from 'react';

export default function ShelterInfoPage() {
  // const userInfo = JSON.parse(sessionStorage.getItem('articleInfo'));
  const photo = <img></img>;
  // state에는 shelter가 들어있습니다.
  const { state } = useLocation();
  const navigate = useNavigate();

  function noShelter() {
    if (state == null) {
      navigate(-1, { replace: true });
      alert('보호소 등록이 안된 사용자입니다.');
    }
  }
  useEffect(() => {
    noShelter();
  }, []);

  let shelterImgUrl = '';
  if (state && state.shelterImgUrl) {
    shelterImgUrl = state.shelterImgUrl;
  }
  let shelterName = '';
  if (state && state.shelterName) {
    shelterName = state.shelterName;
  }
  let description = '';
  if (state && state.description) {
    description = state.description;
  }
  let tel = '';
  if (state && state.tel) {
    tel = state.tel;
  }
  let address = '';
  if (state && state.address) {
    address = state.address;
  }
  let registeredAt = '';
  if (state && state.registeredAt) {
    registeredAt = state.registeredAt;
  }

  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.picture}>
          <img src={shelterImgUrl}></img>
        </div>

        <Link to="/ShelterEditPage">
          <Button>보호소 수정</Button>
        </Link>

        <div className={styles.shelterInfo}>
          <p>보호소 이름: {shelterName}</p>
          <p>보호소 소개: {description}</p>
          <p>연락처: {tel}</p>
          <p>주소: {address}</p>
          <p>반쪽이 보호소 등록일: {registeredAt}</p>
        </div>
      </div>
      <Nav></Nav>
    </>
  );
}
