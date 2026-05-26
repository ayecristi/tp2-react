## `<TP-Grupal-2>`

* **Trabajo Práctico Grupal 2**: Proyecto React en Equipo
* **Fecha de entrega:** 01/06/26
* **Formato de entrega:** Deberán publicar en la pestaña “Entrega TP2”, los siguientes links:
  * **Link al repositorio**, donde el docente revisará la carpeta de archivos y el read.me
  * **Link a la web publicada en Vercel**.
  * **Google Doc**: `https://docs.google.com/spreadsheets/d/19MkDTlzFpyaHIS9pCcaL5mHWc4qf-1ZCs9R8dRhG9
ME/edit?gid=2050921425#gid=2050921425`

> ⚠️ IMPORTANTE: los TP1 y TP2 deben ser repositorios independientes. 

--- 

### Objetivo General
El propósito de este trabajo es que, como equipo, desarrollen una página web utilizando **React**. Este proyecto representa una **evolución y continuación del Trabajo Práctico 1 (desarrollado originalmente solo con HTML, CSS y JS)**, migrando su estructura hacia una arquitectura de componentes. La aplicación debe incluir una portada con la presentación del equipo y un listado de estudiantes, donde cada uno cuente con una página individual gestionada mediante **React Router**. Se deberán aplicar buenas prácticas de organización, diseño adaptable, gestión de código en GitHub y el despliegue en Vercel. Como evolución final, se deben implementar mejoras de interfaz, búsqueda y componentes interactivos avanzados.

---

### Requerimientos Obligatorios:
#### Estructura y Contenidos del Proyecto
1. **Navegación Estilo Dashboard (Sidebar Fija)**

    **a. Interfaz Central:** La navegación debe estar regida por una **Sidebar lateral fija con estética de Dashboard**, que garantice el acceso a todas las secciones.

    **b. Componentes:** Debe integrar el logo del grupo y un menú de navegación jerarquizado mediante **React Router**.

    **c. Entidad:** No es un simple menú; es el eje estructural que organiza la experiencia de usuario (UX) en toda la SPA.

2. **Panel Central de Presentación (Dashboard Home)**

    **a.** Es el nodo principal de la aplicación. Debe presentar una grilla dinámica de tarjetas de acceso rápido para cada integrante del equipo.
    
    **b.** Cada tarjeta debe mostrar nombre completo y avatar (IA o mascota).
    
    **c. Mejora Técnica:** Implementación obligatoria de animaciones de entrada y transiciones suaves de carga para dar fluidez al sistema.

3. **Sección Individual por Integrante (Perfil Profesional)**: Vista detallada de cada estudiante que funciona como un "User Profile" dentro del sistema:

    **a. Barras de Progreso de Habilidades:** Componentes visuales animados que reflejen el stack técnico. 

    **b. Carrusel de Proyectos:** Galería interactiva con controles manuales para visualizar al menos 3 trabajos.

    **c. Tech Stack e Iconografía:** Mínimo 5 iconos representativos con efectos visuales.

    **d. Social Media:** Botones con efectos hover avanzados (cambio de color/escalado).

4. **Explorador de Datos Locales (JSON)**

    **a.** Renderización dinámica de un archivo JSON con 20 objetos.

    **b. Funcionalidad Crítica:** Implementar lógica de filtrado en tiempo real y un buscador por texto que actualice la vista dinámicamente en React.

5. **Módulo de Integración de API Externa**
  
    **a.** Consumo asíncrono de una API pública con manejo de estados de carga y error.
  
    **b. Paginación:** Sistema de navegación por páginas (Anterior/Siguiente) con indicador de posición actual.

6. **Galería de Imágenes Interactiva**

    **a.** Visualizador tipo Grid con funcionalidad de **Lightbox** integrada (zoom, navegación interna y cierre mediante tecla ESC).

7. **Sección Bitácora de Proyecto**

    **a.** Documentación técnica sobre roles y flujo de trabajo (GitFlow/Trello).
    
    **b. Justificación de Migración:** Análisis detallado del proceso de evolución de la estructura estática (HTML/JS) a la arquitectura de React.

8. **Sección Árbol de Renderizado (Arquitectura de Componentes)**

    **a. Requerimiento Técnico:** Es obligatorio incluir una representación gráfica o esquemática del Árbol de Renderizado del proyecto.

    **b. Contenido:** Se debe detallar la estructura jerárquica de la aplicación, identificando claramente el componente raíz (App), los componentes de nivel superior (Layout, Sidebar, Navbar) y cómo se desglosan los componentes hijos (Cards, Buttons, Modals, etc.).

#### Requerimiento Obligatorio: Archivo README.md
**EN CASO DE NO ENCONTRAR EL README COMPLETO EL PROYECTO QUEDA DESAPROBADO** El docente realizará la revisión del proyecto desde este archivo, por lo cual debe estar bien señalado, con links y capturas de pantalla. Debe incluir:

1. **Título del Proyecto:** Nombre del TP o equipo y link al deploy.
2. **Descripción:** Párrafo breve sobre el objetivo y funcionalidades básicas.
3. **Integrantes:** Nombre, apellido y link a sus perfiles de GitHub.
4. **Tecnologías Utilizadas:** Listado de lenguajes y recursos (React, HTML, CSS, Google Fonts, etc.).
5. **Estructura de Archivos:** Organización de carpetas (raíz, components, hooks, assets, etc.).
6. **Guía de Estilos:** Paleta de colores (Hexadecimales), Tipografías (Google Fonts con links) e Iconografía (librería usada).
7. **JavaScript/React:** Indicar las funciones dinámicas implementadas y componentes clave, incluyendo capturas de pantalla.
8. **Enlace al Proyecto Desplegado:** Link de Vercel.
9. **Evolución:** El README debe ser ampliado incorporando mejoras, cambios realizados y capturas que muestran el progreso.

---

### Requerimiento Obligatorio: Uso de IA
Detallar en el README.md las herramientas de Inteligencia Artificial utilizadas:
* **Herramientas:** Listado de modelos usados (ej. Gemini, ChatGPT, Copilot).
* **Uso en Contenido y Código:** Explicar qué textos se generaron y en qué problemas de lógica o debugging ayudó la IA.
* **Imágenes:** Especificar el modelo y criterio de prompt para avatares o logos.
* **Nota:** Se evaluará la capacidad para integrar la IA como asistente manteniendo la autoría del proyecto.
## `<TP-Grupal-2/>`