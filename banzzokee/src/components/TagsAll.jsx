import styles from './ArticleList.module.css';
export default function TagsAll({ adoption }) {
  if (adoption) {
    console.log(adoption);
    const key = Object.keys(adoption.gender);
  }
  console.log(key, adoption.gender[key], 'adad');
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
  // const gender = ({ adoption }) => {
  //   if (Object.keys(adoption.gender) == '수컷') {
  //     return (
  //       <div className={styles.tag}>
  //         <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Male.svg"></img>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className={styles.tag}>
  //         <img style={{ width: '14px', height: '14px', margin: '0', padding: '0' }} src="../../public/Female.svg"></img>
  //       </div>
  //     );
  //   }
  // };
  // const breed = ({ adoption }) => {
  //   if (Object.keys(adoption.breed)) {
  //     return (
  //       <>
  //         <div className={styles.tag}>{Object.keys(adoption.breed)}</div>
  //       </>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // const size = ({ adoption }) => {
  //   if (adoption.size.value) {
  //     return (
  //       <>
  //         <div className={styles.tag}>{adoption.size}</div>
  //       </>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // const neutering = ({ adoption }) => {
  //   if (adoption.neutering) {
  //     return (
  //       <>
  //         <div className={styles.tag}>중성화</div>
  //       </>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // const age = ({ adoption }) => {
  //   if (adoption.age) {
  //     return (
  //       <>
  //         <div className={styles.tag}>{adoption.age}살</div>
  //       </>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // const registeredAt = ({ adoption }) => {
  //   if (adoption.registeredAt) {
  //     return (
  //       <>
  //         <div className={styles.tag}>보호소 등록일: {adoption.registeredAt}</div>
  //       </>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // return (
  //   <>
  //     {breed({ adoption })}
  //     {size({ adoption })}
  //     {gender({ adoption })}
  //     {age({ adoption })}
  //     {healthChecked({ adoption })}
  //     {neutering({ adoption })}
  //     {registeredAt({ adoption })}
  //   </>
  // );
}
