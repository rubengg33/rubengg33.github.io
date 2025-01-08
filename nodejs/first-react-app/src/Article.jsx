import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${id}`);
        if (!response.ok) throw new Error('Error al cargar el artículo');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Cargando artículo...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{article.headline}</h1>
      {article.image_url && <img src={article.image_url} alt={article.abstract} />}
      <p>{article.body}</p>
    </div>
  );
}
