import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// --- ANIMACIONES ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// --- COMPONENTES ESTILIZADOS ---
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at center, #1a1a24 0%, #121212 100%);
  color: var(--on-surface);
  text-align: center;
  padding: 2rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999; /* Se asegura de tapar cualquier otra cosa */
`;

const AstronautIcon = styled.div`
  font-size: 8rem;
  color: var(--tertiary);
  margin-bottom: 2rem;
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(0, 220, 229, 0.4);
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-family: var(--font-headline);
  color: var(--primary);
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 20px rgba(255, 177, 196, 0.4);
  letter-spacing: 5px;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  color: var(--on-surface);
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: var(--on-surface-variant);
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ReturnButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: transparent;
  color: var(--tertiary);
  border: 2px solid var(--tertiary);
  border-radius: 8px;
  font-family: var(--font-headline);
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: var(--tertiary);
    color: #121212;
    box-shadow: 0 0 20px rgba(0, 220, 229, 0.5);
    transform: translateY(-3px);
  }
`;

// --- VISTA PRINCIPAL ---
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <AstronautIcon>
        <i className="fa-solid fa-user-astronaut"></i>
      </AstronautIcon>
      
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Señal Perdida</ErrorTitle>
      
      <ErrorMessage>
        Nuestros radares indican que te has desviado del curso. El cuadrante o coordenada que intentás explorar no existe en la base de datos estelar o ha sido absorbido por un agujero negro.
      </ErrorMessage>

      {/* navigate(-1) simula hacer clic en la flecha "Atrás" del navegador */}
      <ReturnButton onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
        Abortar y Regresar
      </ReturnButton>
    </NotFoundContainer>
  );
}
