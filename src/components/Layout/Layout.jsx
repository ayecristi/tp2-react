import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}