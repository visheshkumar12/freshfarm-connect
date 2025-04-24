const express = require('express');
const { addProduct, getProducts, getProductById } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', protect, restrictTo('farmer'), upload.single('image'), addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;