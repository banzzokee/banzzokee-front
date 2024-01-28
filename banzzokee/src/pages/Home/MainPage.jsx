import { Link } from 'react-router-dom';
import Header from '../../components/common/header/Header';
import styles from './MainPage.module.css';
import Nav from '../../components/common/nav/Nav';

export default function MainPage() {
  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.mainPage_Header}>
          <div className={styles.datesort}>최신순 / 오래된순</div>
          <div className={styles.filter}>
          필터  
          <Link className='Filter' to='/Filter'>
          <img src='/Filter.png' alt='필터' className={styles.filter_Img} />
          </Link>
          </div>
        </div>
      </div>
      <Nav />
    </>
    
  )
}