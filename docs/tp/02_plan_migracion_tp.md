## 🗺️ Plan de Migración: TP1 (HTML/CSS/JS) a TP2 (React)

### 📈 Diagrama del Flujo de Trabajo
Este es el orden técnico que seguiremos:

#### 🟢 FASE 1: Configuración del Entorno y Arterias de la SPA (Enrutamiento)
*El objetivo de esta fase es configurar herramientas y asegurar que la navegación entre páginas no requiera recargar el navegador.*

1. **Inicialización con Vite:** Ignoramos por completo el obsoleto Create React App (CRA) y creamos el entorno limpio ejecutando `npm create vite@latest interstellar-rockdevs -- --template react`.
    * Instalamos las dos librerías troncales requeridas para el desarrollo técnico: `npm install react-router-dom@6 prop-types`.
2. **Definición del Sistema de Enrutamiento Declarativo:**
    * Configuramos el componente raíz App.jsx envolviéndolo en `<BrowserRouter>`.
    * Definimos las Rutas Estáticas y las Rutas Dinámicas parametrizadas usando el operador `:` de React Router para heredar la lógica que teníamos en JavaScript nativo:
        * `/` -> `<DashboardHome />` (Ex-portada)
        * `/profile/:member` -> `<UserProfile />` (Ex-perfil dinámico por URL)
        * `/logbook` -> <ProjectLogbook /> (Ex-bitácora)
        * `/concerts` -> `<ConcertsExplorer />` (Nueva sección: Explorador JSON)
        * `/space-gallery` -> `<SpaceGallery />` (Nueva sección: API + Lightbox)
        * `*` -> `<NotFound />` (Manejo de errores/rutas inexistentes)

#### 🟡 FASE 2: Diseño de Interfaz Estructural (Layout y Sidebar Fija)
*Rompemos la maquetación del TP1 para adaptarnos al requerimiento obligatorio de una visualización estilo Dashboard.*

1. **Creación del Componente `<Layout />`:**
    * Diseñamos un componente contenedor estructural que dividirá la pantalla en dos grandes regiones mediante **CSS Grid / Flexbox** para que la Sidebar conviva armoniosamente con las vistas.
    * Colocamos el componente `<Outlet />` de React Router en el sector central para indicar el lugar exacto donde se renderizará cada sección de forma dinámica.
2. **Construcción de la Sidebar Lateral Fija (`<Sidebar />`):**
    * Traducimos las clases globales del antiguo `<header class="header">` al menú lateral.
    * Reemplazamos las etiquetas clásicas `<a>` por componentes `<NavLink>` de React Router, aprovechando la prop `isActive` para inyectar nuestra clase de acento neón cyan (`--tertiary`) de forma nativa sin usar scripts manuales.
    * **Adaptación Responsiva Crítica:** Evaluando tus breakpoints originales (400px, 900px, 1200px), en resoluciones menores a 900px la Sidebar lateral mutará automáticamente mediante Media Queries a una barra de navegación inferior (`.nav-mobile`), respetando al 100% la UX/UI móvil que ya tenías aprobada.

#### 🟠 FASE 3: Modularización de Vistas Existentes (Migración Atómica)
*Tomamos el HTML estático e inyectamos la lógica reactiva en los componentes heredados del TP1.*

1. **Migración de la Portada (`<DashboardHome />`):**
    * Trasladamos el código del Hero, el ecualizador y las tarjetas de la tripulación.
    * **Componentización del Reproductor Sónico:** Convertimos el script js/index.js en lógica interna de React. Reemplazamos las manipulaciones directas del DOM por un estado booleano `const [isPlaying, setIsPlaying] = useState(false)` y una referencia mutable `useRef()` para controlar la etiqueta `<audio>` de manera controlada y segura.
2. Migración de la Bitácora (`<ProjectLogbook />`):
    * Trasladamos el array `logbookData` de `js/logbook.js` a un archivo local de datos (`data/logbook.json`).
    * Usamos el método `.map()` dentro del JSX para renderizar dinámicamente cada nodo de la línea de tiempo, garantizando código limpio y escalable.
