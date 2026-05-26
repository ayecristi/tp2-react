import styled from 'styled-components';
import Hero from '../components/Hero/Hero';
import CrewCard from '../components/CrewCard/CrewCard';

import AyelenImg from '../assets/img/profile_vocalist_02.png';
import LucioImg from '../assets/img/profile_guitarist_02.png';
import MatiasImg from '../assets/img/profile_drummer_02.png';

// --- COMPONENTES ESTILIZADOS PARA LA TRIPULACIÓN ---

const CrewSection = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    align-items: start;
  }
`;

// --- VISTA PRINCIPAL ---

export default function DashboardHome() {
  return (
    <>
      {/* El Hero ahora toca los bordes de la pantalla (100% width) */}
      <Hero />

      {/* Le aplicamos el padding solo a la sección de abajo para mantener la lectura */}
      <CrewSection id="the-crew" style={{ padding: '0 2rem', maxWidth: '1200px', margin: '2rem auto' }}>
        <SectionTitle>The Crew</SectionTitle>
        <Grid3>
          <CrewCard 
            memberId="ayelen" 
            imgSrc={AyelenImg} 
            altText="Ayelen, cantante principal" 
            label="AYELEN - VOCALS" 
          />
          <CrewCard 
            memberId="lucio" 
            imgSrc={LucioImg} 
            altText="Lucio, guitarrista principal" 
            label="LUCIO - GUITAR" 
          />
          <CrewCard 
            memberId="matias" 
            imgSrc={MatiasImg}
            altText="Matias, baterista" 
            label="MATIAS - DRUMS" 
          />
        </Grid3>
      </CrewSection>
    </>
  );
}
