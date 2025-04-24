const Cart = require('../models/Cart.js');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId, status: 'active' });

  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }

  const existingProduct = cart.products.find(p => p.product.toString() === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId, status: 'active' });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  await cart.save();
  res.status(200).json(cart);
};

// Get current cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id, status: 'active' }).populate('products.product');
  if (!cart) return res.status(404).json({ message: 'Cart is empty' });
  res.status(200).json(cart);
};

// Checkout cart
exports.checkout = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id, status: 'active' });
  if (!cart) return res.status(404).json({ message: 'No active cart to checkout' });

  cart.status = 'completed';
  await cart.save();

  res.status(200).json({ message: 'Checkout complete', cart });
};