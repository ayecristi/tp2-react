import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

// --- COMPONENTES ESTILIZADOS ---

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: row; 
  /* MAGIA MOBILE: Permite que los íconos bajen a una 2da fila si no hay espacio */
  flex-wrap: wrap; 
  align-items: center;
  justify-content: center; /* Centramos todo para que quede armónico en 1 o 2 filas */
  gap: 0.5rem; 
  background: rgba(19, 19, 20, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.5rem; 
  width: 100%;
  border-top: 1px solid var(--outline-variant);
  
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;

  @media (min-width: 900px) {
    flex-direction: column;
    flex-wrap: nowrap; /* En desktop no queremos que bajen de línea */
    align-items: flex-start;
    justify-content: flex-start;
    top: 0;
    height: 100vh;
    width: 260px;
    padding: 2rem 1.5rem;
    border-top: none;
    border-right: 1px solid var(--outline-variant);
    gap: 0.5rem;
  }
`;

const Brand = styled.div`
  display: none; 

  @media (min-width: 900px) {
    display: block;
    font-family: var(--font-headline);
    color: var(--primary);
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 2rem; 
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--on-surface-variant);
  text-decoration: none;
  padding: 6px 8px; 
  font-family: var(--font-headline);
  font-size: 0.7rem; 
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;

  i {
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  &.active {
    color: var(--tertiary);
    /* GLOW MOBILE: Resplandor de texto e ícono cuando está seleccionado */
    text-shadow: 0 0 10px rgba(0, 220, 229, 0.6);
    
    i {
      filter: drop-shadow(0 0 5px var(--tertiary));
    }
  }

  @media (min-width: 900px) {
    flex-direction: row; 
    justify-content: flex-start;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 10px 15px;
    width: 100%;
    border-radius: 8px;
    /* Borde invisible base para que no salte el layout al activarse */
    border-left: 4px solid transparent; 

    i {
      width: 24px; 
      text-align: center;
    }

    &.active {
      background: rgba(0, 220, 229, 0.05);
      /* BORDES DESKTOP: El colorcito a la izquierda */
      border-left: 4px solid var(--tertiary);
      /* Mantenemos un glow sutil en desktop */
      text-shadow: 0 0 8px rgba(0, 220, 229, 0.1);
    }
  }
`;

const Spacer = styled.div`
  display: none;
  
  @media (min-width: 900px) {
    display: block;
    flex-grow: 1; /* Esto empuja "The Crew" al fondo SOLO en desktop */
  }
`;

const CrewHighlightLink = styled(Link)`
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  padding: 6px 8px; /* Mismo padding que los navlinks */
  font-family: var(--font-headline);
  font-size: 0.8rem; /* Mismo tamaño que los navlinks */
  text-transform: uppercase;
  font-weight: normal; /* Le sacamos el bold en mobile */
  margin: 0; /* Le sacamos el margin-left: auto que rompía todo */
  
  color: var(--primary); 
  transition: all 0.3s ease;

  i {
    font-size: 1rem;
  }

  &:hover {
    color: #fff;
    text-shadow: 0 0 10px var(--primary);
  }

  @media (min-width: 900px) {
    flex-direction: row; 
    justify-content: flex-start;
    font-size: 0.9rem;
    padding: 10px 15px;
    width: 100%;
    border-radius: 8px;
    font-weight: bold;
    
    background: rgba(255, 177, 196, 0.03);
    border: 1px dashed rgba(255, 177, 196, 0.3);

    i {
      width: 24px;
      text-align: center;
    }

    &:hover {
      background: rgba(255, 177, 196, 0.1);
      box-shadow: 0 0 15px rgba(255, 177, 196, 0.2);
      transform: translateY(-2px);
      color: var(--primary); 
    }
  }
`;

// --- COMPONENTE PRINCIPAL ---

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Brand>&lt; ROCKDEVS /&gt;</Brand>
      
      <StyledNavLink to="/">
        <i className="fa-solid fa-rocket"></i> <span>Inicio</span>
      </StyledNavLink>
      
      <StyledNavLink to="/logbook">
        <i className="fa-solid fa-book-journal-whills"></i> <span>Bitácora</span>
      </StyledNavLink>
      
      <StyledNavLink to="/projects">
        <i className="fa-solid fa-music"></i> <span>Proyectos</span>
      </StyledNavLink>
      
      <StyledNavLink to="/space-gallery">
        <i className="fa-solid fa-images"></i> <span>Galería</span>
      </StyledNavLink>

      <StyledNavLink to="/system-map">
        <i className="fa-solid fa-network-wired"></i> <span>Sistema</span>
      </StyledNavLink>

      <Spacer />

      <CrewHighlightLink to="/#the-crew">
        <i className="fa-solid fa-users"></i>
        <span>The Crew</span>
      </CrewHighlightLink>
      
    </SidebarContainer>
  );
}
