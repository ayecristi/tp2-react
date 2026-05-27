import { useState } from 'react';
import styled from 'styled-components';

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

export default function ProjectCarousel({ projects }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? projects.length - 1 : prev - 1));

  return (
    <CarouselWrapper>
      <CarouselInner $currentSlide={currentSlide}>
        {projects.map((proj) => (
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
  );
}