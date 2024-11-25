const getId = () => {
    const searchParams = new URLSearchParams(location.search.slice(1));
    return Number(searchParams.get('id'));
  }
  class CustomArticle extends HTMLElement {
    constructor() {
      super()
      this.id = getId()
      console.log({ id: this.id })
    }

    connectedCallback() {
      this.render()
    }

    async loadArticles() {
      return fetch('https://products-foniuhqsba-uc.a.run.app/Smartwatches%20and%20gadgets').then(res => res.json())
    }

    async render() {
      // 1. API get All Articles
      const products = await this.loadArticles()
      console.log({ products})
      // 2. filter the 'article' by the id `this.id`
      const product = products.find(product => product.id == this.id)
      console.log({ product })
      // 3. remplace the html with the article data
      // Rellenar la plantilla con los datos del artículo
      this.querySelector('.title').textContent = product.title;
      this.querySelector('.image').textContent = product.image;
      this.querySelector('.description').textContent = product.description;
      console.log('OK')
    }
  }

  customElements.define('custom-article', CustomArticle);