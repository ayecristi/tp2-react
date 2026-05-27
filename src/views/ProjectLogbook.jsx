import styled from 'styled-components';
import { logbookData } from '../data/logbookData';
import Header from '../components/Header/Header';

// --- COMPONENTES ESTILIZADOS (CSS-in-JS) ---

const LogbookContainer = styled.div`
  width: 100%;
  padding: 40px 1rem 80px 1rem;
  
  @media (min-width: 900px) {
    padding: 40px 2rem 80px 2rem;
  }

  @media (min-width: 1200px) {
    padding: 100px 2rem 80px 2rem;
  }
`;

const TimelineContainer = styled.section`
  padding: 2rem 0;
  width: 100%;

  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
    min-height: calc(100vh - 350px);
    padding: 0;
  }
`;

const Timeline = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary), var(--tertiary));
  box-shadow: 0 0 10px rgba(255,177,196,0.5);
  z-index: 1;

  @media (min-width: 900px) {
    left: 50%;
    transform: translateX(-50%);
  }

  @media (min-width: 1200px) {
    top: 50px;
    left: 0;
    right: 0;
    bottom: auto;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--tertiary), var(--primary));
    transform: none;
  }
`;

const TimelineTrack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;

  @media (min-width: 1200px) {
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 2rem 0 3rem 0;
    gap: 2rem;
    scrollbar-width: thin;
    scrollbar-color: var(--primary) var(--surface-low);

    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: var(--surface-low);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 4px;
    }
  }
`;

const TimelineNode = styled.article`
  position: relative;
  padding-left: 60px;
  width: 100%;

  @media (min-width: 900px) {
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    /* Lógica intercalada izquierda/derecha para formato Tablet */
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }

  @media (min-width: 1200px) {
    flex: 0 0 400px;
    scroll-snap-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    /* Reseteamos el comportamiento intercalado para la vista horizontal en Desktop */
    &:nth-child(odd) {
      flex-direction: column;
    }
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #131314; /* Forzamos color de fondo base para tapar la línea central */
  border: 2px solid ${({ $variant }) => 
    $variant === 'tertiary' ? 'var(--tertiary)' : 
    $variant === 'primary-container' ? 'var(--primary-container)' : 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $variant }) => 
    $variant === 'tertiary' ? 'var(--tertiary)' : 
    $variant === 'primary-container' ? 'var(--primary-container)' : 'var(--primary)'};
  z-index: 2;
  box-shadow: 0 0 15px rgba(255,177,196,0.3);

  @media (min-width: 900px) {
    left: 50%;
    transform: translateX(-50%);
  }

  @media (min-width: 1200px) {
    position: static;
    transform: none;
    margin-bottom: 2rem;
  }
`;

const TimelineCard = styled.div`
  background: var(--surface-low);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--outline-variant);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(255,74,141,0.2);
    border-left: 2px solid var(--primary);
  }

  @media (min-width: 900px) {
    width: 45%;
  }

  @media (min-width: 1200px) {
    width: 100%;
  }
`;

const TimelineDate = styled.time`
  color: var(--tertiary);
  font-weight: bold;
  font-size: 0.8rem;
  font-family: var(--font-headline);
`;

const TimelineCardTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  color: var(--on-surface);
`;

const TimelineDescription = styled.p`
  color: var(--on-surface-variant);
  font-size: 0.9rem;
  line-height: 1.5;
`;

// --- VISTA PRINCIPAL ---

export default function ProjectLogbook() {
  return (
    <LogbookContainer>
      {/* Encabezado Semántico de la página */}
      <Header 
      title="Bitácora del Proyecto"
      description="Registro cronológico de la gira espacial (proceso de desarrollo), decisiones y conflictos que nos llevaron hasta los lugares más remotos del universo."
      />

      {/* Estructura del Timeline */}
      <TimelineContainer>
        <Timeline>
          <TimelineLine />
          
          <TimelineTrack>
            {/* Renderizado declarativo por mapeo de arreglos nativo de React */}
            {logbookData.map((entry, index) => (
              <TimelineNode key={index}>
                
                {/* Pasamos el marcador variante usando props transitorias ($) */}
                <TimelineMarker $variant={entry.markerClass}>
                  <i className={entry.icon}></i>
                </TimelineMarker>
                
                <TimelineCard>
                  <TimelineDate>{entry.date}</TimelineDate>
                  <TimelineCardTitle>{entry.title}</TimelineCardTitle>
                  <TimelineDescription>{entry.description}</TimelineDescription>
                </TimelineCard>

              </TimelineNode>
            ))}
          </TimelineTrack>
        </Timeline>
      </TimelineContainer>
    </LogbookContainer>
  );
}
