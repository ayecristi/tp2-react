import { useState } from 'react';
import styled from 'styled-components';
import projectsData from '../data/projectsData.json';

// --- COMPONENTES ESTILIZADOS ---

const ExplorerContainer = styled.div`
  width: 100%;
  padding: 40px 1rem 80px 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding: 60px 2rem;
  }
`;

const HeaderSection = styled.header`
  margin-bottom: 2.5rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--primary);
  text-shadow: 0 0 10px rgba(255, 177, 196, 0.3);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: var(--on-surface-variant);
  font-size: 1.1rem;
  max-width: 700px;
  line-height: 1.6;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(19, 19, 20, 0.6);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--outline-variant);
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  flex: 2;
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  color: var(--on-surface);
  padding: 12px 20px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(255, 177, 196, 0.2);
  }
`;

const StatusSelect = styled.select`
  flex: 1;
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  color: var(--on-surface);
  /* Aumentamos el padding derecho a 35px para que la flechita no quede pegada al borde */
  padding: 12px 35px 12px 20px; 
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--tertiary);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.article`
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: var(--primary);
  }
`;

// El "Semáforo"
const TrafficLight = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  
  /* Lógica de colores según estado */
  background-color: ${({ $status }) => 
    $status === 'ENTREGADO' ? '#00E676' : 
    $status === 'EN PROCESO' ? '#FFEA00' : 
    '#FF4D4D'};
  
  /* Sombra de neón para que brille como LED */
  box-shadow: 0 0 12px ${({ $status }) => 
    $status === 'ENTREGADO' ? 'rgba(0, 230, 118, 0.6)' : 
    $status === 'EN PROCESO' ? 'rgba(255, 234, 0, 0.6)' : 
    'rgba(255, 77, 77, 0.6)'};
    
  /* Tooltip nativo: si pasas el mouse por encima muestra el estado en texto */
  &::after {
    content: attr(title);
    display: none;
  }
`;

const ProjectName = styled.h2`
  font-size: 1.3rem;
  color: var(--on-surface);
  margin-bottom: 0.5rem;
  padding-right: 2rem; /* Evita pisar el semáforo */
`;

const ProjectDesc = styled.p`
  color: var(--tertiary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  min-height: 40px; /* Alinea visualmente las tarjetas */
`;

const DetailText = styled.p`
  color: var(--on-surface-variant);
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    color: var(--primary);
    width: 16px;
    text-align: center;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 10px;
  border-radius: 4px;
  font-family: var(--font-headline);
  font-weight: bold;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  background: ${({ disabled }) => disabled ? 'var(--surface-high)' : 'transparent'};
  color: ${({ disabled }) => disabled ? 'var(--on-surface-variant)' : 'var(--primary)'};
  border: 1px solid ${({ disabled }) => disabled ? 'var(--outline-variant)' : 'var(--primary)'};

  &:hover:not(:disabled) {
    background: var(--primary);
    color: #121212;
    box-shadow: 0 0 15px rgba(255, 113, 154, 0.4);
  }
`;

// --- VISTA PRINCIPAL ---

export default function ProjectsExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  // Filtrado reactivo cruzado
  const filteredProjects = projectsData.filter((project) => {
    // 1. Coincidencia por nombre de proyecto (Ignora mayúsculas/minúsculas)
    const matchName = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Coincidencia por selector de status
    const matchStatus = statusFilter === "Todos" || project.status === statusFilter;

    return matchName && matchStatus;
  });

  return (
    <ExplorerContainer>
      <HeaderSection>
        <PageTitle>Proyectos Interestelares</PageTitle>
        <PageDescription>
          Explorá nuestro repositorio clasificado de misiones y herramientas frontend. Desde librerías orbitales hasta APIs de espacio profundo, aquí documentamos el estado de cada despliegue galáctico.
        </PageDescription>
      </HeaderSection>

      <FiltersContainer>
        <SearchInput 
          type="text" 
          placeholder="Buscar por nombre del proyecto..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <StatusSelect 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Todos">Todos los estados</option>
          <option value="EN PROCESO">En Proceso</option>
          <option value="ENTREGADO">Entregados</option>
          <option value="CANCELADO">Cancelados</option>
        </StatusSelect>
      </FiltersContainer>

      <ProjectsGrid>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              
              {/* El Semáforo con un tooltip (title) para accesibilidad */}
              <TrafficLight $status={project.status} title={`Estado: ${project.status}`} />
              
              <ProjectName>{project.name}</ProjectName>
              <ProjectDesc>{project.shortDesc}</ProjectDesc>
              
              <DetailText>
                <i className="fa-regular fa-clock"></i> 
                <strong>Entrega:</strong> {project.date}
              </DetailText>
              <DetailText>
                <i className="fa-solid fa-location-dot"></i> 
                <strong>Base:</strong> {project.location}
              </DetailText>
              <DetailText>
                <i className="fa-solid fa-satellite"></i> 
                <strong>Cuadrante:</strong> {project.quadrant}
              </DetailText>

              {/* Botón adaptado a la temática */}
              <ActionButton disabled={project.status === 'CANCELADO'}>
                {project.status === 'CANCELADO' ? 'CÓDIGO ARCHIVADO' : 'INSPECCIONAR REPOSITORIO'}
              </ActionButton>

            </ProjectCard>
          ))
        ) : (
          <p style={{ color: 'var(--primary)', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            No se encontraron proyectos en la base de datos con esos parámetros.
          </p>
        )}
      </ProjectsGrid>
    </ExplorerContainer>
  );
}
