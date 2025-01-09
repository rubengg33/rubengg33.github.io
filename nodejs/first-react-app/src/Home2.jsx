import { useState, useEffect } from 'react';
import Header from './Header';

export default function Home2() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idioma, setIdioma] = useState("es");
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://news-foniuhqsba-uc.a.run.app/'); // Cambia la URL si tienes una ruta específica para artículos destacados
        if (!response.ok) {
          throw new Error('Error al cargar los artículos');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const timeSince = (date) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const seconds = Math.floor((now - publishedDate) / 1000);

    if (seconds < 60) return `hace ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `hace ${days} día${days > 1 ? 's' : ''}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `hace ${months} mes${months > 1 ? 'es' : ''}`;
    const years = Math.floor(months / 12);
    return `hace ${years} año${years > 1 ? 's' : ''}`;
  };

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
  };


  if (loading) {
    return <div>Cargando artículos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className=" mb-4 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-0 ">
        <button onClick={() => cambiarIdioma("es")} className="mr-2  justify-items-center px-2 py-2"><img src="españa.png" alt="" />es</button>
        <button onClick={() => cambiarIdioma("ch")} className="mr-2 justify-items-center"><img src="china.png" alt="" />ch</button>
        <button onClick={() => cambiarIdioma("fr")} className="mr-2 justify-items-center"><img src="francia.png" alt="" />fr</button>
        <button onClick={() => cambiarIdioma("pt")} className="mr-2 justify-items-center"><img src="portugal.png" alt="" />pt</button>
        <button onClick={() => cambiarIdioma("it")} className="mr-2 justify-items-center"><img src="italia.png" alt="" />it</button>
      </div>
      <h1>The New York Times</h1>
      <Header />
      <ul className="grid">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col card">
          <li>
            <h2>{article.headline}</h2>
            {article.image_url && <img src={article.image_url} alt={article.translations[idioma]?.headline} />}
            <p>{article.translations[idioma]?.abstract}</p>
            <a className="link" href={`/news/${article.id}`}>Leer más</a>
            <p>{timeSince(article.date)}</p>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
