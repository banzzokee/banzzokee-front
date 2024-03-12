// import { Link } from 'react-router-dom';
import styles from './BackHeader.module.css';
import SettingBack from '../back/SettingBack';

export default function SettingHeader({ style }) {
  // const settingIcon = <img src="../../../public/Setting.svg"></img>;
  return (
    <div className={styles.Header} style={style}>
      <div className={styles.backArrow}>
        <SettingBack></SettingBack>
      </div>
      {/* <div className={styles.settingIcon}>
        <Link to="/settingPage">{settingIcon}</Link>
      </div> */}
    </div>
  );
}
