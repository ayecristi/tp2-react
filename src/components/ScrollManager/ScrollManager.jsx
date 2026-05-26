import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si hay un "ancla" (hash), esperamos un microsegundo a que la vista cargue y scrolleamos ahí
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si cambiamos de ruta sin ancla, scrolleamos automáticamente arriba de todo
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null; // No renderiza absolutamente nada en el DOM
}