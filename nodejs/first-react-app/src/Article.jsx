import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Buscador2 from './Buscador2';
import './Article.css';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idioma, setIdioma] = useState("es");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [inputUsername, setInputUsername] = useState('');

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

    const fetchAllArticles = async () => {
      try {
        const response = await fetch('https://news-foniuhqsba-uc.a.run.app/');
        if (!response.ok) throw new Error('Error al cargar los artículos');
        const data = await response.json();
        setAllArticles(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchArticle();
    fetchAllArticles();

    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    } else {
      setShowDialog(true);
    }
  }, [id]);

  const handleLogin = () => {
    if (inputUsername.trim()) {
      localStorage.setItem('username', inputUsername);
      setUsername(inputUsername);
      setIsLoggedIn(true);
      setShowDialog(false);
    } else {
      alert("Por favor ingrese un nombre de usuario.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
    setArticle(null);  // Ocultar el artículo inmediatamente después de cerrar sesión
  };

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

  const truncateText = (text, maxLength = 5000) => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
  };

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDialog]);

  // Reabrir el diálogo automáticamente si se cierra sin iniciar sesión
  useEffect(() => {
    if (!isLoggedIn && !showDialog) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 1000); // Reabrir el diálogo después de 1 segundo
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, showDialog]);

  if (loading) return <div>Cargando artículo...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!article) return <div>No se encontró el artículo.</div>;

  return (
    <div style={{ margin: '20px auto', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Buscador2 articles={allArticles} idioma={idioma} />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => cambiarIdioma("es")}><img src="españa.png" alt="Español" /> es</button>
          <button onClick={() => cambiarIdioma("ch")}><img src="china.png" alt="Chino" /> ch</button>
          <button onClick={() => cambiarIdioma("fr")}><img src="francia.png" alt="Francés" /> fr</button>
          <button onClick={() => cambiarIdioma("pt")}><img src="portugal.png" alt="Portugués" /> pt</button>
          <button onClick={() => cambiarIdioma("it")}><img src="italia.png" alt="Italiano" /> it</button>
          {/* Botón de cerrar sesión */}
          {isLoggedIn && (
            <button onClick={handleLogout} style={{ padding: '10px', marginTop: '10px' }}>Cerrar sesión</button>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <a href=".."><h1>The New York Times</h1></a>
        <Header />
        {article && (
          <div className="card">
            <h2 style={{fontFamily: 'nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, "times new roman", times, serif', fontWeight: '700', fontStyle: 'italic',}}>{article.translations[idioma]?.headline}</h2>
            <p style={{fontFamily: 'nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, "times new roman", times, serif', fontWeight: '300'}} className="description">{article.translations[idioma]?.abstract}</p>
            {article.image_url && (
              <img src={article.image_url} alt="Artículo" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', margin: '20px 0' }} />
            )}
            <div
              style={{ lineHeight: '1.8',  fontFamily: 'nyt-imperial, georgia, "times new roman", times, serif', fontWeight: '400' }}
              dangerouslySetInnerHTML={{ __html: truncateText(article.translations[idioma]?.body) }}
            />
            <p className="time">
              <span>{timeSince(article.date)}</span>
              <span>Por: {article.author}</span>
            </p>
          </div>
        )}
      </div>

      {/* Dialog de inicio de sesión */}
      {showDialog && (
        <div className="dialog" style={{
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: '1000'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '10px',
            width: '100%', maxWidth: '600px', height: '500px', overflowY: 'auto'
          }}>
            <h3>Iniciar sesión</h3>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <button onClick={handleLogin} style={{ padding: '10px', marginTop: '10px', width: '100%' }}>Iniciar sesión</button>
            <button onClick={() => setShowDialog(false)} style={{ padding: '10px', marginTop: '10px', width: '100%' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
