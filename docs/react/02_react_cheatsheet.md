# ⚛️ Resumen: Componentes, Estado y Ciclo de Vida en React

## 1. Props vs Estado (State)
En React, la información que controla la apariencia y el comportamiento de la UI se divide en dos conceptos fundamentales:

* **Props (Propiedades):** Son datos inmutables (de solo lectura) que se pasan de un componente "padre" a un "hijo". Sirven para configurar o personalizar el componente hijo. Un componente **nunca** debe modificar sus propias props.
* **Estado (State):** Es información dinámica y local que un componente administra por sí mismo. Si el estado cambia, React vuelve a renderizar automáticamente el componente para reflejar esos cambios.

---

## 2. Componentes con y sin estado

> ⚠️ **ESTO EN LA DOCUMENTACIÓN ESTÁ DESACTUALIZADO:** La documentación indica que los componentes con estado (*Stateful*) deben ser Clases y los componentes sin estado (*Stateless*) son funciones. Hoy en día, gracias a los **React Hooks**, utilizamos componentes funcionales para ambos casos.

Actualmente, un componente es *Stateful* si invoca el hook `useState`, y es *Stateless* si solo recibe y muestra `props`.

### Ejemplo Moderno: Manejo de Estado con `useState`
```javascript
import { useState } from 'react';

const Tienda = () => {
  // Declaración del estado moderno
  const [producto, setProducto] = useState("Guitarras Eléctricas");

  const cambiarProducto = (e) => {
    setProducto(e.target.value);
  };

  return (
    <div className="card">
      <h1>Estoy vendiendo: {producto}</h1>
      {/* Manejador de eventos actualizando el estado */}
      <input 
        type="text" 
        value={producto} 
        onChange={cambiarProducto} 
      />
    </div>
  );
};
```

---

## 3. Comunicación entre Componentes
Un patrón clave en React es "elevar el estado" *(Lifting State Up)*. Cuando dos componentes hermanos necesitan compartir información, el estado debe vivir en el componente padre común, quien distribuye los datos vía `props`.

**Pasando funciones de cambio de estado a través de Props:** Para que un componente hijo actualice el estado de su padre, el padre le pasa una función modificadora por props.
```javascript
import { useState } from 'react';

// Componente Hijo A (Modifica el estado)
const InputMensaje = ({ onActualizarMensaje }) => {
  return (
    <input 
      type="text" 
      placeholder="Escribe un mensaje..."
      onChange={(e) => onActualizarMensaje(e.target.value)} 
    />
  );
};

// Componente Hijo B (Muestra el estado)
const DisplayMensaje = ({ mensaje }) => {
  return <h2>Mensaje actual: {mensaje}</h2>;
};

// Componente Padre (Dueño del estado)
const ContenedorHermanos = () => {
  const [mensaje, setMensaje] = useState("");

  return (
    <div className="contenedor">
      {/* Pasa la función como prop */}
      <InputMensaje onActualizarMensaje={setMensaje} />
      {/* Pasa el valor del estado como prop */}
      <DisplayMensaje mensaje={mensaje} />
    </div>
  );
};
```

---

## 4. El "Ciclo de Vida" en Componentes Funcionales

> ⚠️ **ESTO EN LA DOCUMENTACIÓN ESTÁ DESACTUALIZADO:** La documentación explica el ciclo de vida a través de métodos de clase como componentDidMount, componentDidUpdate y componentWillUnmount. En el desarrollo moderno, todas estas fases se controlan con el hook `useEffect`.

El ciclo de vida tiene 3 fases principales: **Montaje**, **Actualización** y **Desmontaje**.

### El Hook `useEffect`
`useEffect` nos permite realizar "efectos secundarios" (como peticiones a APIs, suscripciones o temporizadores) unificando las fases del ciclo de vida.
* Montaje (`componentDidMount`): Se ejecuta solo una vez si le pasamos un arreglo de dependencias vacío [].
* Actualización (`componentDidUpdate`): Se ejecuta cada vez que cambia alguna variable especificada en su arreglo de dependencias.
* Desmontaje (`componentWillUnmount`): Se controla retornando una función de "limpieza" (cleanup) dentro del useEffect.

#### Ejemplo Práctico Moderno: Un Reloj en Tiempo Real
Este ejemplo reemplaza la pesada sintaxis de clases y setInterval por una función limpia usando Hooks.
```javascript
import { useState, useEffect } from 'react';

const RelojDigital = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    // 1. FASE DE MONTAJE (componentDidMount)
    // Se inicializa el intervalo al montarse el componente
    const timerID = setInterval(() => {
      // 2. FASE DE ACTUALIZACIÓN
      setHora(new Date());
    }, 1000);

    // 3. FASE DE DESMONTAJE (componentWillUnmount)
    // Función de limpieza para destruir el intervalo si el componente desaparece
    return () => {
      clearInterval(timerID);
    };
  }, []); // Array vacío = Solo se ejecuta al montar y desmontar

  return (
    <div className="reloj-card">
      <h2>Hora Local (Earth)</h2>
      <p className="reloj-display">{hora.toLocaleTimeString()}</p>
    </div>
  );
};
```