import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { crewData } from '../data/crewData';

// --- COMPONENTES ESTILIZADOS ---

const ProfileContainer = styled.div`
  width: 100%;
  padding: 40px 1rem 80px 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 100px);
  
  @media (min-width: 900px) {
    padding: 60px 2rem;
  }
`;

const ProfileCard = styled.article`
  background: rgba(19, 19, 20, 0.8);
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 1200px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    box-shadow: 0 0 30px rgba(255, 177, 196, 0.15);
  }
`;

const LeftColumn = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--primary); 
  
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center; 
    display: block;

    @media (min-width: 600px) {
      height: 450px;
    }
    
    @media (min-width: 900px) {
      height: 550px;
    }
  }
`;

const RightColumn = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  @media (min-width: 900px) {
    padding: 3.5rem;
  }
`;

// Grillas responsivas para alinear el contenido en Desktop
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  gap: 3.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr; 
    gap: 3rem;
    align-items: start; 
  }
`;

// Usamos la misma lógica de grilla para la parte inferior
const BottomGrid = styled(ContentGrid)``; 

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  color: var(--on-surface);
  text-transform: uppercase;
`;

// --- SECCIÓN: BIO & HEADER ---
const HeaderSection = styled.div``;

const ProfileName = styled.h1`
  font-size: 2.8rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(255, 177, 196, 0.3);
`;

const ProfileRole = styled.h3`
  font-size: 1.1rem;
  color: var(--tertiary);
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

const ProfileBio = styled.p`
  color: var(--on-surface-variant);
  line-height: 1.7;
  font-size: 1.05rem;
  min-height: 80px; 
  &::after {
    content: '|';
    color: var(--primary);
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
`;

// --- SECCIÓN: BARRAS ANIMADAS & ÍCONOS ---
const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SkillIcon = styled.i`
  font-size: 2rem;
  color: var(--tertiary);
  width: 40px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 220, 229, 0.3);
`;

const SkillContent = styled.div`
  flex: 1;
`;

const SkillLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
  color: var(--on-surface);
`;

const SkillBarTrack = styled.div`
  width: 100%;
  height: 8px;
  background: var(--surface-low);
  border-radius: 4px;
  overflow: hidden;
`;

const SkillBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--tertiary));
  width: ${({ $show, $level }) => $show ? $level : 0}%;
  transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(255, 177, 196, 0.5);
`;

// --- SECCIÓN: CARRUSEL DE PROYECTOS ---
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--outline-variant);
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${({ $currentSlide }) => $currentSlide * 100}%);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
  }
`;

const ProjectTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(19, 19, 20, 0.85);
  backdrop-filter: blur(5px);
  padding: 1.2rem;
  text-align: center;
  color: var(--primary);
  font-weight: bold;
  border-top: 1px solid var(--primary);
  letter-spacing: 1px;
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 15px;
`;

const ControlBtn = styled.button`
  background: rgba(19, 19, 20, 0.8);
  color: var(--primary);
  border: 1px solid var(--primary);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background: var(--primary);
    color: #121212;
    transform: scale(1.1);
    box-shadow: 0 0 15px var(--primary);
  }
`;

// --- SECCIÓN: SOCIAL MEDIA & CONTADOR ---
const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--surface-low);
  color: var(--on-surface-variant);
  font-size: 1.6rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--outline-variant);

  &:hover {
    background: rgba(255, 177, 196, 0.1);
    color: var(--primary);
    border-color: var(--primary);
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 0 15px rgba(255, 177, 196, 0.4);
  }
`;

const CountdownWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(19, 19, 20, 0.5);
  border: 1px solid var(--tertiary);
  padding: 10px;
  border-radius: 8px;
  min-width: 65px;
  box-shadow: 0 0 10px rgba(0, 220, 229, 0.1);
`;

const TimeValue = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary);
  font-family: var(--font-headline);
  text-shadow: 0 0 10px rgba(255, 177, 196, 0.3);
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  color: var(--on-surface-variant);
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 1px;
`;

// --- VISTA PRINCIPAL ---

