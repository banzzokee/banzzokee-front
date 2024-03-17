import styles from './ArticleList.module.css';
export default function TagsAll({ adoption }) {
  const healthChecked = ({ adoption }) => {
    if (adoption.healthChecked && adoption.healthChecked == true) {
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
    if (adoption.gender && adoption.gender.value == '수컷') {
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
  const neutering = ({ adoption }) => {
    if (adoption.neutering) {
      return (
        <>
          <div className={styles.tag}>중성화</div>
        </>
      );
    } else {
      return <></>;
    }
  };
  const age = ({ adoption }) => {
    if (adoption.age) {
      return (
        <>
          <div className={styles.tag}>{adoption.age}살</div>
        </>
      );
    } else {
      return <></>;
    }
  };
  const registeredAt = ({ adoption }) => {
    if (adoption.registeredAt) {
      return (
        <>
          <div className={styles.tag}>보호소 등록일: {adoption.registeredAt}</div>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      {breed({ adoption })}
      {size({ adoption })}
      {age({ adoption })}
      {gender({ adoption })}
      {neutering({ adoption })}
      {healthChecked({ adoption })}
      {registeredAt({ adoption })}
    </>
  );
}
