import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Cargando artículos de {category}...</div>;
  if (error) return <div>Error: {error}</div>;

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