3. **Migración del Perfil de Usuario (`<UserProfile />`):**
    * Recuperamos la lectura del parámetro dinámico de la URL mediante el hook `useParams() (const { member } = useParams())`.
    * **Traducción de Características Individuales (Features):**
        * Convertimos la animación de barras de Ayelen en un efecto controlado por un Hook personalizado o un estado gatillado al renderizar.
        * Traducimos el efecto Typewriter de Lucio usando un bucle con `useEffect` y un estado de caracteres.
        * Convertimos el Countdown de Matias en un efecto reactivo que descuente el tiempo con un `setInterval` nativo de React, limpiándolo en la función de *cleanup* del efecto para evitar fugas de memoria (*memory leaks*).
    * Reemplazamos los acordeones basados en inputs y checkboxes ocultos por componentes accesibles basados en estado reactivo `(const [isOpen, setIsOpen] = useState(false))`.

#### 🔴 FASE 4: Desarrollo de Nuevas Funcionalidades desde Cero
*Atacamos los requerimientos obligatorios del TP2 que no existían en el TP1, dándoles coherencia temática con nuestro universo musical-espacial.*

1. **Explorador de Datos Locales (`<ConcertsExplorer />`):**
    * **Propuesta Temática:** Creamos una sección dedicada al "Tour Galáctico 2026" del grupo.
    * **Implementación Técnica:** Creamos un archivo `data/concerts.json` con 20 objetos que detallen los conciertos (ID, Planeta/Base, Fecha estelar, Precio en créditos, Capacidad de la nave y Estado del show).
    * Desarrollamos un buscador por texto (`input type="text"`) y un selector de filtrado por categoría (ej. filtrar por cuadrante espacial o disponibilidad de entradas), utilizando estados cruzados en React para actualizar la vista en tiempo real a medida que el usuario escribe.
2. **Módulo de API Externa y Galería Interactiva (`<SpaceGallery />`):**
    * **Propuesta Temática:** Sección de *"Inspiración Cósmica / Postales del Espacio Deep"*.
    * **Implementación Técnica (Consumo de API):** Consumo de forma asíncrona de la API pública de la **NASA (APOD - Astronomy Picture of the Day)** o la de **Unsplash (búsqueda: Space/Cyberpunk)** mediante `fetch` o `axios` dentro de un `useEffect`.
    * Manejo estricto de tres estados reactivos para cumplir la consigna: `loading` (pantalla de carga con estética de escaneo orbital), `error` (mensaje de error estilizado por si falla la conexión) y `data` (las imágenes obtenidas).
    * **Galería Interactiva con Lightbox:** Renderizamos las fotos en un contenedor CSS Grid responsivo. Al hacer clic en una imagen, se abrirá un componente modal flotante (Lightbox) que permitirá hacer zoom, navegar entre la imagen anterior y siguiente mediante botones, y se cerrará automáticamente al presionar la tecla `ESC` escuchando el evento global `keydown` de la ventana.

#### 🔵 FASE 5: Arquitectura, Documentación y Despliegue Final
*La fase de cierre, generamos el árbol de renderizado y ampliamos la documentación del proyecto (`readme.MD`).*

1. **Árbol de Renderizado Dinámico:**
    * Utilizamos herramientas de visualización de dependencias (ej, **React Sight**, **Arboreal** o **Dependency Cruise**) directamente sobre la carpeta `src/`. Esto nos generará un esquema gráfico exacto del árbol de componentes (desde `App` pasando por `Layout`, `Sidebar`, hasta los hijos atómicos como `Card`, `ProgressBar` y `LightboxButton`).
2. **Ampliación del Archivo `README.md:`**
    * Tomamos el README que diseñamos en el TP1 y lo elevamos a la versión del TP2.
    * Documentamos minuciosamente la **Estructura de Carpetas de React** (`/components`, `/hooks`, `/context`, `/assets`).
    * Detallamos el funcionamiento de las nuevas funciones asíncronas y los Hooks implementados (`useState`, `useEffect`, `useParams`, `useSearchParams`), adjuntando las capturas de pantalla correspondientes.
    * Completamos la sección del **Uso ético y técnico de la IA**, explicando cómo Gemini intervino en el debugging y refactorización hacia la lógica declarativa de React.
3. **Despliegue e Integración Continua en Vercel:**
    * Conectamos el nuevo repositorio independiente de GitHub a Vercel.
    * Configuramos las variables de entorno en el panel de Vercel (si se requiere una API Key para las imágenes del espacio) y confirmamos el despliegue exitoso para obtener el link de producción final.
