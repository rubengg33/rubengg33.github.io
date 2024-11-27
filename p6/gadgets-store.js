
const getId = () => {
  const searchParams = new URLSearchParams(location.search.slice(1));
  return Number(searchParams.get('id'));
}


class CustomSearch extends HTMLElement {
  constructor() {
    super();
    this.products = []; // Inicializa como un array vacío
  }


  async connectedCallback() {
    // Carga los productos de manera dinámica
    this.products = await this.loadProducts();
    this.setupListeners();
    this.renderResults(''); // Renderiza los resultados iniciales
  }

  async loadProducts() {
    try {
      const response = await fetch('https://products-foniuhqsba-uc.a.run.app/Smartwatches%20and%20gadgets');
      if (!response.ok) throw new Error('Error al cargar productos');
      return await response.json();
    } catch (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }
  }

  setupListeners() {
    const dialogBtn = this.querySelector('.dialog-search');
    const closeBtn = this.querySelector('.close-btn');
    const dialog = this.querySelector('dialog');

    dialogBtn.addEventListener('click', () => dialog.showModal());
    closeBtn.addEventListener('click', () => dialog.close());

    const siteSearch = this.querySelector('#site-search');
    siteSearch.addEventListener('input', (event) => this.search(event));
  }

  search(event) {
    event.preventDefault();
    const siteSearch = this.querySelector('#site-search');
    const term = siteSearch.value;
    this.renderResults(term);
  }

  renderResults(term = '') {
    const searchResults = this.querySelector('#search-results');
    searchResults.innerHTML = ''; // Limpia los resultados previos

    const _products = this.products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );

    const template = this.querySelector('#search-template').content;
    _products.map(product => {
      const li = template.querySelector('li').cloneNode(true);

      li.querySelector('.search-image').src = product.image || 'default.jpg';
      li.querySelector('.search-title a').textContent = product.title;
      li.querySelector('.search-description').textContent = product.description;

      const enlace = li.querySelector('.search-title a');
      enlace.href = enlace.href.replace('{id}', product.id);

      searchResults.appendChild(li);
    });
  }
}

customElements.define('custom-search', CustomSearch);


class ProductsItems extends HTMLElement {
  constructor() {
    super();
    this.templateElement = document.querySelector('#product-template');
    this.url = 'https://products-foniuhqsba-uc.a.run.app/Smartwatches%20and%20gadgets';
    this.productId = getId(); // Obtén el ID de la URL
    this.filters = {};
    this.products = [];
  }

  async load() {
     const rawProducts = await fetch(this.url).then(response => response.json());

    // Transformar las features en propiedades individuales
    return rawProducts.map(product => {
      const featuresMap = product.features.reduce((acc, feature) => {
        acc[feature.type.toLowerCase()] = feature.value;
        return acc;
      }, {});

      return {
        ...product,
        ...featuresMap // Añade las features como propiedades individuales
      };
    });
  }

  async connectedCallback() {
    this.products = await this.load();
    this.render(this.products); // Renderiza los productos filtrados
    this.setupFilters();
  }

  setupFilters() {
    const colorOptions = document.querySelectorAll('#color-menu li');
    const storageOptions = document.querySelectorAll('#storage-menu li');
    const connectivityOptions = document.querySelectorAll('#connectivity-menu li');
    const compatibilityOptions = document.querySelectorAll('#compatibility-menu li');

    const handleFilterClick = (type, value) => {
      if (this.filters[type] === value) {
        delete this.filters[type]; // Quita el filtro si ya está aplicado
      } else {
        this.filters[type] = value; // Añade el filtro
      }
      this.applyFilters(); // Aplica los filtros después de cada cambio
    };

    colorOptions.forEach(option => {
      option.addEventListener('click', () => handleFilterClick('color', option.textContent.trim()));
    });

    storageOptions.forEach(option => {
      option.addEventListener('click', () => handleFilterClick('storage', option.textContent.trim()));
    });

    connectivityOptions.forEach(option => {
      option.addEventListener('click', () => handleFilterClick('connectivity', option.textContent.trim()));
    });

    compatibilityOptions.forEach(option => {
      option.addEventListener('click', () => handleFilterClick('compatibility', option.textContent.trim()));
    });
  }

  applyFilters() {
    const filteredProducts = this.products.filter(product => {
      return (
        (!this.filters.color || product.color === this.filters.color) &&
        (!this.filters.storage || product.storage === this.filters.storage) &&
        (!this.filters.connectivity || product.connectivity.includes(this.filters.connectivity)) &&
        (!this.filters.compatibility || product.compatibility.includes(this.filters.compatibility))
      );
    });

    this.render(filteredProducts);
  }

  
  async render(products) {
    this.innerHTML = '';
    products.forEach(product => {
      if (!this.templateElement) return null;
      const card = this.templateElement.content.cloneNode(true);
      const img = card.querySelector('.product-image');
      img.src = product.image;

      const title = card.querySelector('.product-title');
      title.textContent = product.title;

      const description = card.querySelector('.product-description');
      description.textContent = product.description;

      const price = card.querySelector('.product-price');
      price.textContent = product.price;

      const rating = card.querySelector('.product-rating');
      rating.textContent = product.rating + '⭐';

      const tagsContainer = card.querySelector('.product-tags');
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

      const add2Cart = card.querySelector('.add2cart');
      add2Cart.addEventListener('click', () => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const existingProduct = products.find(p => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++; // Incrementa la cantidad si el producto ya existe
        } else {
          product.quantity = 1; // Si es un producto nuevo, establecer cantidad en 1
          products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));

        const customCart = document.querySelector('custom-cart');
        customCart.render();
      });
      card.querySelector('.product-title').addEventListener("click", () => {
        window.location.href = `detail.html?id=${product.id}`;
      });
      this.appendChild(card);
    });
  }
}
customElements.define('products-items', ProductsItems);
class CustomCart extends HTMLElement {
  constructor() {
    super();
    this.templateElement = document.querySelector('#cart-template');
    this.cartContent = document.querySelector('#cart-content');
     // Contenedor para los productos en el carrito
  }

