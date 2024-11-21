class ProductsItems extends HTMLElement {
    constructor() {
      super();
      this.templateElement = document.querySelector('#product-item');
      this.url = 'https://products-foniuhqsba-uc.a.run.app/Smartwatches%20and%20gadgets'
    }
  
    async load() {
      return fetch(this.url).then(response => response.json())
    }
  
    async connectedCallback() {
      this.products = await this.load()
      this.render()
    }
  
    render() {
      this.products.map(product => {
        if (!this.templateElement) return null
        const card = this.templateElement.content.cloneNode(true)
  
        const img = card.querySelector('img')
        img.src = product.image
  
        const title = card.querySelector('.title')
        title.textContent = product.title
  
        const description = card.querySelector('.description')
        description.textContent = product.description
  
        const price = card.querySelector('.price')
        price.textContent = product.price
        const rating = card.querySelector('.rating')
        rating.textContent = product.rating
        const tagsContainer = card.querySelector('.tags');
        tagsContainer.innerHTML = ''; // Limpia cualquier contenido previo
        product.tags.map(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.textContent = `#${tag}`; // Formato de texto para el tag
          tagSpan.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'; // Estilos de Tailwind
          tagsContainer.appendChild(tagSpan); // Añade el span al contenedor de tags
        });
        const featuresContainer = card.querySelector('.features');
        featuresContainer.innerHTML = ''; // Limpia cualquier contenido previo
        product.features.map(feature => {
            const featureItem = document.createElement('p');
            featureItem.textContent = `${feature.type.charAt(0).toUpperCase() + feature.type.slice(1)}: ${feature.value}`; // Muestra el tipo y valor
            featuresContainer.appendChild(featureItem); // Añade la característica al contenedor
        });
        const add2Cart = card.querySelector('.add2cart')
        add2Cart.addEventListener('click', () => {
          const products = JSON.parse(localStorage.getItem('products') || '[]')
          products.push(product)
          localStorage.setItem('products', JSON.stringify(products))
  
          const customCart = document.querySelector('custom-cart')
          customCart.render()
        })
  
        this.appendChild(card)
      })
    }
  }
  
  class CustomCart extends HTMLElement {
    constructor() {
      super();
      this.templateElement = document.querySelector('#product-item');
      this.url = 'https://products-foniuhqsba-uc.a.run.app/Smartwatches%20and%20gadgets'
    }
  
    load() {
      return JSON.parse(localStorage.getItem('products') || '[]')
    }
  
    connectedCallback() {
      this.render()
    }
  
    render() {
      this.products = this.load()
      this.innerHTML = ''
      const icon = document.querySelector('.cart-icon');
      const customCart = document.querySelector('custom-cart');
      icon.addEventListener('click', () => {
        customCart.classList.toggle('hidden')
      })
      this.products.map(product => {
        this.innerHTML += product.title
      })
    }
  }
  
  customElements.define('custom-cart', CustomCart);
  customElements.define('products-items', ProductsItems);