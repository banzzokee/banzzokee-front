import styles from './ArticleList.module.css';
export default function Tags({ adoption }) {
  const healthChecked = ({ adoption }) => {
    if (adoption.healthChecked == true) {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="/Medical.png"></img>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const gender = ({ adoption }) => {
    if (adoption.gender.value == '수컷') {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="/Male.svg"></img>
        </div>
      );
    } else {
      return (
        <div className={styles.tag}>
          <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="/Female.svg"></img>
        </div>
      );
    }
  };
  const size = ({ adoption }) => {
    if (adoption.size) {
      return <div className={styles.tag}>{adoption.size.value}</div>;
    } else {
      return <></>;
    }
  };
  const breed = ({ adoption }) => {
    if (adoption.breed) {
      return <div className={styles.tag}>{adoption.breed.value}</div>;
    } else {
      return <></>;
    }
  };
  return (
    <>
      {breed({ adoption })}
      {size({ adoption })}
      {healthChecked({ adoption })}
      {gender({ adoption })}
    </>
  );
}