  load() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  save(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  connectedCallback() {
    this.render();
  }

  updateCartCounter() {
    const cartCounter = document.querySelector('#cart-counter');
    const totalItems = this.products.reduce((sum, product) => sum + (product.quantity || 1), 0);
    if (cartCounter) {
      cartCounter.textContent = totalItems;
    }
  }
  render() {
    this.products = this.load();

    if (this.cartContent) {
      // Limpia el contenido actual de #cart-content
      this.cartContent.innerHTML = '';
    }
    let totalPrice = 0;

    this.products.map(product => {
      if (!this.templateElement) return null;
      const cart = this.templateElement.content.cloneNode(true);

      const img = cart.querySelector('img');
      img.src = product.image;

      const title = cart.querySelector('.title');
      title.textContent = product.title;

      const numericPriceElement = cart.querySelector('.numeric-price');
      numericPriceElement.textContent = product.price.replace('€', '').trim();

      const quantityElement = cart.querySelector('.quantity');
      quantityElement.textContent = product.quantity || 1; // Si no existe cantidad, poner 1
      
      const numericPrice = parseFloat(product.price.replace('€', '').trim());
      totalPrice += numericPrice * (product.quantity || 1);

      const decreaseButton = cart.querySelector('.decrease-quantity');
      const increaseButton = cart.querySelector('.increase-quantity');
      const removeButton = cart.querySelector('.remove-button');

      
      // Disminuir cantidad
      decreaseButton.addEventListener('click', () => {
        if (product.quantity > 1) {
          product.quantity--;
          quantityElement.textContent = product.quantity;
          this.save(this.products);
          this.render();
        }
      });

      // Aumentar cantidad
      increaseButton.addEventListener('click', () => {
        product.quantity++;
        quantityElement.textContent = product.quantity;
        this.save(this.products);
        this.render();
      });

      // Eliminar producto
      removeButton.addEventListener('click', () => {
        this.products = this.products.filter(p => p.id !== product.id); // Filtra el producto por id
        this.save(this.products);
        this.render(); // Vuelve a renderizar el carrito
      });

      const featuresContainer = cart.querySelector('.features');
      featuresContainer.innerHTML = ''; // Limpia cualquier contenido previo
      product.features.map(feature => {
        const featureItem = document.createElement('p');
        featureItem.textContent = `${feature.type.charAt(0).toUpperCase() + feature.type.slice(1)}: ${feature.value}`; // Muestra el tipo y valor
        featuresContainer.appendChild(featureItem); // Añade la característica al contenedor
      });

      if (this.cartContent) {
        this.cartContent.appendChild(cart); // Añade el producto al contenedor de productos
      }
    });
    const totalPriceElement = document.querySelector('#total-price'); 
    if (totalPriceElement) {
      totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} €`;
    }
    this.updateCartCounter();
 // Código para renderizar el carrito Arriba
//DIALOG para confirmar compra
    const cartFooter = document.querySelector('.cart-footer');
    const finalizeButton = cartFooter.querySelector('button');
    const dialog = document.querySelector('#confirmation-dialog');
    const closeDialogButton = document.querySelector('#close-dialog');
    const confirmPurchaseButton = document.querySelector('#confirm-purchase');
    const confirmationMessage = document.querySelector('#confirmation-message');
    const emptyCartMessage = document.querySelector('#empty-cart-message'); // Mensaje de carrito vacío
// Verificar si el carrito está vacío
    if (this.products.length === 0) {
      emptyCartMessage.classList.remove('hidden');
      finalizeButton.textContent = 'Añadir Productos';
      finalizeButton.onclick = () => {
        // Redirigir al usuario a la sección de productos
        window.location.href = "#products"; //  sección de productos
      };
    } else {
      emptyCartMessage.classList.add('hidden'); // Ocultar mensaje si hay productos en el carrito
      finalizeButton.textContent = 'Finalizar compra';
      finalizeButton.onclick = () => {
        // Mostrar el diálogo cuando se hace clic en "Finalizar compra"
        confirmationMessage.textContent = 'Confirma la compra.';
        dialog.showModal();
      };
    }

    // Cerrar el diálogo al hacer clic en el "x"
    closeDialogButton.addEventListener('click', () => {
      dialog.close();
    });

    // Confirmar la compra
    confirmPurchaseButton.addEventListener('click', () => {
      confirmationMessage.textContent = '¡Compra realizada con éxito! ¡Gracias por tu compra!';
      this.clearCart();
      
      // Cerrar el diálogo después de 3 segundos
      setTimeout(() => {
        dialog.close();
      }, 3000); // Retraso de 3 segundos para que el usuario vea el mensaje
    });
  }

  clearCart() {
    // Vaciar el carrito
    localStorage.removeItem('products');
    this.products = []; // Limpiar la lista de productos también en la instancia
    this.render(); // Volver a renderizar el carrito
  }
}
customElements.define('custom-cart', CustomCart);






























