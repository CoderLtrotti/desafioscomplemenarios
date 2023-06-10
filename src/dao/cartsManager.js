import Cart from './cart.js';

class CartManager {
  constructor() {
    // Inicializa un objeto para almacenar los carritos
    this.carts = {};
  }

  createCart(cartId) {
    // Crea un nuevo carrito con el ID proporcionado
    this.carts[cartId] = new Cart();
  }

  getCart(cartId) {
    // Retorna el carrito correspondiente al ID proporcionado
    return this.carts[cartId];
  }

  addToCart(cartId, productId) {
    // Agrega un producto al carrito correspondiente al ID proporcionado
    const cart = this.carts[cartId];
    cart.addProduct(productId);
  }

  removeFromCart(cartId, productId) {
    // Remueve un producto del carrito correspondiente al ID proporcionado
    const cart = this.carts[cartId];
    cart.removeProduct(productId);
  }

  clearCart(cartId) {
    // Elimina todos los productos del carrito correspondiente al ID proporcionado
    const cart = this.carts[cartId];
    cart.clear();
  }
}

export default CartManager;