const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = await Order.create({
    user: req.user._id,
    products,
    totalAmount,
  });
  res.status(201).json(order);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product');
  res.json(orders);
});

const getFarmerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('products.product');
  const farmerOrders = orders.filter((order) =>
    order.products.some((item) => item.product.farmer.toString() === req.user._id.toString())
  );
  res.json(farmerOrders);
});

module.exports = { createOrder, getUserOrders, getFarmerOrders };