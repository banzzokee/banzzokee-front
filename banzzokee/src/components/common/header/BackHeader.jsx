import styles from './BackHeader.module.css';
import Back from '../back/Back';

export default function BackHeader({ style }) {
  return (
    <div className={styles.Header} style={style}>
      <div className={styles.backArrow}>
        <Back></Back>
      </div>
    </div>
  );
}
