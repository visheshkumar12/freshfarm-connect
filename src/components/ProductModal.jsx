import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function ProductModal({ product, onClose }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!user) return alert('Please login to add to cart');

    try {
      // Add to cart
      await axios.post(
        'http://localhost:4000/api/cart/add',
        {
          productId: product._id,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Create order
      await axios.post(
        'http://localhost:4000/api/orders',
        {
          products: [{ product: product._id, quantity }],
          totalAmount: product.price * quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      alert('Added to cart');
      onClose();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error adding to cart or creating order');
    }
  };
 

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <img
          src={`http://localhost:4000${product.image}`}
          alt={product.name}
          className="w-full h-64 object-cover my-4"
        />
        <p>{product.description}</p>
        <p className="text-lg font-semibold">₹{product.price}</p>

        <div className="w-full flex flex-col items-start mb-4">
          <label className="text-sm font-medium mb-1">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>


        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
