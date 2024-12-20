import { useState, useEffect } from 'react';

function Buscador() {
  const [termino, setTermino] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    if (termino === '') {
      setResultado(null);
      setItems([]);
      return;
    }

    setCargando(true);
    setResultado(`Resultados para "${termino}"`);

    // Reemplazamos el fetch para obtener artículos de la API
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${termino}`); // Asegúrate de que el endpoint sea el adecuado
        if (!response.ok) {
          throw new Error('Error al cargar los artículos');
        }
        const data = await response.json();

        console.log('Respuesta de la API:', data); // Verifica la respuesta completa

        // Verifica si la API devuelve los artículos correctamente
        if (data && Array.isArray(data) && data.length > 0) {
          // Si la respuesta tiene artículos, filtra según el término de búsqueda
          setItems(data.filter(article => article.headline.toLowerCase().includes(termino.toLowerCase())));
        } else {
          setItems([]); // Si no hay artículos, se pone un array vacío
        }
      } catch (err) {
        setError(err.message); // Maneja errores
      } finally {
        setCargando(false); // Termina el estado de carga
      }
    };

    fetchArticles();
  }, [termino]); // Ejecuta cuando el término cambia

  return (
    <div>
      <input
        type="text"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Escribe algo para buscar"
      />
      {cargando && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {resultado && <p>{resultado}</p>}
      <ul>
        {items.length === 0 && !cargando && <p>No se encontraron resultados</p>}
        {items.map((item, index) => (
          <li key={index}>{item.headline}</li> // Asegúrate de que 'headline' existe en los artículos
        ))}
      </ul>
    </div>
  );
}

export default Buscador;

