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
  if (state && state.name) {
    shelterName = state.name;
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
  const toMap = () => {
    navigate('/MapPage', { state: state });
  };
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <div className={styles.picture}>
          <img src={shelterImgUrl}></img>
        </div>

        <div className={styles.shelterInfo}>
          <p>
            <span className={styles.title}>보호소 이름:</span> {shelterName}
          </p>
          <p>
            <span className={styles.title}>보호소 소개:</span> {description}
          </p>
          <p>
            <span className={styles.title}>연락처:</span> {tel}
          </p>
          <p>
            <span className={styles.title}>주소:</span> {address}
          </p>
          <p>
            <span className={styles.title}>반쪽이 보호소 등록일:</span> {registeredAt}
          </p>
        </div>
        <button className={styles.mapButton} onClick={toMap}>
          보호소 위치 지도에서 보기
        </button>
      </div>
      <Nav></Nav>
    </>
  );
}
