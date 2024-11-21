class ProductsItems extends HTMLElement {
    constructor() {
      super();
      this.url = 'https://products-foniuhqsba-uc.a.run.app/Games';
      this.attachShadow({ mode: 'open' });
      this.templateElement = document.querySelector('#product-item');
    }
  
    async connectedCallback() {
      await this.loadProducts();
    }
  
    async loadProducts() {
      try {
        const response = await fetch(this.url);
        const products = await response.json();
        this.render(products);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }
  
    render(products) {
      const fragment = document.createDocumentFragment();
  
      products.forEach((product) => {
        const clone = this.templateElement.content.cloneNode(true);
        clone.querySelector('.title').textContent = product.title;
        clone.querySelector('.description').textContent = product.description;
        clone.querySelector('.price').textContent = `€${product.price.toFixed(2)}`;
        clone.querySelector('img').src = product.image;
        clone.querySelector('.add2cart').addEventListener('click', () => this.addToCart(product));
  
        fragment.appendChild(clone);
      });
  
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(fragment);
    }
  
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem('products') || '[]');
      cart.push(product);
      localStorage.setItem('products', JSON.stringify(cart));
  
      // Actualizar el contador del carrito
      const cartCounter = document.querySelector('#cart-counter');
      cartCounter.textContent = cart.length;
  
      alert(`${product.title} añadido al carrito.`);
    }
  }
  
  customElements.define('products-items', ProductsItems);
class CustomCart extends HTMLElement {
  constructor() {
    super();
    this.templateElement = document.querySelector('#product-item');
    this.products = [];
    this.isVisible = false; // Controla si el carrito está visible
  }

  load() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  connectedCallback() {
    this.render();
    document.querySelector('.cart-icon').addEventListener('click', () => this.toggleCart());
  }

  toggleCart() {
    this.isVisible = !this.isVisible;
    this.style.display = this.isVisible ? 'block' : 'none';
    this.render();
  }

  render() {
    this.products = this.load();
    if (!this.isVisible) return;

    const total = this.products.reduce((sum, product) => sum + product.price, 0).toFixed(2);

    this.innerHTML = `
      <div class="fixed inset-0 bg-white shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Carrito de Compras</h2>
          <button id="close-cart" class="text-gray-500 hover:text-gray-800 text-xl">✖</button>
        </div>
        <div>
          ${
            this.products.length
              ? this.products
                  .map(
                    (product) => `
              <div class="flex justify-between items-center mb-4">
                <p>${product.title} - €${product.price.toFixed(2)}</p>
              </div>
            `
                  )
                  .join('')
              : '<p class="text-center text-gray-500">El carrito está vacío.</p>'
          }
        </div>
        <div class="mt-4">
          <p class="text-lg font-semibold">Total: €${total}</p>
        </div>
      </div>
    `;

    this.querySelector('#close-cart')?.addEventListener('click', () => this.toggleCart());
  }
}
class CustomCart extends HTMLElement {
    constructor() {
      super();
      this.templateElement = document.querySelector('#product-item');
      this.products = [];
      this.isVisible = false; // Controla si el carrito está visible
    }
  
    load() {
      return JSON.parse(localStorage.getItem('products') || '[]');
    }
  
    connectedCallback() {
      this.render();
      document.querySelector('.cart-icon').addEventListener('click', () => this.toggleCart());
    }
  
    toggleCart() {
      this.isVisible = !this.isVisible;
      this.style.display = this.isVisible ? 'block' : 'none';
      this.render();
    }
  
    render() {
      this.products = this.load();
      if (!this.isVisible) return;
  
      const total = this.products.reduce((sum, product) => sum + product.price, 0).toFixed(2);
  
      this.innerHTML = `
        <div class="fixed inset-0 bg-white shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Carrito de Compras</h2>
            <button id="close-cart" class="text-gray-500 hover:text-gray-800 text-xl">✖</button>
          </div>
          <div>
            ${
              this.products.length
                ? this.products
                    .map(
                      (product) => `
                <div class="flex justify-between items-center mb-4">
                  <p>${product.title} - €${product.price.toFixed(2)}</p>
                </div>
              `
                    )
                    .join('')
                : '<p class="text-center text-gray-500">El carrito está vacío.</p>'
            }
          </div>
          <div class="mt-4">
            <p class="text-lg font-semibold">Total: €${total}</p>
          </div>
        </div>
      `;
  
      this.querySelector('#close-cart')?.addEventListener('click', () => this.toggleCart());
    }
  }
  
customElements.define('custom-cart', CustomCart);
  
customElements.define('custom-cart', CustomCart);
  