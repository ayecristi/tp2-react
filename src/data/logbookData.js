export const logbookData = [
    {
        date: "EARTH_2026_04.01",
        title: "El despegue (Inicio del proyecto)",
        icon: "fa-solid fa-rocket",
        markerClass: "default",
        description: "Nos reunimos por primera vez para definir la temática y el rumbo de nuestro proyecto. Al compartir ideas, nos dimos cuenta de que todos compartíamos una fuerte pasión por dos cosas: la música y la ciencia ficción. Así nació la idea de diseñar el sitio para una banda de rock espacial."
    },
    {
        date: "EARTH_2026_04.05",
        title: "Diseño de la nave (MockUp con Stitch IA)",
        icon: "fa-solid fa-palette",
        markerClass: "tertiary",
        description: "Comenzamos a generar las vistas visuales del sitio a través de la iteración de prompts utilizando Stitch IA. Tuvimos especial cuidado en diseñar interfaces que respetaran estrictamente los tres breakpoints suministrados por los requerimientos: 400px (Mobile), 900px (Tablet) y 1200px (Desktop)."
    },
    {
        date: "EARTH_2026_04.10",
        title: "Traducción de sistemas (Pasaje a código)",
        icon: "fa-solid fa-code",
        markerClass: "primary-container",
        description: "Stitch IA nos devolvió la estructura inicial en HTML y Tailwind CSS. Nuestro trabajo, en conjunto con Gemini Pro 3.1, fue refactorizar todo el código para construir la web utilizando únicamente HTML semántico y Vanilla CSS, eliminando por completo la dependencia de librerías externas y realizando una revisión inicial exhaustiva del código."
    },
    {
        date: "EARTH_2026_04.14",
        title: "Ajuste de coordenadas (Iteración con IA)",
        icon: "fa-solid fa-robot",
        markerClass: "default", 
        description: "El núcleo del trabajo fue la iteración constante para pulir la maquetación y acercarnos al objetivo. Tuvimos que realizar un trabajo iterativo mucho más profundo y detallado en la vista de perfiles (profile.html), ya que la disposición de los elementos cambiaba de manera muy agresiva entre los distintos breakpoints."
    },
    {
        date: "EARTH_2026_04.18",
        title: "Pulido de escudos (Detalles manuales)",
        icon: "fa-solid fa-screwdriver-wrench",
        markerClass: "tertiary",
        description: "Para alcanzar la máxima calidad visual, tuvimos que 'meter mano' directamente en el código. Revisamos, ajustamos paddings, corregimos flujos de Flexbox y pulimos detalles a mano dentro de los archivos para lograr una fidelidad lo más cercana posible a los mockups originales."
    },
    {
        date: "EARTH_2026_04.22",
        title: "Registro de misión (Realización de la bitácora)",
        icon: "fa-solid fa-book-journal-whills",
        markerClass: "primary-container",
        description: "Desarrollamos esta misma sección que estás leyendo. Implementamos lógica en JavaScript para que estas tarjetas de la bitácora se inyecten dinámicamente en el DOM a partir de un objeto JSON, permitiéndonos escalar el registro sin tocar el HTML."
    },
    {
        date: "EARTH_2026_05.01",
        title: "Fase 1: Salto Hiperespacial a React (Enrutamiento)",
        icon: "fa-solid fa-route",
        markerClass: "default",
        description: "Iniciamos la migración de nuestra arquitectura estática a una Single Page Application (SPA). Implementamos React Router (BrowserRouter, Routes, Route) para navegar entre los módulos de la nave sin recargar el sistema de soporte vital, definiendo el esqueleto de nuestras rutas anidadas."
    },
    {
        date: "EARTH_2026_05.08",
        title: "Fase 2: Nuevo Panel de Control (Arquitectura Dashboard)",
        icon: "fa-solid fa-table-columns",
        markerClass: "tertiary",
        description: "Reestructuramos el Layout principal de la nave. Abandonamos el encabezado superior e implementamos una Sidebar lateral fija para pantallas grandes, manteniendo intacta nuestra barra de navegación inferior para móviles. Además, integramos styled-components para encapsular nuestro motor CSS."
    },
    {
        date: "EARTH_2026_05.15",
        title: "Fase 3: Ensamblaje Modular (Migración de Vistas)",
        icon: "fa-solid fa-cubes",
        markerClass: "primary-container",
        description: "Transformamos nuestras páginas de Vanilla JS en componentes reactivos de alta eficiencia. Modularizamos el componente Hero (restaurando el Glassmorphism y la imagen fixed) y aplicamos mapeos de arreglos para renderizar dinámicamente la tripulación y esta misma bitácora."
    },
    {
        date: "EARTH_2026_05.20",
        title: "Fase 4: Archivos Clasificados (Rutas Dinámicas)",
        icon: "fa-solid fa-id-card-clip",
        markerClass: "default",
        description: "Avanzamos con la implementación de rutas dinámicas paramétricas (/profile/:member). Centralizamos la vista de perfiles para que un solo componente interprete la URL y cargue la biografía, el rol y la configuración de audio específica de cada tripulante sin duplicar código."
    },
    {
        date: "EARTH_2026_05.26",
        title: "Fase 5: Estabilización de Órbita (Pulido y Componentización)",
        icon: "fa-solid fa-satellite-dish",
        markerClass: "tertiary",
        description: "Eliminamos desbordes invisibles de overflow, estabilizamos el comportamiento position: fixed de la barra de navegación y aseguramos la total fidelidad visual respecto a los mockups originales. Los sistemas están optimizados, la SPA es estable y la misión es un éxito absoluto."
    },
    {
        date: "FUTURE_UNKNOWN",
        title: "Esta historia continuará...",
        icon: "fa-solid fa-meteor",
        markerClass: "default",
        description: "El universo es vasto y el código infinito. La estructura está lista y la nave está en órbita, pero nuestro viaje de desarrollo frontend recién está comenzando. Seguimos optimizando los motores para nuestro próximo salto hiperespacial."
    }
];