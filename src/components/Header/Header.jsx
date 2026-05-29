import styled, { css } from 'styled-components';

const StyledHeader = styled.header`
  margin-bottom: ${({ $compact }) => $compact ? '2rem' : '3rem'};

  ${({ $sticky }) => $sticky && `
    border-bottom: 1px solid var(--outline-variant);
    padding-bottom: 2rem;
    position: sticky;
    left: 0;
  `}
`;

const titleStyles = css`
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: ${({ $variant }) => $variant === 'tertiary' ? 'var(--tertiary)' : 'var(--primary)'};
  text-shadow: ${({ $variant }) => $variant === 'tertiary'
    ? '0 0 15px rgba(0, 220, 229, 0.4)'
    : '0 0 10px rgba(255, 177, 196, 0.3)'};
`;

const TitleH1 = styled.h1`
  ${titleStyles}
`;

const TitleH2 = styled.h2`
  ${titleStyles}
`;

const Description = styled.p`
  color: var(--on-surface-variant);
  max-width: 700px;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export default function Header({ title, description, variant = 'primary', sticky = false, compact = false, headingTag = 'h1' }) {
  return (
    <StyledHeader $sticky={sticky} $compact={compact}>
      {headingTag === 'h2' ? (
        <TitleH2 $variant={variant}>{title}</TitleH2>
      ) : (
        <TitleH1 $variant={variant}>{title}</TitleH1>
      )}
      {description && <Description>{description}</Description>}
    </StyledHeader>
  );
}