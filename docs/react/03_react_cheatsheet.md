# ⚛️ Resumen: Estilos, PropTypes y Enrutamiento en React

## 1. Patrones de Componentes: Contenedores vs. Presentacionales
Este es un patrón clásico para separar la lógica de la interfaz de usuario.

* **Presentacionales (Dumb/UI):** Solo se encargan de cómo se ven las cosas. Reciben datos por `props` y no manejan estados complejos ni llamadas a APIs.
* **Contenedores (Smart/Logic):** Se encargan de cómo funcionan las cosas. Manejan el estado, llaman a las APIs y pasan la información a los presentacionales.

> **Perspectiva Actual de la Industria:** Hoy en día, en lugar de usar "Componentes Contenedores", la lógica se extrae utilizando **Custom Hooks** (ej. `useUsuarios()`), permitiendo que el componente funcional sea limpio y directo sin necesidad de tanta anidación.

---

## 2. Estrategias de Estilos CSS en React
React permite múltiples enfoques para estilizar componentes. 
### A. Estilos en Línea (Inline Styles)
Se aplican directamente usando un objeto JavaScript. Se usa *camelCase* en lugar de kebab-case (ej. `backgroundColor` en vez de `background-color`).
* **Uso moderno:** Ideal para valores dinámicos que cambian constantemente (ej. un `width` en una barra de progreso), pero **no** recomendado para maquetación completa por su falta de escalabilidad y ausencia de pseudoclases (`:hover`).

```javascript
const Progreso = ({ porcentaje }) => {
  return (
    // Ejemplo funcional moderno con estilos dinámicos
    <div style={{ width: `${porcentaje}%`, backgroundColor: "blue" }}>
      {porcentaje}%
    </div>
  );
};
```

### B. Hojas de Estilo Externas y SASS
Se importa un archivo CSS o SCSS clásico (`import './styles.css'`).

* **Desventaja:** Los estilos son globales. Si dos componentes usan la clase .card, colisionarán. La metodología BEM (que usamos en nuestro proyecto) es crucial aquí para evitar conflictos.

### C. CSS Modules
Crea estilos con alcance (scope) local al componente. El archivo debe llamarse Componente.module.css.

* **Ventaja:** Genera clases con nombres únicos aleatorios, haciendo imposible que colisionen.

### D. Styled-Components (CSS-in-JS)
Librería que permite escribir CSS directamente dentro de JavaScript usando template literals.

* **Ventaja:** Encapsulación total y permite pasar props dinámicas al CSS.

---

## 3. Integración de Bootstrap
Bootstrap puede integrarse de dos formas:

* **Por Clases:** Importando el CSS global de Bootstrap y usando className="btn btn-primary".
* **React-Bootstrap:** Instalando la librería y usando componentes prefabricados (`<Button variant="primary">`). Esta es la forma más "React-friendly".

---

## 4. PropTypes (Validación de Props)
Las `PropTypes` ayudan a validar que los datos que recibe un componente sean del tipo correcto (String, Number, Array, etc.) o si son obligatorios (`isRequired`). Si los datos no coinciden, React arrojará una advertencia en la consola de desarrollo.

> ⚠️ ESTO EN LA DOCUMENTACIÓN ESTÁ DESACTUALIZADO:
La documentación sugiere inicializar proyectos con create-react-app para usar PropTypes. Hoy usamos Vite. Además, la industria actual ha sustituido masivamente PropTypes por TypeScript, el cual hace esta validación a nivel de compilación y no de ejecución.

**Ejemplo Funcional con PropTypes:**
```javascript
import PropTypes from 'prop-types';

const UserCard = ({ name, age, email }) => (
  <div className="card">
    <h3>{name}</h3>
    <p>Edad: {age}</p>
    {email && <p>Email: {email}</p>}
  </div>
);

// Validación de tipos
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string // Opcional
};
```

---

## 5. Enrutamiento con React Router v6
React Router permite construir SPAs (Single Page Applications) cambiando las vistas sin recargar la página del navegador.

### Componentes Clave
* `<BrowserRouter>`: Envuelve la aplicación y gestiona el historial de la URL.
* `<Routes>` y `<Route>`: Definen qué componente se renderiza en cada path (ruta).
* `<Link>` y `<NavLink>`: Navegación declarativa. `NavLink` permite aplicar estilos cuando la ruta está activa.
* `<Outlet>`: Componente especial que sirve como "marcador de posición" para renderizar sub-rutas (rutas anidadas) dentro de un Layout padre.

### Rutas Dinámicas (`useParams`)
Permiten capturar valores variables de la URL (ej. `/articulos/:id`).
```javascript
import { useParams } from 'react-router-dom';

const Articulo = () => {
  const { id } = useParams(); // Captura el ':id' de la URL
  return <h2>Mostrando el artículo número: {id}</h2>;
};
```

### Parámetros de Consulta (`useSearchParams`)
Maneja las variables después del ? en la URL (ej. `/movies?genre=accion`).
```javascript
import { useSearchParams } from 'react-router-dom';

const FiltroPeliculas = () => {
  const [searchParams] = useSearchParams();
  const genero = searchParams.get("genre"); // Devuelve "accion"
  
  return <h2>Filtrando por: {genero || 'Todos'}</h2>;
};
```

### Navegación Programática (`useNavigate` y `Maps`)
* `useNavigate()`: Hook para redirigir tras un evento (ej. después de un login exitoso).
* `<Navigate />`: Componente para redirigir automáticamente al renderizarse (útil para proteger rutas privadas).
```javascript
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de validación aquí...
    navigate('/dashboard'); // Redirección automática
  };

  return <button onClick={handleLogin}>Ingresar</button>;
};
```
