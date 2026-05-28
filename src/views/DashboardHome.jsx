import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Hero from '../components/Hero/Hero';
import CrewCard from '../components/CrewCard/CrewCard';

import AyelenImg from '../assets/img/profile_vocalist_02.png';
import LucioImg from '../assets/img/profile_guitarist_02.png';
import MatiasImg from '../assets/img/profile_drummer_02.png';

// --- COMPONENTES ESTILIZADOS PARA LA TRIPULACIÓN ---

const CrewSection = styled.section`
  margin-top: 2rem;
`;

// Animación de entrada para el título de la sección
const slideLeftFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  
  /* Estado inicial antes de comenzar la animación */
  opacity: 0;
  transform: translateX(-50px);
  
  /* La animación se activa cuando la sección entra en el viewport */
  animation: ${({ $isVisible }) => $isVisible ? slideLeftFadeIn : 'none'} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
  // Estado para controlar cuándo la sección es visible en pantalla
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Configuramos el IntersectionObserver para detectar el scroll del usuario
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dejamos de observar una vez que la animación se activa para mejorar rendimiento
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Se activa cuando el 10% de la sección ingresa al área visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      {/* El Hero ahora toca los bordes de la pantalla (100% width) */}
      <Hero />

      {/* Le aplicamos el padding solo a la sección de abajo para mantener la lectura */}
      <CrewSection 
        ref={sectionRef}
        id="the-crew" 
        style={{ padding: '0 2rem', maxWidth: '1200px', margin: '2rem auto' }}
      >
        <SectionTitle $isVisible={isVisible}>The Crew</SectionTitle>
        <Grid3>
          <CrewCard 
            memberId="ayelen" 
            imgSrc={AyelenImg} 
            altText="Ayelen, cantante principal" 
            label="AYELEN - VOCALS" 
            $delay="0.1s"
            $isVisible={isVisible}
          />
          <CrewCard 
            memberId="lucio" 
            imgSrc={LucioImg} 
            altText="Lucio, guitarrista principal" 
            label="LUCIO - GUITAR" 
            $delay="0.3s"
            $isVisible={isVisible}
          />
          <CrewCard 
            memberId="matias" 
            imgSrc={MatiasImg}
            altText="Matias, baterista" 
            label="MATIAS - DRUMS" 
            $delay="0.5s"
            $isVisible={isVisible}
          />
        </Grid3>
      </CrewSection>
    </>
  );
}
