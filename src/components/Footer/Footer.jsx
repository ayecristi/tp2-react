import styled from 'styled-components';

// --- COMPONENTES ESTILIZADOS (CSS-in-JS) ---

const StyledFooter = styled.footer`
  display: none; /* Oculto en mobile por defecto para no tapar la nav bar inferior */
  margin-top: auto; /* Empuja el footer al fondo si el contenido es corto */
  padding: 2rem 1rem;
  background: var(--bg-color);
  border-top: 1px solid var(--outline-variant);
  font-family: var(--font-headline);
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--on-surface);

  @media (min-width: 900px) {
    display: block; /* Se muestra a partir de tablets y desktop */
  }
`;

const FooterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FooterItem = styled.div`
  /* Estilos base para los textos del footer */
`;

const BrandItem = styled(FooterItem)`
  color: var(--primary);
  font-weight: bold;
`;

// --- COMPONENTE PRINCIPAL ---

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterItem>EARTH - 2026</FooterItem>
        <FooterItem>IFTS 29 - DESARROLLO FRONTEND</FooterItem>
        <BrandItem>&lt; ROCKDEVS /&gt;</BrandItem>
      </FooterContainer>
    </StyledFooter>
  );
}
