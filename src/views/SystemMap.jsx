import styled from 'styled-components';
import { systemData } from '../data/systemData';

// --- COMPONENTES ESTILIZADOS ---

const MapContainer = styled.div`
  width: 100%;
  padding: 40px 1rem 80px 1rem;
  overflow-x: auto;
  min-height: calc(100vh - 100px);

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

  @media (min-width: 900px) {
    padding: 60px 2rem;
  }
`;

const HeaderSection = styled.header`
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--outline-variant);
  padding-bottom: 2rem;
  position: sticky;
  left: 0;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--tertiary);
  text-shadow: 0 0 15px rgba(0, 220, 229, 0.4);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: var(--on-surface-variant);
  font-size: 1.1rem;
`;

// --- ESTRUCTURA HORIZONTAL DEL ÁRBOL ---

const TreeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0; 
`;

const NodeBox = styled.div`
  background: rgba(19, 19, 20, 0.9);
  border: 1px solid ${({ $status }) => $status === 'warning' ? '#FFEA00' : 'var(--primary)'};
  padding: 1rem 1.5rem;
  border-radius: 8px;
  min-width: 220px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  white-space: nowrap; 

  &:hover {
    transform: scale(1.05);
    border-color: var(--tertiary);
    box-shadow: 0 0 20px rgba(0, 220, 229, 0.3);
    z-index: 10;
  }
`;

const NodeName = styled.h3`
  color: ${({ $status }) => $status === 'warning' ? '#FFEA00' : 'var(--primary)'};
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  font-family: var(--font-headline);
`;

const NodeRole = styled.div`
  color: var(--on-surface-variant);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// La columna que agrupa a los hijos
const ChildrenColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  /* Línea vertical brillante (Neón Cyan) */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background: linear-gradient(to bottom, transparent, var(--tertiary) 10%, var(--tertiary) 90%, transparent);
    opacity: 0.6;
    box-shadow: 0 0 10px var(--primary);
  }
`;

// El contenedor individual de cada hijo
const ChildItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem 0 1rem 2.5rem; 

  /* Línea horizontal brillante entrando al hijo */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2px;
    background: var(--tertiary);
    opacity: 0.6;
    box-shadow: 0 0 5px var(--primary);
  }
`;

// Línea horizontal brillante que sale del nodo padre
const ParentLine = styled.div`
  width: 2.5rem;
  height: 2px;
  background: var(--tertiary);
  opacity: 0.6;
  box-shadow: 0 0 5px var(--tertiary);
  flex-shrink: 0;
`;

// --- EL TRUCO DEFINITIVO PARA EL SCROLL (BLOQUE FANTASMA) ---
const TreeWrapper = styled.div`
  padding: 2rem 0;
  display: inline-flex; /* Clave para que el contenedor respete las dimensiones completas */
  min-width: max-content;

  /* Pseudo-elemento que actúa como caja incompresible al final */
  &::after {
    content: '';
    display: block;
    width: 4rem; /* El espacio vacío que necesitamos a la derecha */
    flex-shrink: 0; /* Prohíbe que el navegador lo aplaste */
  }
`;

// --- COMPONENTE RECURSIVO ---

const TreeNode = ({ node }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <TreeRow>
      <NodeBox $status={node.status}>
        <NodeName $status={node.status}>{node.name}</NodeName>
        <NodeRole>{node.role}</NodeRole>
      </NodeBox>
      
      {hasChildren && (
        <>
          <ParentLine />
          <ChildrenColumn>
            {node.children.map((child, index) => (
              <ChildItem key={index}>
                <TreeNode node={child} />
              </ChildItem>
            ))}
          </ChildrenColumn>
        </>
      )}
    </TreeRow>
  );
};

// --- VISTA PRINCIPAL ---

export default function SystemMap() {
  return (
    <MapContainer>
      <HeaderSection>
        <PageTitle>Telemetría de la Nave</PageTitle>
        <PageDescription>
          Mapa estructural en tiempo real de los componentes de React. Desplazate horizontalmente para explorar las conexiones.
        </PageDescription>
      </HeaderSection>
      
      {/* Reemplazamos el div con estilos en línea por nuestro nuevo Wrapper */}
      <TreeWrapper>
        <TreeNode node={systemData} />
      </TreeWrapper>
    </MapContainer>
  );
}
