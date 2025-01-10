import React, { useState, useEffect } from "react";
import './Buscador.css';

export default function Buscador2({ articles, idioma }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    // Filtro que se ejecuta cada vez que el searchTerm cambie
    useEffect(() => {
      const results = articles.filter(article =>
        article.translations[idioma]?.headline?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(results);
    }, [searchTerm, articles, idioma]);  // Dependencias: se ejecuta cuando searchTerm cambia

    return (
        <div>
          {/* Botón para abrir el diálogo */}
          <button onClick={() => setIsDialogOpen(true)} className="dialog-search transparent">
            🔍
          </button>
      
          {/* Fondo semi-transparente que cubre el contenido */}
          {isDialogOpen && <div className="overlay" onClick={() => setIsDialogOpen(false)}></div>}
      
          {/* Diálogo de resultados */}
          {isDialogOpen && (
            <dialog open>
              <button onClick={() => setIsDialogOpen(false)} className="close-btn">
                🗙
              </button>
              <h1>Search</h1>
              <input
                type="search"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="site-search"
              />
              <ul id="search-results">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <li key={article.id} className="card">
                      <h2>{article.translations[idioma]?.headline}</h2>
                      {article.image_url && <img src={article.image_url} alt={article.translations[idioma]?.headline} />}
                      <p>{article.translations[idioma]?.abstract}</p>
                      <p>
                        <a href={`/news/${article.id}`}>LEER</a>
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No se encontraron resultados</p>
                )}
              </ul>
            </dialog>
          )}
        </div>
      );
    }      
