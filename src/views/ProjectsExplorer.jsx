import { useState } from 'react';
import styled from 'styled-components';
import projectsData from '../data/projectsData.json';
import Header from '../components/Header/Header';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import FilterBar from '../components/FilterBar/FilterBar';

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
      <Header
        title="Proyectos Interestelares"
        description="Explorá nuestro repositorio clasificado de misiones y herramientas frontend. Desde librerías orbitales hasta APIs de espacio profundo, aquí documentamos el estado de cada despliegue galáctico."
      compact/>

     <FilterBar
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      statusFilter={statusFilter}
      onStatusChange={setStatusFilter}
    />

      <ProjectsGrid>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
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
