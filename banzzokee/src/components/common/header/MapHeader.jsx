import styles from './ChatHeader.module.css';
// import Back from '../Back';

export default function ChatHeader() {
  return (
    <div className={styles.Header}>
      <img src="../../../public/Map.png" alt="" />
      <p>지도</p>
    </div>
  );
}
