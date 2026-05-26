import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  display: block;
  height: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
`;

const CardArticle = styled.article`
  background: var(--surface-low);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid var(--primary);
  box-shadow: 0 0 15px rgba(255, 177, 196, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(255, 177, 196, 0.6);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  max-height: calc(100vh - 320px);
  object-fit: cover;
  object-position: top center;
  display: block;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: var(--surface-high);
  border-top: 1px solid var(--primary);
  flex-grow: 1;
`;

const NameLabel = styled.span`
  color: var(--primary);
  font-family: var(--font-headline);
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(255, 177, 196, 0.3);
  width: 100%;
  display: block;
  text-align: center;
  background: transparent;
  border: 1px solid var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
`;

export default function CrewCard({ memberId, imgSrc, altText, label }) {
  return (
    <CardLink to={`/profile/${memberId}`}>
      <CardArticle>
        <CardImage src={imgSrc} alt={altText} />
        <NameContainer>
          <NameLabel>{label}</NameLabel>
        </NameContainer>
      </CardArticle>
    </CardLink>
  );
}
