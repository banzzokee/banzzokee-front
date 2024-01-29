import styles from './MyPageEdit.module.css';
import BackHeader from '../../components/common/header/BackHeader';

export default function MyPageEdit() {
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.container}>
        <form className={styles.edit} action="">
          <div className={styles.editInput}>
            <div className={styles.pictures}>
              <div className={styles.picture}>
                <img src="../../../public/user.png" alt="" />
              </div>
              <div className={styles.add}>
                <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
                <label className={styles.addIcon} htmlFor="fileInput">
                  <img src="../../../public/addPhoto.svg" alt="" />
                </label>
              </div>
            </div>
            <div className={styles.shelterInfo}>
              <p>
                닉네임:
                <input className={styles.input} type="text" placeholder="이전 등록값" />
              </p>
              <p>
                자기 소개:
                <input className={styles.input} type="password" placeholder="이전 등록값" />
              </p>
            </div>
          </div>
          <div className={styles.button} onClick={'dothis'}>
            수정 완료
          </div>
        </form>
      </div>
    </>
  );
}
