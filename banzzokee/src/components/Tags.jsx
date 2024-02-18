import styles from './ArticleList.module.css';
export default function Tags({ adoption }) {
  const healthChecked = ({ adoption }) => {
    if (adoption.healthChecked == true) {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Medical.png"></img>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const gender = ({ adoption }) => {
    if (adoption.gender == '수컷') {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Male.svg"></img>
        </div>
      );
    } else {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Female.svg"></img>
        </div>
      );
    }
  };
  return (
    <>
      {healthChecked({ adoption })}
      {gender({ adoption })}
    </>
  );
}
