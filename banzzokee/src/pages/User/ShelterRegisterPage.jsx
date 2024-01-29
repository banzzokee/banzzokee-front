import styles from './ShelterRegisterPage.module.css';
import BackHeader from '../../BackHeader';
export default function ShelterRegisterPage() {
  const photo = <img src="../../../public/User.png"></img>;
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <form className={styles.edit} action="">
          <div className={styles.editInput}>
            <div className={styles.pictures}>
              <div className={styles.picture}>{photo}</div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
                <label className={styles.addIcon} htmlFor="fileInput">
                  <img src="../../../public/addPhoto.svg" alt="" />
                </label>
              </div>
            </div>
            <div className={styles.shelterInfo}>
              <p>
                보호소 이름:
                <input className={styles.input} type="text" placeholder="이전 등록값" />
              </p>
              <p>
                보호소 소개:
                <input className={styles.input} type="password" placeholder="이전 등록값" />
              </p>
              <p>
                연락처:
                <input className={styles.input} type="password" placeholder="이전 등록값" />
              </p>
              <p>
                주소:
                <input className={styles.input} type="password" placeholder="이전 등록값" />
              </p>
            </div>
          </div>
          <div className={styles.button} onClick={'dothis'}>
            보호소 등록 요청
          </div>
        </form>
      </div>
    </>
  );
}
