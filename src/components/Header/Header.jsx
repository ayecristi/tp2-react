import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>&lt; ROCKDEVS /&gt;</div>
      
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
        >
          HOME
        </NavLink>
        
        <NavLink 
          to="/logbook" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
        >
          BITÁCORA
        </NavLink>

        <NavLink 
          to="/tripulation" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
        >
          TRIPULACIÓN
        </NavLink>
      </nav> 
      
      <button className={styles.btnPrimary}>SOFTWARE & MUSIC</button>
    </header>
  );
}