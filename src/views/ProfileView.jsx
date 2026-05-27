import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { crewData } from '../data/crewData';
import ProfileHeader from '../components/Profile/ProfileHeader';
import SkillList from '../components/Profile/SkillList';
import ProjectCarousel from '../components/Profile/ProjectCarousel';
import SocialLinks from '../components/Profile/SocialLinks';

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

    @media (min-width: 600px) { height: 450px; }
    @media (min-width: 900px) { height: 550px; }
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

const BottomGrid = styled(ContentGrid)``;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  color: var(--on-surface);
  text-transform: uppercase;
`;

// Countdown
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!profile) return;

    setDisplayedBio("");
    let i = 0;
    const bioText = profile.bio;
    const typeInterval = setInterval(() => {
      setDisplayedBio(bioText.substring(0, i + 1));
      i++;
      if (i >= bioText.length) clearInterval(typeInterval);
    }, 25);

    setShowSkills(false);
    const skillTimer = setTimeout(() => setShowSkills(true), 150);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(skillTimer);
    };
  }, [member, profile]);

  useEffect(() => {
    const targetDate = new Date('2026-12-31T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (10000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!profile) return <Navigate to="/404" replace />;

  const formatTime = (time) => time < 10 ? `0${time}` : time;

  return (
    <ProfileContainer>
      <ProfileCard>

        <LeftColumn>
          <img src={profile.image} alt={`Foto de ${profile.name}`} />
        </LeftColumn>

        <RightColumn>
          <ProfileHeader
            name={profile.name}
            role={profile.role}
            displayedBio={displayedBio}
          />

          <ContentGrid>
            <section>
              <SectionTitle>Misiones Destacadas</SectionTitle>
              <ProjectCarousel projects={profile.projects} />
            </section>

            <section>
              <SectionTitle>Stack Tecnológico</SectionTitle>
              <SkillList skills={profile.skills} show={showSkills} />
            </section>
          </ContentGrid>

          <BottomGrid>
            <section>
              <SectionTitle>Contacto</SectionTitle>
              <SocialLinks socials={profile.socials} />
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