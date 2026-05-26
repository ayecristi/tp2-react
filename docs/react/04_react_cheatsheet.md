# Resumen Completo: APIs y Manejo de Estado en React

## 1. Introducción a las APIs y Arquitectura REST
Una **API (Application Programming Interface)** es un conjunto de reglas que permite la comunicación entre diferentes aplicaciones. En el desarrollo frontend, actúan como un puente que separa nuestra interfaz de usuario (el cliente) de la base de datos y la lógica del servidor (el backend).

Las APIs modernas suelen basarse en el estilo arquitectónico **REST (Representational State Transfer)**, el cual se rige por principios estrictos:
* **Recursos y URIs:** Todo es un recurso (usuarios, proyectos) identificable por una URL única.
* **Representación:** Los datos se negocian y transfieren típicamente en formatos ligeros como JSON o XML.
* **Sin estado (Stateless):** Cada petición es independiente y debe contener toda la información necesaria para ser procesada; el servidor no guarda memoria de las peticiones anteriores.
* **Cacheabilidad:** Las respuestas pueden almacenarse en caché para optimizar el rendimiento del servidor.

## 2. El Protocolo HTTP: Métodos y Estados
La comunicación con la API se realiza mediante peticiones HTTP (Request) y respuestas (Response).

### Métodos HTTP (Verbos)
Definen la intención de la operación:
* **GET:** Solicita la lectura de un recurso. No modifica la base de datos.
* **POST:** Crea un nuevo recurso. Envía datos en el cuerpo (body) de la petición.
* **PUT / PATCH:** Actualiza o modifica un recurso existente.
* **DELETE:** Elimina un recurso del servidor.

### Códigos de Estado (Status Codes)
Indican el resultado numérico de nuestra petición:
* **1xx:** Informativos (el proceso continúa).
* **2xx (Éxito):** `200 OK` (Solicitud exitosa), `201 Created` (Recurso creado).
* **3xx:** Redirecciones.
* **4xx (Error del Cliente):** `400 Bad Request` (Sintaxis incorrecta), `401 Unauthorized` (Falta autenticación), `404 Not Found` (Recurso inexistente).
* **5xx (Error del Servidor):** `500 Internal Server Error` (Fallo interno en la API).

## 3. Promesas y Asincronismo (Async/Await)
Las peticiones HTTP tardan tiempo, por lo que JavaScript utiliza **Promesas**. Una promesa representa una operación asíncrona que puede estar: *Pendiente*, *Resuelta* o *Rechazada*.

Para consumir estas promesas utilizamos la sintaxis **async / await** junto con el bloque **try / catch** para atrapar errores de manera elegante, haciendo que el código asíncrono se lea como si fuera síncrono.

## 4. Consumo de APIs en React: Fetch vs Axios

### API Fetch (Nativa)
Es la función integrada en los navegadores modernos.
* **Ventaja:** No requiere instalar dependencias.
* **Desventaja:** Hay que parsear la respuesta a JSON manualmente (`response.json()`) y el manejo de errores es más tedioso (un estado 404 no salta automáticamente al bloque `catch`).

### Axios (Librería Externa)
Librería de terceros muy popular en el ecosistema React.
* **Ventaja:** Parsea automáticamente el JSON de respuesta, intercepta peticiones/respuestas globales y su manejo de errores es directo.
* **Desventaja:** Requiere instalación (`npm install axios`) y añade peso al proyecto.

> ⚠️ **Esto en la documentación esta desactualizado:**
> La documentación sugiere el uso de `CancelToken` y métodos como `axios.all` / `axios.spread`. Estas características han sido **deprecadas**. Actualmente se debe utilizar la API nativa `AbortController` para cancelar peticiones, y `Promise.all()` estándar de JavaScript para la concurrencia.

### Ejemplo de Producción (Componente Funcional Moderno)
Aquí se muestra un flujo completo y real usando `useEffect`, control de estado de carga, manejo de errores y cancelación moderna.

```jsx
import { useState, useEffect } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController reemplaza al viejo CancelToken
    const controller = new AbortController();
    const { signal } = controller;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // Usamos la API Fetch nativa pasándole la señal de aborto
        const response = await fetch('[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)', { signal });
        
        // Manejo manual de errores HTTP necesario en Fetch
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        // Ignoramos el error si fue provocado por desmontar el componente
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Cleanup Function: Cancela la petición si el componente se desmonta antes de terminar
    return () => controller.abort();
  }, []); // Array de dependencias vacío: se ejecuta solo al montar el componente

  if (isLoading) return <p>Cargando información estelar...</p>;
  if (error) return <p>Fallo de comunicación: {error}</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

## 5. El Problema del Estado Global y Context API
El **Estado Local** pertenece a un solo componente. Si necesitamos pasar esta información a componentes hijos, utilizamos *Props*. El problema surge cuando la aplicación crece y necesitamos pasar datos por múltiples niveles intermedios que realmente no los necesitan, un anti-patrón conocido como *Prop Drilling*.

### Solución: Context API
El **Estado Global** permite que un dato sea accesible desde cualquier lugar de la aplicación sin pasarlo por props. React incluye Context API de forma nativa para resolver esto. Se compone de 3 partes:
* `createContext()`: Genera el "espacio" de la memoria global.
* `<Provider>`: Envuelve la aplicación (o parte de ella) y distribuye el valor a sus hijos.
* `useContext()`: El hook que permite a un componente hijo "enchufarse" y leer ese valor global.

### Ejemplo de Context API Moderno (Tema Oscuro/Claro)
1. Creamos el **Provider** (`ThemeProvider.jsx`)
```jsx
import { createContext, useState } from 'react';

// 1. Creamos el contexto
export const ThemeContext = createContext();

// 2. Creamos y exportamos el Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    // Proveemos el estado y la función modificadora a toda la app
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```
2. Envolvemos la **App** (`App.jsx`)
```jsx
import { ThemeProvider } from './ThemeProvider';
import Panel from './Panel';

export default function App() {
  return (
    <ThemeProvider>
      {/* Todos los componentes dentro tendrán acceso al contexto */}
      <Panel />
    </ThemeProvider>
  );
}
```
3. Consumimos el **Contexto** (`Panel.jsx`)
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function Panel() {
  // 3. Extraemos directamente lo que necesitamos usando el Hook
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#121212' : '#ffffff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <h1>Modo actual: {theme}</h1>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </div>
  );
}
```

## 6. Recursos Adicionales: APIs Públicas y Seguridad
Para enriquecer nuestras aplicaciones podemos consumir APIs públicas (ej. *OpenWeatherMap*, *REST Countries*, *Random User*). Muchas de ellas requieren una **API Key**, un token identificador único de seguridad.
**Regla de oro:** Nunca se deben exponer las API Keys directamente en el código del repositorio público, ya que pueden comprometer cuotas de facturación de servicios de terceros. Se deben manejar mediante variables de entorno (.env).
