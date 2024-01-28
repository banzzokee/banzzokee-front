import styles from './Message.module.css';
import Back from '../../components/common/back/Back';

export default function Message() {
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.back}>
          <Back></Back>
        </div>
        <p className={styles.name}>user_123</p>
      </div>

      <div className={styles.messageContainer}></div>
      <div className={styles.messageInput}>
        <div className={styles.add}>
          <input className={styles.addPhoto} type="file" name="" id="fileInput"></input>
          <label className={styles.addIcon} htmlFor="fileInput">
            <img src="../../../public/add.svg" alt="" />
          </label>
        </div>

        <input className={styles.typeMessage} type="text"></input>
      </div>
    </>
  );
}
