import styles from './ChatHeader.module.css';
// import Back from '../Back';
export default function ChatHeader() {
  return (
    <div className={styles.Header}>
      <img src="/Map.png" alt="" />
      <p>내 주변 보호소</p>
    </div>
  );
}
