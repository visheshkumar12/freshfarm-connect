import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';

function Cart() {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
      setCheckoutDone(res.data.status === 'completed');
    } catch (err) {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing item', err);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`http://localhost:4000/api/cart/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCheckoutDone(true);
      fetchCart();
    } catch (err) {
      console.error('Checkout failed', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:4000/api/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart(null);
    } catch (err) {
      console.error('Error clearing cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart && cart.products?.length > 0) {
      gsap.fromTo(
        '.cart-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }
  }, [cart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light-cream)]">
        <p className="text-center text-lg font-medium text-[#8d6e63]">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light-cream)]">
        <p className="text-center text-xl text-gray-600">🛒 Your cart is empty</p>
      </div>
    );
  }

  const totalAmount = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[var(--light-cream)]">
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center text-[#8d6e63] mb-8">Your Cart</h1>

        {checkoutDone && (
          <div className="text-center text-[var(--secondary-green)] font-semibold bg-green-100 p-4 rounded-lg mb-8 mx-auto max-w-2xl">
            ✅ Order Completed Successfully!
          </div>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          {cart.products.map((item) => (
            <div
              key={item.product._id}
              className="cart-item flex flex-col sm:flex-row justify-between items-center bg-white border p-4 sm:p-6 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center w-full sm:w-auto">
                <img
                  src={`http://localhost:4000${item.product.image}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#8d6e63]">{item.product.name}</h3>
                  <p className="text-gray-600">₹{item.product.price} × {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <p className="text-lg font-medium text-[#8d6e63]">
                  ₹{item.product.price * item.quantity}
                </p>
                {!checkoutDone && (
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {!checkoutDone && (
          <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-bold text-[#8d6e63]">Total: ₹{totalAmount}</p>
              <button
                onClick={handleClearCart}
                className=""
              >
                
              </button>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;