import styled from 'styled-components';

const Card = styled.article`
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

const TrafficLight = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ $status }) =>
    $status === 'ENTREGADO' ? '#00E676' :
    $status === 'EN PROCESO' ? '#FFEA00' : '#FF4D4D'};
  box-shadow: 0 0 12px ${({ $status }) =>
    $status === 'ENTREGADO' ? 'rgba(0, 230, 118, 0.6)' :
    $status === 'EN PROCESO' ? 'rgba(255, 234, 0, 0.6)' : 'rgba(255, 77, 77, 0.6)'};
`;

const ProjectName = styled.h2`
  font-size: 1.3rem;
  color: var(--on-surface);
  margin-bottom: 0.5rem;
  padding-right: 2rem;
`;

const ProjectDesc = styled.p`
  color: var(--tertiary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  min-height: 40px;
`;

const DetailText = styled.p`
  color: var(--on-surface-variant);
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 10px;

  i { color: var(--primary); width: 16px; text-align: center; }
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

export default function ProjectCard({ project }) {
  return (
    <Card>
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
      <ActionButton disabled={project.status === 'CANCELADO'}>
        {project.status === 'CANCELADO' ? 'CÓDIGO ARCHIVADO' : 'INSPECCIONAR REPOSITORIO'}
      </ActionButton>
    </Card>
  );
}