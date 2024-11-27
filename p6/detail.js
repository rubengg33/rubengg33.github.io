
const getId = () => {
  const searchParams = new URLSearchParams(location.search.slice(1));
  return Number(searchParams.get('id'));
}

  class ProductItems extends HTMLElement {
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
      if (product) {
      // 3. remplace the html with the article data
      // Rellenar la plantilla con los datos del artículo
      this.querySelector('.product-title').textContent = product.title;
      this.querySelector('.product-image').src = product.image;
      this.querySelector('.product-description').textContent = product.description;
      this.querySelector('.product-price').textContent = product.price;
      this.querySelector('.product-rating').textContent = product.rating + '⭐';
      this.querySelector('.product-tags').textContent = product.tags;

      const tagsContainer = this.querySelector('.product-tags');
      tagsContainer.innerHTML = ''; // Limpia cualquier contenido previo
      product.tags.map(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = `#${tag}`; // Formato de texto para el tag
        tagSpan.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'; // Estilos de Tailwind
        tagsContainer.appendChild(tagSpan); // Añade el span al contenedor de tags
      });

      const featuresContainer = this.querySelector('.product-features');
      featuresContainer.innerHTML = ''; // Limpia cualquier contenido previo
      product.features.map(feature => {
        const featureItem = document.createElement('p');
        featureItem.textContent = `${feature.type.charAt(0).toUpperCase() + feature.type.slice(1)}: ${feature.value}`; // Muestra el tipo y valor
        featuresContainer.appendChild(featureItem); // Añade la característica al contenedor
      });
      console.log('Detalles cargados correctamente');
    } else {
      // Si no se encuentra el producto, mostramos un mensaje
      this.querySelector('.product-title').textContent = 'Producto no encontrado';

      console.log('OK')
    }
  }
  }
  customElements.define('products-items', ProductItems);