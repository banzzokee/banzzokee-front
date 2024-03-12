import styles from './ChatHeader.module.css';
// import Back from '../Back';

export default function ChatHeader() {
  return (
    <div className={styles.Header}>
      <img src="../../../public/Chatting.png" alt="" />
      <p>메세지</p>
    </div>
  );
}
