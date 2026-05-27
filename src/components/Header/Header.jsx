import styled from 'styled-components';

const StyledHeader = styled.header`
  margin-bottom: ${({ $compact }) => $compact ? '2rem' : '3rem'};

  ${({ $sticky }) => $sticky && `
    border-bottom: 1px solid var(--outline-variant);
    padding-bottom: 2rem;
    position: sticky;
    left: 0;
  `}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: ${({ $variant }) => $variant === 'tertiary' ? 'var(--tertiary)' : 'var(--primary)'};
  text-shadow: ${({ $variant }) => $variant === 'tertiary'
    ? '0 0 15px rgba(0, 220, 229, 0.4)'
    : '0 0 10px rgba(255, 177, 196, 0.3)'};
`;

const Description = styled.p`
  color: var(--on-surface-variant);
  max-width: 700px;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export default function Header({ title, description, variant = 'primary', sticky = false, compact = false }) {
  return (
    <StyledHeader $sticky={sticky} $compact={compact}>
      <Title $variant={variant}>{title}</Title>
      {description && <Description>{description}</Description>}
    </StyledHeader>
  );
}