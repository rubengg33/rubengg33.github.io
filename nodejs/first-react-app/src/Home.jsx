import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Componente para mostrar artículos de una categoría
export function Category() {
  const { category } = useParams(); // Obtiene el nombre de la categoría desde la URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${category}`);
        if (!response.ok) {
          throw new Error('Error al cargar los artículos');
        }
        const data = await response.json();
        setArticles(data); // Guarda los artículos en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchArticles();
  }, [category]); // Ejecuta cada vez que cambia la categoría

  if (loading) {
    return <div>Cargando artículos de {category}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Artículos de la categoría: {category}</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.headline}</h2>
            {article.image_url && <img src={article.image_url} alt={article.headline} />}
            <p>{article.abstract}</p>
            <a href={`/news/${article.id}`}>Leer más</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para mostrar un artículo individual
export function Article() {
  const { id } = useParams(); // Obtiene el ID del artículo de la URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el artículo');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // El fetch se ejecutará cada vez que cambie el ID

  if (loading) {
    return <div>Cargando artículo...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{article.headline}</h1>
      {article.image_url && <img src={article.image_url} alt={article.abstract} />}
      <p>{article.body}</p>
    </div>
  );
}

// Componente principal que define las rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<Article />} />
        <Route path="/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente Home
function Home() {
  return (
    <div>
      <ul>
        <li><a href="/World News">World News</a></li>
        <li><a href="/Sport">Sport</a></li>
        <li><a href="/Finance">Finance</a></li>
        <li><a href="/Technology">Technology</a></li>
        <li><a href="/Entertainment">Entertainment</a></li>
      </ul>
    </div>
  );
}
export default App;