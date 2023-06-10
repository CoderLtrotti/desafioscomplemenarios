import express from 'express';
import ProductManager from './ProductManager.js';
import Cart from './cart.js';
import handlerbars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import ProductsManagers from './dao/productsManager.js';
import CartManager from './dao/cartsmanager.js';









// Creamos la aplicación
const app = express();
const productManager = new ProductManager(".");
const productManagers = new ProductsManagers();
const cartManagers = new CartManager();


const cart = new Cart();












app.use(express.json());
mongoose.connect('mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority'


);

app.post('/api/cart/:cartId/product/:productId', (req, res) => {
	const { cartId, productId } = req.params;
	
	// Verificar si el carrito existe
	if (!cartManager.hasCart(cartId)) {
	  cartManager.createCart(cartId);
	}
	
	// Agregar el producto al carrito
	cartManager.addToCart(cartId, productId);
	
	res.json({ message: 'Producto agregado al carrito' });
  });

// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

//PRODUCTO.

// Definimos el metodo Get para la ruta /pro
app.get('/api/products', async (req, res) => {
	
	try {
		let allProduct = await productManager.getProductsFromFile();
		const limit = parseInt(req.query.limit, 10) || allProduct.length; 
		const limitedProducts = allProduct.slice(0, limit);
		res.json(limitedProducts);
	} catch (err) {
		res.json(err);
	}
});

// Definimos el metodo Get para la ruta /user/:id
app.get('/api/product/:id', async (req, res) => {
	// Buscamos el usuario por id
	const productId = parseInt(req.params.id, 10);
	let product = await productManager.getProductsById(productId);
	// Enviamos la respuesta
	if (product) {
		res.json(product);
	  } else {
		res.status(404).json({ message: 'Producto no encontrado' });
	  }
	
});

// DELETE /api/products/:id - Elimina un producto específico por ID
app.delete('/api/products/:id', async (req, res) => {
	const productId = parseInt(req.params.id, 10);
	const productIndex = await productManager.deleteProduct(productId);

	if (productIndex > -1) {
	  res.json({ message: 'Producto eliminado' });
	} else {
	  res.status(404).json({ message: 'Producto no encontrado' });
	}
  });
  

  
// PUT /api/products/:id - Actualiza un producto específico por ID
app.put('/api/products/:id', async (req, res) => {
	const productId = parseInt(req.params.id, 10);
	const productData = req.body;
	
	const productUpdated = await productManager.modifyProductById(productId, productData);
	res.json(productUpdated);
  });

  
//CARRITO
app.post('/api/cart', (req, res) => {
	const { productId, quantity } = req.body;
  
	if (!productId || !quantity) {
	  return res.status(400).json({ message: 'Faltan datos del producto' });
	}
  
	cart.addProduct(productId, quantity);
	res.json({ message: 'Producto agregado al carrito' });
  });
  
  // GET /api/cart - Obtiene el contenido del carrito
  app.get('/api/cart', (req, res) => {
	res.json(cart.getCart());
  });

  // Get Plantillas 
  
  
  
  app.engine('handlebars', handlerbars.engine());
  app.set('views', 'views/');
  app.set('view engine', 'handlebars');

  
  
  // Seteo el directorio de archivos estáticos
  

  app.get('./view', (req, res) => {
	res.render('index');
  });
  // Rutas

 
  
  // Route for real-time product updates
  app.get('/realtimeproducts', (req, res) => {
	res.render('realtimeproducts', { products });
  });
  
  // Inicialización del servidor
  const webServer = app.listen(8080, () => {
	  console.log('Escuchando 8080');
  });
  
  // Inicialización de socket.io
  const io = new Server(webServer);
  
  // Eventos de socket.io
  io.on('connection', (socket) => {
	console.log('A user connected');
  
	// Handle 'addProduct' event
	socket.on('addProduct', (product) => {
	  products.push(product);
  
	  // Broadcast the updated products to all connected clients
	  io.emit('newProduct', product);
	});
  
	// Handle 'disconnect' event
	socket.on('disconnect', () => {
	  console.log('A user disconnected');
	});
  });
  
  