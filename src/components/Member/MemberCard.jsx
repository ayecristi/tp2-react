// src/components/MemberCard.jsx
import { Link } from 'react-router-dom';
import styles from './MemberCard.module.css';

export default function MemberCard({ member }) {
  return (
    <Link to={`/profile/${member.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        
        <img 
          src={member.image} 
          alt={`${member.name}, ${member.role}`} 
          className={styles.image} 
        />
        
        <div className={styles.nameContainer}>
          <span className={styles.nameBadge}>
            {member.name} - {member.role}
          </span>
        </div>
        
      </article>
    </Link>
  );
}