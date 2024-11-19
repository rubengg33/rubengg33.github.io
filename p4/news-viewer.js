// news-viewer.js

class NewsViewer extends HTMLElement {
  constructor() {
    super();
    this.section = this.getAttribute('section')
  }

  connectedCallback() {
    this.loadArticles();
  }

  async loadArticles() {
    try {
      const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${this.section}`);
      if (!response.ok) {
        throw new Error('Error al obtener los artículos');
      }
      const articles = await response.json();
      this.renderArticles(articles);
    } catch (error) {
      console.error('Error:', error);
      this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
    }
  }

  renderArticles(articles) {
    const template = document.getElementById('article-template');
    
    // Limpiar contenido existente
    this.innerHTML = '';

    articles.forEach(article => {
      // Clonar el contenido de la plantilla
      const articleContent = document.importNode(template.content, true);
      
      // Rellenar la plantilla con los datos del artículo
      articleContent.querySelector('.title').textContent = article.headline;
      articleContent.querySelector('.link').href = `./article.html?id=${article.id}`;

      articleContent.querySelector('.author').textContent = article.author;
      articleContent.querySelector('.description').innerHTML = article.body;
      
      // Añadir el artículo al componente
      this.appendChild(articleContent);
    });
  }
}

// Definir el elemento personalizado
customElements.define('news-viewer', NewsViewer);