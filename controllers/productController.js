const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const path = require('path');

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const product = await Product.create({
    name,
    description,
    price,
    image,
    farmer: req.user._id,
  });
  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('farmer', 'name');
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('farmer', 'name');
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { addProduct, getProducts, getProductById };