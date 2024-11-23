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
      rating.textContent = product.rating + '⭐'
      const tagsContainer = card.querySelector('.tags');
      tagsContainer.innerHTML = ''; // Limpia cualquier contenido previo
      product.tags.map(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = `#${tag}`;// Formato de texto para el tag
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
        const existingProduct = products.find(p => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++; // Incrementa la cantidad si el producto ya existe
        } else {
          product.quantity = 1; // Si es un producto nuevo, establecer cantidad en 1
          products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));


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
    this.templateElement = document.querySelector('#cart-template');
    this.cartContent = document.querySelector('#cart-content'); // Contenedor para los productos en el carrito
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
  }
}
customElements.define('custom-cart', CustomCart);
customElements.define('products-items', ProductsItems);
//DIALOGO
const finalizeButton = document.querySelector('.cart-footer button'); // Botón "Finalizar compra"
const dialog = document.querySelector('#confirmation-dialog'); // El diálogo
const closeDialogButton = document.querySelector('#close-dialog'); // Botón para cerrar el diálogo
const confirmPurchaseButton = document.querySelector('#confirm-purchase'); // Botón de confirmar compra
const confirmationMessage = document.querySelector('#confirmation-message'); // Párrafo dentro del diálogo para el mensaje de confirmación

// Mostrar el diálogo al hacer clic en "Finalizar compra"
finalizeButton.addEventListener('click', () => {
  // Restablecer el mensaje a su estado inicial cuando se abra el diálogo
  if (confirmationMessage) {
    confirmationMessage.textContent = 'Confirma la compra.';
  }
  
  dialog.showModal(); // Muestra el diálogo
});

// Cerrar el diálogo al hacer clic en la "x"
closeDialogButton.addEventListener('click', () => {
  dialog.close(); // Cierra el diálogo
});

// Confirmar la compra
confirmPurchaseButton.addEventListener('click', () => {
  // Cambiar el mensaje dentro del diálogo solo cuando se confirma la compra
  if (confirmationMessage) {
    confirmationMessage.textContent = '¡Compra realizada con éxito! ¡Gracias por tu compra!';
  }

  // Vaciar el carrito
  localStorage.removeItem('products');
  
  // Actualizar el carrito visualmente
  const customCart = document.querySelector('custom-cart');
  if (customCart) {
    customCart.render();
  }

  // Cerrar el diálogo después de la confirmación
  setTimeout(() => {
    dialog.close(); // Cerrar el diálogo después de 1.5 segundos
  }, 5000); // Retraso de 1.5 segundos para que el usuario vea el mensaje
});





























