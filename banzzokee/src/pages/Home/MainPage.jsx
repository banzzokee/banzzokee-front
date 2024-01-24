import { Link } from 'react-router-dom';
import Header from '../../Header';
import styles from './MainPage.module.css';
import Nav from '../../Nav';
export default function MainPage() {
  return (
    <div>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.MainPage_Header}>
          <div className={styles.datesort}>최신순 / 오래된순</div>
          <div className={styles.filter}>
          필터  
          <Link className='Filter' to='/Filter'>
          <img src='/Filter.png' alt='필터' className={styles.Filter_img} />
          </Link>
          </div>
        </div>
      </div>
      <Nav />
    </div>
    
  )
}