import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
        {count % 2 ===0 ?
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          :<a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <App2 />
    </>
  )
}
function App2() {
  const usuario = {
    nombre: 'Rubén',
    apellido: 'García',
    edad: 16,
    colorFavorito: 'Azul',
    hobbies: ['Videojuegos', 'Gimnasio', 'Programación']
   
  };

  return <PerfilUsuario {...usuario} />;
}

function PerfilUsuario({ nombre, apellido, edad, colorFavorito, hobbies }) {
  return (
    <div>
      <h2>
        {nombre} {apellido}
      </h2>
      <div style={contenedorEstilo}>
      <div style={columnaEstilo}>
      <h3>Información Personal</h3>
      <p>Edad: {edad}</p>
      {edad >= 18 ? <p>Eres mayor de edad.</p>
      : <p>No eres mayor de edad.</p>}
      <p>Color Favorito: {colorFavorito}</p>
      </div>

      <div style={columnaEstilo}>
      <h3>Hobbies:</h3>
       
      <ul>
        {hobbies.map((hobbie, index) => (
          <li style={EstiloHobbies} key={index}>{hobbie}</li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

const contenedorEstilo = {
  display: 'flex',
  gap: '20px', // Espacio entre columnas
};

const columnaEstilo = {
   // Asegura que ambas columnas ocupen el mismo espacio
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
};

const EstiloHobbies = {
  listStyle: 'none',
  color: 'red',
  flex: 1,
  marginTop: '10px',
};
export default App
