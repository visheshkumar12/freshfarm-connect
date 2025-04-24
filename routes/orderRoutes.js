const express = require('express');
const { createOrder, getUserOrders, getFarmerOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/farmer-orders', protect, restrictTo('farmer'), getFarmerOrders);

module.exports = router;