import styles from './ChatListPage.module.css';

import Header from '../../Header';
import Nav from '../../Nav';

export default function ChatListPage() {
  return (
    <>
      <Header></Header>
      <div className={styles.container}></div>
      <Nav></Nav>
    </>
  );
}
