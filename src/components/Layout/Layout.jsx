import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import ScrollManager from '../ScrollManager/ScrollManager';
import styled from 'styled-components';

// --- COMPONENTES ESTILIZADOS (CSS-in-JS) ---

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* --- MAGIA ANTI-SCROLL HORIZONTAL --- */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden; 
  /* ------------------------------------ */

  @media (min-width: 900px) {
    flex-direction: row; /* Coloca el Sidebar a la izquierda y el contenido a la derecha */
  }
`;

const MainContent = styled.main`
  width: 100%;
  min-height: 100vh;
  
  /* MAGIA MOBILE: Le damos 140px de espacio al fondo para que nada quede tapado 
     incluso si la barra tiene 2 o 3 filas */
  padding-bottom: 100px; 

  @media (min-width: 900px) {
    /* DESKTOP: Como la barra pasa a la izquierda, reseteamos el padding inferior */
    padding-bottom: 0; 
    
    /* Y le damos el margen izquierdo equivalente al ancho de tu Sidebar vertical (ej: 260px) */
    margin-left: 260px;
    /* LA SOLUCIÓN MÁGICA: Le restamos exactamente el ancho de la Sidebar */
    width: calc(100% - 260px); 
  }
`;

const ViewContainer = styled.main`
  flex-grow: 1; /* Absorbe el espacio sobrante empujando al Footer hacia abajo */
  width: 100%;
`;

// --- COMPONENTE PRINCIPAL ---

export default function Layout() {
  return (
    <LayoutContainer>
      <Sidebar />
      
      <MainContent>
        <ViewContainer>
          <ScrollManager />
          {/* Aquí React Router inyectará de forma dinámica las vistas */}
          <Outlet />
        </ViewContainer>
        
        {/* El Footer se renderizará de forma global al final de cada página */}
        <Footer />
      </MainContent>
    </LayoutContainer>
  );
}
