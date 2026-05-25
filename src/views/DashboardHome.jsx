
import Hero from '../components/Hero/Hero';
import MemberCard from '../components/Member/MemberCard';
import { teamMembers } from '../data/crew'; 
import styles from './DashboardHome.module.css'; 

export default function DashboardHome() {
  return (
    <div className={styles.dashboardContainer}>
      <Hero />

      <section id="crew" className={styles.crewSection}>
        <h2 className={styles.sectionTitle}>The Crew</h2>
        
        <div className={styles.grid3}>
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}