class CartManager {
    constructor() {
      // Inicializa un objeto para almacenar los carritos
      this.carts = {};
    }
  
    createCart(cartId) {
      // Crea un nuevo carrito con el ID proporcionado
      this.carts[cartId] = [];
    }
  
    getCart(cartId) {
      // Retorna el carrito correspondiente al ID proporcionado
      return this.carts[cartId];
    }
  
    addToCart(cartId, productId) {
      // Agrega un producto al carrito correspondiente al ID proporcionado
      const cart = this.carts[cartId];
      cart.push(productId);
    }
  
    removeFromCart(cartId, productId) {
      // Remueve un producto del carrito correspondiente al ID proporcionado
      const cart = this.carts[cartId];
      const index = cart.indexOf(productId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
  
    clearCart(cartId) {
      // Elimina todos los productos del carrito correspondiente al ID proporcionado
      this.carts[cartId] = [];
    }
  }
  
  // Ejemplo de uso
  const cartManager = new CartManager();
  
  // Crear un carrito con ID "cart1"
  cartManager.createCart("cart1");
  
  // Agregar productos al carrito "cart1"
  cartManager.addToCart("cart1", "product1");
  cartManager.addToCart("cart1", "product2");
  cartManager.addToCart("cart1", "product3");
  
  // Obtener el contenido del carrito "cart1"
  const cartContent = cartManager.getCart("cart1");
  console.log(cartContent); // ["product1", "product2", "product3"]
  
  // Remover "product2" del carrito "cart1"
  cartManager.removeFromCart("cart1", "product2");
  
  // Obtener el contenido actualizado del carrito "cart1"
  const updatedCartContent = cartManager.getCart("cart1");
  console.log(updatedCartContent); // ["product1", "product3"]
  
  // Limpiar el carrito "cart1"
  cartManager.clearCart("cart1");
  
  // Obtener el contenido del carrito "cart1" después de limpiarlo
  const emptyCartContent = cartManager.getCart("cart1");
  console.log(emptyCartContent); // []