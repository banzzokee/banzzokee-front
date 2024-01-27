// import { Link } from 'react-router-dom';
import styles from './BackHeader.module.css';
import Back from './Back';

export default function BackHeader({ style }) {
  // const settingIcon = <img src="../../../public/Setting.svg"></img>;
  return (
    <div className={styles.Header} style={style}>
      <div className={styles.backArrow}>
        <Back></Back>
      </div>
      {/* <div className={styles.settingIcon}>
        <Link to="/settingPage">{settingIcon}</Link>
      </div> */}
    </div>
  );
}
