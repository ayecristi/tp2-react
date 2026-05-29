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
// --- CONSTANTES DE DATOS (EN ESPAÑOL) ---

// Datos sobre los roles de la tripulación
const crewRolesData = [
  {
    name: "Ayelen",
    role: "Frontend Architect & Component Designer",
    icon: "fa-solid fa-microphone-lines",
    desc: "Creó el proyecto inicial y la arquitectura de carpetas. Extrajo y modularizó componentes reutilizables (Header, ProjectCard, FilterBar) y componentizó la vista de perfiles con sus subcomponentes (ProfileHeader, ProjectCarousel, SkillList, SocialLinks).",
    color: "var(--primary)"
  },
  {
    name: "Lucio",
    role: "UX Engineer & Animation Specialist",
    icon: "fa-solid fa-guitar",
    desc: "Implementó las animaciones de entrada con efecto stagger en las tarjetas del Dashboard. Expandió la bitácora con secciones de roles, flujo de trabajo y análisis de migración. Actualizó el árbol de renderizado con la estructura completa.",
    color: "var(--tertiary)"
  },
  {
    name: "Matias",
    role: "Lead Developer & Core Architect",
    icon: "fa-solid fa-drum",
    desc: "Realizó la migración core a React: implementó todas las vistas, el consumo de API NASA, React Router con rutas dinámicas, Sidebar, Footer, ScrollManager y Hero. Gestionó las ramas del repositorio y corrigió bugs de UI.",
    color: "var(--primary-container)"
  }
];

// Datos de las herramientas de trabajo
const toolsData = [
  {
    name: "Git",
    icon: "fa-brands fa-git-alt",
    desc: "Control de versiones local para mantener a salvo el histórico de vuelo y el código fuente.",
    color: "#f05032"
  },
  {
    name: "GitHub",
    icon: "fa-brands fa-github",
    desc: "Puerto espacial en la nube para sincronización, revisiones de Pull Requests y resguardo seguro.",
    color: "#ffffff"
  },
  {
    name: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    desc: "Canal de comunicación principal del equipo para coordinación diaria, toma de decisiones y resolución de conflictos.",
    color: "#25d366"
  }
];

// --- COMPONENTES ESTILIZADOS PARA LAS NUEVAS SECCIONES ---

const SectionContainer = styled.section`
  margin-top: 4rem;
  margin-bottom: 5rem;
  width: 100%;
`;

// Estilos de la Sección 1: Roles de la Tripulación
const CrewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CrewIconWrapper = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: rgba(19, 19, 20, 0.6);
  border: 2px solid ${props => props.$color || 'var(--primary)'};
  color: ${props => props.$color || 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 15px currentColor;
  transition: all 0.4s ease;
`;

const CrewCard = styled.article`
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), transparent);
    opacity: 0.8;
    transition: background 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(255, 177, 196, 0.12);
    border-color: var(--primary);

    &::before {
      background: linear-gradient(90deg, var(--primary), var(--tertiary));
    }

    /* Activación del efecto hover por clase de CSS estándar */
    .crew-icon {
      transform: scale(1.1) rotate(10deg);
      box-shadow: 0 0 25px currentColor;
    }
  }
`;

const CrewName = styled.h3`
  font-size: 1.6rem;
  color: var(--on-surface);
  margin-bottom: 0.4rem;
  letter-spacing: 1px;
`;

const CrewRoleBadge = styled.span`
  font-family: var(--font-headline);
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--tertiary);
  margin-bottom: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  border: 1px solid rgba(0, 220, 229, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(0, 220, 229, 0.03);
`;

const CrewDescription = styled.p`
  font-size: 0.95rem;
  color: var(--on-surface-variant);
  line-height: 1.6;
`;

// Estilos de la Sección 2: Flujo de Trabajo
const WorkflowToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ToolIcon = styled.i`
  font-size: 1.8rem;
  color: ${props => props.$color || 'var(--tertiary)'};
  text-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
`;

const ToolCard = styled.div`
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--tertiary);
    box-shadow: 0 5px 20px rgba(0, 220, 229, 0.1);
    transform: translateY(-4px);

    /* Efecto hover por clase para mayor estabilidad */
    .tool-icon {
      text-shadow: 0 0 15px currentColor;
      transform: scale(1.05);
    }
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ToolTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--on-surface);
  margin: 0;
  letter-spacing: 0.5px;
