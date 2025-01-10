import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './Rutas'; // Importa el componente de rutas
import './styles.css';
// import App from './App.jsx'
// import Home from './Home.jsx'
// import Buscador from './Buscador.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
