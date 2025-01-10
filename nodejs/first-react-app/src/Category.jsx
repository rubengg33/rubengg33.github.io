import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Buscador2 from './Buscador2';
export default function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${category}`);
        if (!response.ok) throw new Error('Error al cargar los artículos');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) return <div>Cargando artículos de {category}...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: '20px auto', maxWidth: '800px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <Buscador2 articles={articles} idioma={idioma} />
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => cambiarIdioma("es")}><img src="españa.png" alt="Español" /> es</button>
        <button onClick={() => cambiarIdioma("ch")}><img src="china.png" alt="Chino" /> ch</button>
        <button onClick={() => cambiarIdioma("fr")}><img src="francia.png" alt="Francés" /> fr</button>
        <button onClick={() => cambiarIdioma("pt")}><img src="portugal.png" alt="Portugués" /> pt</button>
        <button onClick={() => cambiarIdioma("it")}><img src="italia.png" alt="Italiano" /> it</button>
        </div>
        </div>
      <h1>The New York Times</h1>
      <Header />
      <ul className="grid">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col card">
          <li>
          {article.image_url && <img src={article.image_url}/>}
            <h2>{article.translations[idioma]?.headline}</h2>
            <p className="description">{article.translations[idioma]?.abstract}</p>
            <p dangerouslySetInnerHTML={{ __html:truncateText(article.translations[idioma]?.body, 200)}}></p>
            
            <p className="time">{timeSince(article.date)}<span><a className="link" href={`/news/${article.id}`}>LEER</a></span></p>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