export default function ProfileView() {
  const { member } = useParams();
  const profile = crewData[member];
  
  const [displayedBio, setDisplayedBio] = useState("");
  const [showSkills, setShowSkills] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Estado del contador
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!profile) return;

    setCurrentSlide(0);

    // Animación Máquina de escribir
    setDisplayedBio("");
    let i = 0;
    const bioText = profile.bio;
    const typeInterval = setInterval(() => {
      setDisplayedBio(bioText.substring(0, i + 1));
      i++;
      if (i >= bioText.length) clearInterval(typeInterval);
    }, 25);

    // Animación Barras de Progreso
    setShowSkills(false);
    const skillTimer = setTimeout(() => setShowSkills(true), 150);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(skillTimer);
    };
  }, [member, profile]);

  // Lógica del contador regresivo
  useEffect(() => {
    // Fecha objetivo: 31 de Diciembre de 2026
    const targetDate = new Date('2026-12-31T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (10000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer(); // Llamada inicial
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!profile) return <Navigate to="/404" replace />;

  const nextSlide = () => setCurrentSlide(prev => (prev === profile.projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? profile.projects.length - 1 : prev - 1));

  // Función auxiliar para agregar ceros a la izquierda (ej: 09 en lugar de 9)
  const formatTime = (time) => time < 10 ? `0${time}` : time;

  return (
    <ProfileContainer>
      <ProfileCard>
        
        <LeftColumn>
          <img src={profile.image} alt={`Foto de ${profile.name}`} />
        </LeftColumn>
        
        <RightColumn>
          <HeaderSection>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileRole>{profile.role}</ProfileRole>
            <ProfileBio>{displayedBio}</ProfileBio>
          </HeaderSection>

          {/* Primera Grilla (Misiones y Stack) */}
          <ContentGrid>
            <section>
              <SectionTitle>Misiones Destacadas</SectionTitle>
              <CarouselWrapper>
                <CarouselInner $currentSlide={currentSlide}>
                  {profile.projects.map((proj) => (
                    <CarouselItem key={proj.id}>
                      <img src={proj.img} alt={proj.title} />
                      <ProjectTitle>{proj.title}</ProjectTitle>
                    </CarouselItem>
                  ))}
                </CarouselInner>
                <CarouselControls>
                  <ControlBtn onClick={prevSlide}><i className="fa-solid fa-chevron-left"></i></ControlBtn>
                  <ControlBtn onClick={nextSlide}><i className="fa-solid fa-chevron-right"></i></ControlBtn>
                </CarouselControls>
              </CarouselWrapper>
            </section>

            <section>
              <SectionTitle>Stack Tecnológico</SectionTitle>
              <SkillsContainer>
                {profile.skills.map((skill, index) => (
                  <SkillRow key={index}>
                    <SkillIcon className={skill.icon}></SkillIcon>
                    <SkillContent>
                      <SkillLabel>
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </SkillLabel>
                      <SkillBarTrack>
                        <SkillBarFill $show={showSkills} $level={skill.level} />
                      </SkillBarTrack>
                    </SkillContent>
                  </SkillRow>
                ))}
              </SkillsContainer>
            </section>
          </ContentGrid>

          {/* Segunda Grilla (Contacto y Próximo Show) */}
          <BottomGrid>
            <section>
              <SectionTitle>Contacto</SectionTitle>
              <SocialContainer>
                {profile.socials.map((social, index) => (
                  <SocialBtn key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                    <i className={social.icon}></i>
                  </SocialBtn>
                ))}
              </SocialContainer>
            </section>

            <section>
              <SectionTitle>Próximo Show</SectionTitle>
              <CountdownWrapper>
                <TimeBox>
                  <TimeValue>{formatTime(timeLeft.days)}</TimeValue>
                  <TimeLabel>Días</TimeLabel>
                </TimeBox>
                <TimeBox>
                  <TimeValue>{formatTime(timeLeft.hours)}</TimeValue>
                  <TimeLabel>Hs</TimeLabel>
                </TimeBox>
                <TimeBox>
                  <TimeValue>{formatTime(timeLeft.minutes)}</TimeValue>
                  <TimeLabel>Min</TimeLabel>
                </TimeBox>
                <TimeBox>
                  <TimeValue>{formatTime(timeLeft.seconds)}</TimeValue>
                  <TimeLabel>Seg</TimeLabel>
                </TimeBox>
              </CountdownWrapper>
            </section>
          </BottomGrid>

        </RightColumn>
      </ProfileCard>
    </ProfileContainer>
  );
}
