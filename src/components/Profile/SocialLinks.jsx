import styled from 'styled-components';

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

export default function SocialLinks({ socials }) {
  return (
    <SocialContainer>
      {socials.map((social, index) => (
        <SocialBtn key={index} href={social.url} target="_blank" rel="noopener noreferrer">
          <i className={social.icon}></i>
        </SocialBtn>
      ))}
    </SocialContainer>
  );
}