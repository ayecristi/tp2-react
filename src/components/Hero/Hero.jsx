import { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import audioTrack from '../../assets/audio/interstellar-web.mp3';
import bandHero from '../../assets/img/hero_band.png';

// --- COMPONENTES ESTILIZADOS (CSS-in-JS) con diseño restaurado ---

const HeroSection = styled.section`
  text-align: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 900px) {
    background: linear-gradient(to bottom, rgba(19, 19, 20, 0.1), var(--surface-high)), url(${bandHero});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 400px) {
    background: rgba(19, 19, 20, 0.3); 
    backdrop-filter: blur(3px);
    border-radius: 20px; 
    border: 1px solid rgba(255, 177, 196, 0.15); 
    max-width: 800px; 
    width: 90%;
  }
`;

const GlassBox = styled.div`
  /* MAQUETACIÓN INTERNA */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem; /* Espaciado interno */
  max-width: 800px;

  @media (min-width: 900px) {
    padding: 4rem 3rem; /* Espaciado interno en desktop */
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem; 
  line-height: 1.1;
  color: var(--primary);
  text-shadow: 0 0 20px rgba(255, 177, 196, 0.3);
  margin-top: 1rem; 
  margin-bottom: 1.5rem; 
  font-family: var(--font-headline);
  text-transform: uppercase;
`;

const HeroDescription = styled.p`
  /* TIPOGRAFÍA: Estilo base .lead */
  color: var(--on-surface-variant);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-size: 1.1rem;
`;

// --- Animación y lógica del ecualizador (Sin cambios) ---
const equalize = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`;

const EqualizerContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
  margin: 2rem 0;
`;

const EqualizerBar = styled.div`
  width: 8px;
  background-color: var(--primary);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary-container);
  transform-origin: bottom;
  
  /* Lógica declarativa reactiva con prop transitoria $ */
  animation: ${({ $isPlaying }) => $isPlaying ? equalize : 'none'} 1s ease-in-out infinite;

  &:nth-child(1) { height: 60%; animation-delay: -0.2s; }
  &:nth-child(2) { height: 90%; animation-delay: -0.4s; }
  &:nth-child(3) { height: 40%; animation-delay: -0.6s; }
  &:nth-child(4) { height: 70%; animation-delay: -0.8s; }
  &:nth-child(5) { height: 100%; animation-delay: -1.0s; }
  &:nth-child(6) { height: 50%; animation-delay: -0.3s; }
  &:nth-child(7) { height: 80%; animation-delay: -0.7s; }
  &:nth-child(8) { height: 30%; animation-delay: -0.1s; }
  &:nth-child(9) { height: 65%; animation-delay: -0.9s; }
  &:nth-child(10) { height: 85%; animation-delay: -0.5s; }
`;

const PlayButton = styled.button`
  margin-top: 1rem; 
  padding: 12px 30px;
  font-family: var(--font-headline); 
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  /* Lógica declarativa reactiva con prop transitoria $ */
  background-color: ${({ $isPlaying }) => $isPlaying ? 'var(--primary)' : 'transparent'};
  color: ${({ $isPlaying }) => $isPlaying ? 'var(--bg-color)' : 'var(--primary)'};
  border: 2px solid var(--primary);
  border-radius: 8px; 
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  box-shadow: ${({ $isPlaying }) => $isPlaying ? '0 0 30px var(--primary)' : '0 0 15px rgba(255, 113, 154, 0.1)'};

  &:hover {
    box-shadow: 0 0 25px var(--primary);
    transform: translateY(-2px); 
  }
`;

// --- COMPONENTE PRINCIPAL (La lógica se mantiene intacta) ---

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name === 'AbortError') {
            console.log("Reproducción interrumpida por pausa rápida.");
          } else {
            console.error("Error de audio:", err);
            setIsPlaying(false);
          }
        });
      }
    }
  };

  const renderEqualizerBars = () => {
    return Array.from({ length: 10 }).map((_, i) => (
      <EqualizerBar key={i} $isPlaying={isPlaying} />
    ));
  };

  return (
    <HeroSection>
      <ContentWrapper>
        {/* Restauramos la estructura visual del 'glass-box' visualizado en image_548fdb.jpg */}
        <GlassBox>
          <HeroTitle>Interstellar<br/>RockDevs</HeroTitle>
          <HeroDescription>
            Preparate para un viaje sónico a través del cosmos. Combinamos código fuente con frecuencias espaciales, convirtiendo cada proyecto en una supernova.
          </HeroDescription>

          <EqualizerContainer>
            {renderEqualizerBars()}
          </EqualizerContainer>

          <PlayButton $isPlaying={isPlaying} onClick={toggleAudio}>
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i> 
            {isPlaying ? 'Pausar Frecuencia' : 'Iniciar Viaje Sónico'}
          </PlayButton>

          {/* Asegúrate de tener el audio en public/audio/ */}
          <audio ref={audioRef} loop>
            <source src={audioTrack} type="audio/mpeg" />
          </audio>
        </GlassBox>
      </ContentWrapper>
    </HeroSection>
  );
}
