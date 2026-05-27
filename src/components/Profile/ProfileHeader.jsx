import styled from 'styled-components';

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

export default function ProfileHeader({ name, role, displayedBio }) {
  return (
    <HeaderSection>
      <ProfileName>{name}</ProfileName>
      <ProfileRole>{role}</ProfileRole>
      <ProfileBio>{displayedBio}</ProfileBio>
    </HeaderSection>
  );
}