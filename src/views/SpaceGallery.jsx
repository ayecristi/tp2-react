import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// --- COMPONENTES ESTILIZADOS ---

const GalleryContainer = styled.div`
  width: 100%;
  padding: 40px 1rem 80px 1rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);

  @media (min-width: 900px) {
    padding: 60px 2rem;
  }
`;

const HeaderSection = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: var(--primary);
  text-shadow: 0 0 15px rgba(255, 177, 196, 0.4);
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  color: var(--on-surface-variant);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

// --- ESTADOS: CARGA Y ERROR ---
const spin = keyframes`
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const Radar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--tertiary);
  position: relative;
  box-shadow: 0 0 20px rgba(0, 220, 229, 0.2);
  animation: ${pulse} 2s infinite ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--tertiary));
    transform-origin: left center;
    animation: ${spin} 1.5s linear infinite;
  }
`;

const LoaderText = styled.p`
  margin-top: 1.5rem;
  color: var(--tertiary);
  font-family: var(--font-headline);
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: ${pulse} 2s infinite;
`;

const ErrorContainer = styled.div`
  background: rgba(255, 77, 77, 0.1);
  border: 2px solid #ff4d4d;
  color: #ff4d4d;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 0 20px rgba(255, 77, 77, 0.2);

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

// --- GRID Y TARJETAS ---
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border: 1px solid var(--outline-variant);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(19, 19, 20, 0);
    transition: background 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover::after {
    background: rgba(0, 220, 229, 0.2);
  }

  .title-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(to top, rgba(19, 19, 20, 0.9), transparent);
    color: var(--on-surface);
    font-size: 0.9rem;
    font-weight: bold;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 2;
  }

  &:hover .title-overlay {
    transform: translateY(0);
  }
`;

// --- CONTROLES DE PAGINACIÓN ---
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const PageBtn = styled.button`
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 10px 20px;
  border-radius: 6px;
  font-family: var(--font-headline);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    border-color: var(--outline-variant);
    color: var(--outline-variant);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: var(--primary);
    color: #121212;
    box-shadow: 0 0 15px var(--primary);
  }
`;

const PageIndicator = styled.span`
  color: var(--on-surface);
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

// --- LIGHTBOX MODAL ---
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0; 
  background: rgba(19, 19, 20, 0.95);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(0, 220, 229, 0.3);
  }

  .caption {
    margin-top: 1rem;
    color: var(--on-surface);
    text-align: center;
    font-size: 1.2rem;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
    text-shadow: 0 0 10px var(--primary);
  }
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(19, 19, 20, 0.5);
  border: 1px solid var(--tertiary);
  color: var(--tertiary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  left: ${({ $dir }) => ($dir === 'prev' ? '-60px' : 'auto')};
  right: ${({ $dir }) => ($dir === 'next' ? '-60px' : 'auto')};

  &:hover {
    background: var(--tertiary);
    color: #121212;
    box-shadow: 0 0 15px var(--tertiary);
  }

  @media (max-width: 1100px) {
    left: ${({ $dir }) => ($dir === 'prev' ? '10px' : 'auto')};
    right: ${({ $dir }) => ($dir === 'next' ? '10px' : 'auto')};
  }
`;

// --- VISTA PRINCIPAL ---

export default function SpaceGallery() {
  // Estados de API
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Cantidad de fotos por pantalla

  // Estado del Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 1. Descarga del lote de imágenes al montar
  useEffect(() => {
    const fetchNasaImages = async () => {
      try {
        setIsLoading(true);
        // Descargamos 48 archivos (4 páginas de 12 imágenes)
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=48');
        
        // Filtramos para evitar los videos (YouTube embeds) que envía la NASA a veces
        const imageOnlyData = response.data.filter(item => item.media_type === 'image');
        
        setAllImages(imageOnlyData);
        setError(null);
      } catch (err) {
        console.error("Error API NASA:", err);
        setError("Se perdió la comunicación con el satélite. No pudimos descargar la telemetría visual. Intentá de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNasaImages();
  }, []);

  // 2. Lógica de Paginación Derivada
  const totalPages = Math.ceil(allImages.length / itemsPerPage);
  
  // Recortamos el array original para obtener solo las fotos de la página actual
  const currentImages = allImages.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // 3. Lógica del Lightbox vinculada a la página actual
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const showNextImage = () => {
    setLightboxIndex(prev => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const showPrevImage = () => {
    setLightboxIndex(prev => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  return (
    <GalleryContainer>
      <HeaderSection>
        <PageTitle>Inspiración Cósmica</PageTitle>
        <PageDescription>
          Postales del espacio profundo capturadas directamente desde la base de datos oficial de la NASA. Explorá nuestra galería paginada.
        </PageDescription>
      </HeaderSection>

      {/* ESTADO 1: CARGANDO */}
      {isLoading && (
        <LoaderContainer>
          <Radar />
          <LoaderText>Interceptando Señal Orbital...</LoaderText>
        </LoaderContainer>
      )}

      {/* ESTADO 2: ERROR */}
      {error && !isLoading && (
        <ErrorContainer>
          <i className="fa-solid fa-satellite-dish fa-fade"></i>
          <h2>Error de Conexión</h2>
          <p>{error}</p>
        </ErrorContainer>
      )}

      {/* ESTADO 3: DATA (GALERÍA + PAGINACIÓN) */}
      {!isLoading && !error && currentImages.length > 0 && (
        <>
          <Grid>
            {currentImages.map((img, index) => (
              // Pasamos el índice actual relativo a la página renderizada
              <ImageCard key={img.url} onClick={() => setLightboxIndex(index)}>
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="title-overlay">{img.title}</div>
              </ImageCard>
            ))}
          </Grid>

          {/* CONTROLES DE PAGINACIÓN */}
          <PaginationContainer>
            <PageBtn onClick={goToPrevPage} disabled={currentPage === 1}>
              <i className="fa-solid fa-chevron-left"></i> Anterior
            </PageBtn>
            
            <PageIndicator>
              Página {currentPage} de {totalPages}
            </PageIndicator>
            
            <PageBtn onClick={goToNextPage} disabled={currentPage === totalPages}>
              Siguiente <i className="fa-solid fa-chevron-right"></i>
            </PageBtn>
          </PaginationContainer>
        </>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && currentImages[lightboxIndex] && (
        <LightboxOverlay onClick={(e) => {
          if(e.target === e.currentTarget) setLightboxIndex(null);
        }}>
          <LightboxContent>
            <CloseBtn onClick={() => setLightboxIndex(null)}>
              <i className="fa-solid fa-xmark"></i>
            </CloseBtn>
            
            <img src={currentImages[lightboxIndex].hdurl || currentImages[lightboxIndex].url} alt={currentImages[lightboxIndex].title} />
            <div className="caption">{currentImages[lightboxIndex].title}</div>
            
            <NavBtn $dir="prev" onClick={showPrevImage}>
              <i className="fa-solid fa-chevron-left"></i>
            </NavBtn>
            <NavBtn $dir="next" onClick={showNextImage}>
              <i className="fa-solid fa-chevron-right"></i>
            </NavBtn>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </GalleryContainer>
  );
}
