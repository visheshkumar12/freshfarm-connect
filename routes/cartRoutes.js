const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, cartController.addToCart);
router.delete('/remove/:productId', protect, cartController.removeFromCart);
router.get('/', protect, cartController.getCart);
router.post('/checkout', protect, cartController.checkout);

module.exports = router;