`;

const ToolDesc = styled.p`
  font-size: 0.85rem;
  color: var(--on-surface-variant);
  line-height: 1.5;
`;

const WorkflowDetails = styled.div`
  background: rgba(28, 27, 28, 0.6);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const WorkflowBlock = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WorkflowBlockTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--tertiary);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 220, 229, 0.15);
  padding-bottom: 0.6rem;
  margin-bottom: 0.5rem;
`;

const WorkflowList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const WorkflowItem = styled.li`
  font-size: 0.9rem;
  color: var(--on-surface-variant);
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;

  &::before {
    content: '✦';
    color: var(--primary);
    font-size: 0.9rem;
    line-height: 1.2;
  }
`;

// Estilos de la Sección 3: Migración de HTML a React
const ComparisonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BaseComparisonColumn = styled.article`
  border-radius: 12px;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
`;

// Columnas independientes de estilos para evitar evaluación de funciones en pseudo-elementos
const BeforeColumn = styled(BaseComparisonColumn)`
  background: rgba(255, 177, 196, 0.02);
  border: 1px solid rgba(255, 177, 196, 0.1);

  &::after {
    content: 'TP1';
    position: absolute;
    right: 20px;
    bottom: -10px;
    font-family: var(--font-headline);
    font-size: 5rem;
    font-weight: 900;
    color: rgba(255, 177, 196, 0.03);
    pointer-events: none;
  }
`;

const AfterColumn = styled(BaseComparisonColumn)`
  background: rgba(0, 220, 229, 0.02);
  border: 1px solid rgba(0, 220, 229, 0.15);

  &::after {
    content: 'TP2';
    position: absolute;
    right: 20px;
    bottom: -10px;
    font-family: var(--font-headline);
    font-size: 5rem;
    font-weight: 900;
    color: rgba(0, 220, 229, 0.03);
    pointer-events: none;
  }
`;

const ComparisonTitle = styled.h4`
  font-size: 1.3rem;
  color: ${props => props.$color || 'var(--primary)'};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-bottom: 1px solid var(--outline-variant);
  padding-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ComparisonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
  z-index: 1;
`;

const ComparisonItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--on-surface-variant);

  strong {
    color: var(--on-surface);
    display: block;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.2rem;
  }
`;

const AdvantagesBox = styled.article`
  background: linear-gradient(135deg, rgba(28, 27, 28, 0.9) 0%, rgba(19, 19, 20, 0.9) 100%);
  border: 1px solid var(--primary-container);
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 2.5rem;
  box-shadow: 0 0 30px rgba(255, 74, 141, 0.05);

  @media (min-width: 900px) {
    grid-column: span 2;
  }
`;

const AdvantagesHeader = styled.h4`
  font-size: 1.4rem;
  color: var(--primary);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 177, 196, 0.2);
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AdvantageItemCard = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
`;

const AdvantageBulletIcon = styled.i`
  color: var(--tertiary);
  font-size: 1.1rem;
  margin-top: 0.2rem;
  text-shadow: 0 0 5px rgba(0, 220, 229, 0.4);
`;

const AdvantageContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--on-surface-variant);

  strong {
    color: var(--on-surface);
    display: block;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
`;


// --- VISTA PRINCIPAL ---

export default function ProjectLogbook() {
  return (
    <LogbookContainer>
      {/* Encabezado Semántico de la página (Principal H1) */}
      <Header
        title="Bitácora del Proyecto"
        description="Registro cronológico de la gira espacial (proceso de desarrollo), decisiones y conflictos que nos llevaron hasta los lugares más remotos del universo."
        headingTag="h1"
      />

      {/* SECCIÓN 1: ROLES DE LA TRIPULACIÓN (H2) */}
      <SectionContainer>
        <Header
          title="Roles de la Tripulación"
          description="Sintonía fina del equipo de vuelo: responsabilidades e instrumentación técnica de los tripulantes."
          variant="primary"
          headingTag="h2"
          compact
        />
        <CrewGrid>
          {crewRolesData.map((crew, idx) => (
            <CrewCard key={idx}>
              <CrewIconWrapper $color={crew.color} className="crew-icon">
                <i className={crew.icon}></i>
              </CrewIconWrapper>
              <CrewName>{crew.name}</CrewName>
              <CrewRoleBadge>{crew.role}</CrewRoleBadge>
              <CrewDescription>{crew.desc}</CrewDescription>
            </CrewCard>
          ))}
        </CrewGrid>
      </SectionContainer>

      {/* SECCIÓN 2: FLUJO DE TRABAJO (H2) */}
      <SectionContainer>
        <Header
          title="Flujo de Trabajo"
          description="Los sistemas e hiperpuertos de comunicación táctica y desarrollo colaborativo de la misión."
          variant="tertiary"
          headingTag="h2"
          compact
        />

        <WorkflowToolsGrid>
          {toolsData.map((tool, idx) => (
            <ToolCard key={idx}>
              <ToolHeader>
                <ToolIcon className={`${tool.icon} tool-icon`} $color={tool.color} />
                <ToolTitle>{tool.name}</ToolTitle>
              </ToolHeader>
              <ToolDesc>{tool.desc}</ToolDesc>
            </ToolCard>
          ))}
        </WorkflowToolsGrid>

        <WorkflowDetails>
          <WorkflowBlock>
            <WorkflowBlockTitle>
              <i className="fa-solid fa-code-fork"></i> GitFlow Simplificado
            </WorkflowBlockTitle>
            <WorkflowList>
              <WorkflowItem>
                <strong>Rama Main</strong>: Núcleo de producción estable de la nave, desde donde se realizan los despliegues oficiales.
              </WorkflowItem>
              <WorkflowItem>
                <strong>Rama Develop</strong>: Entorno de integración donde se unifican los cambios de cada tripulante antes de pasar a producción.
              </WorkflowItem>
              <WorkflowItem>
                <strong>Ramas Feature</strong>: Ramas aisladas de trabajo por funcionalidad (ej: `fase1-migracion-react`), garantizando código libre de interferencias.
              </WorkflowItem>
            </WorkflowList>
          </WorkflowBlock>

          <WorkflowBlock>
            <WorkflowBlockTitle>
              <i className="fa-brands fa-whatsapp"></i> Comunicación & Sync
            </WorkflowBlockTitle>
            <WorkflowList>
              <WorkflowItem>
                <strong>Grupo de WhatsApp</strong>: Canal principal de comunicación diaria para coordinar tareas, tomar decisiones de diseño y resolver conflictos de merge.
              </WorkflowItem>
              <WorkflowItem>
                <strong>Sincronizaciones Semanales</strong>: Reuniones por llamada para unificar coordenadas, revisar avances y planificar los próximos sprints de desarrollo.
              </WorkflowItem>
            </WorkflowList>
          </WorkflowBlock>
        </WorkflowDetails>
      </SectionContainer>

      {/* SECCIÓN 3: MIGRACIÓN DE HTML A REACT (H2) */}
      <SectionContainer>
        <Header
          title="Migración: De HTML a React"
          description="Evolución de nuestra arquitectura: análisis técnico de la transición de sistemas estáticos a modulares."
          variant="primary"
          headingTag="h2"
          compact
        />

        <ComparisonContainer>
          {/* Estructura del Antes */}
          <BeforeColumn>
            <ComparisonTitle $color="var(--primary)">
              <i className="fa-solid fa-code"></i> Antes: TP1 (HTML/JS Vanilla)
            </ComparisonTitle>
            <ComparisonList>
              <ComparisonItem>
                <strong>Estructura Fragmentada</strong>
                Archivos HTML independientes por pantalla (`index.html`, `profile.html`, etc.), provocando redundancia masiva de código común.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Ficheros Globales</strong>
                Un único archivo CSS central monolítico y propenso a colisiones de selectores CSS en pantallas complejas.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Manipulación del DOM</strong>
                Lógica interactiva basada en manipulación imperativa del DOM (`document.createElement`, `appendChild`) difícil de depurar y escalar.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Carga Completa</strong>
                Navegación tradicional con parpadeo y recarga total del sistema al cambiar de secciones espaciales.
              </ComparisonItem>
            </ComparisonList>
          </BeforeColumn>

          {/* Estructura del Después */}
          <AfterColumn>
            <ComparisonTitle $color="var(--tertiary)">
              <i className="fa-solid fa-atom"></i> Después: TP2 (React SPA)
            </ComparisonTitle>
            <ComparisonList>
              <ComparisonItem>
                <strong>Componente Raíz y Layout</strong>
                Esqueleto modular centrado en `&lt;App /&gt;` y orquestado mediante React Router (`BrowserRouter`) con persistencia del panel Sidebar.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Componentes Reutilizables</strong>
                Modularización óptima de componentes altamente reutilizables como `CrewCard`, `ProjectCard` o `FilterBar`.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Estado Reactivo Declarativo</strong>
                Flujo de datos automatizado mediante hooks (`useState` y `useEffect`), desterrando la manipulación manual de nodos HTML.
              </ComparisonItem>
              <ComparisonItem>
                <strong>Navegación SPA de Alta Velocidad</strong>
                Transiciones instantáneas sin recarga mediante `&lt;NavLink /&gt;`, ofreciendo una experiencia inmersiva e ininterrumpida.
              </ComparisonItem>
            </ComparisonList>
          </AfterColumn>

          {/* Ventajas destacadas */}
          <AdvantagesBox>
            <AdvantagesHeader>
              <i className="fa-solid fa-circle-nodes"></i> Ventajas Clave de la Arquitectura
            </AdvantagesHeader>
            <AdvantagesGrid>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-shuttle-space" />
                <AdvantageContent>
                  <strong>1. Cero Duplicación</strong>
                  Eliminación total de código repetitivo compartiendo la plantilla de Layout para toda la nave.
                </AdvantageContent>
              </AdvantageItemCard>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-gauge-high" />
                <AdvantageContent>
                  <strong>2. SPA Ultra Veloz</strong>
                  Navegación instantánea en milisegundos sin parpadeos ni recargas de archivos estáticos pesados.
                </AdvantageContent>
              </AdvantageItemCard>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-puzzle-piece" />
                <AdvantageContent>
                  <strong>3. Componentes Fuertes</strong>
                  Diseño de bloques atómicos reutilizables: un solo componente de tripulante alimenta múltiples perfiles de forma paramétrica.
                </AdvantageContent>
              </AdvantageItemCard>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-wrench" />
                <AdvantageContent>
                  <strong>4. Mantenimiento Ágil</strong>
                  Estructura declarativa que permite corregir fallos o cambiar estilos en un único punto para ver el cambio de forma global.
                </AdvantageContent>
              </AdvantageItemCard>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-box" />
                <AdvantageContent>
                  <strong>5. Estilos Encapsulados</strong>
                  Uso de `styled-components` para encapsular CSS dentro del propio componente, erradicando conflictos colaterales.
                </AdvantageContent>
              </AdvantageItemCard>

              <AdvantageItemCard>
                <AdvantageBulletIcon className="fa-solid fa-arrows-spin" />
                <AdvantageContent>
                  <strong>6. Estado Predecible</strong>
                  Gestión declarativa del estado de la aplicación mediante React, reduciendo bugs críticos y mejorando el flujo de datos.
                </AdvantageContent>
              </AdvantageItemCard>

            </AdvantagesGrid>
          </AdvantagesBox>
        </ComparisonContainer>
      </SectionContainer>

      {/* SECCIÓN 4: BITÁCORA CRONOLÓGICA (H2) - MANTENIDA COMPLETAMENTE INTACTA */}
      <SectionContainer>
        <Header
          title="Línea de Tiempo de Misión"
          description="Órbita de desarrollo detallada día a día con las decisiones críticas de la tripulación interestelar."
          variant="tertiary"
          headingTag="h2"
          compact
        />
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
      </SectionContainer>
    </LogbookContainer>
  );
}

