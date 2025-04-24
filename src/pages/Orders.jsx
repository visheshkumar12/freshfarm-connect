import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = user.role === 'farmer'
          ? 'http://localhost:4000/api/orders/farmer-orders'
          : 'http://localhost:4000/api/orders/myorders';
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      gsap.fromTo(
        '.order-card',
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
  }, [orders]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/cart-vegetables-bg.png')` }}
    >
      <div className="backdrop-blur-sm bg-white/70 min-h-screen">
        <div className="container mx-auto py-10 px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-center text-[#8d6e63] mb-8">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center text-xl text-gray-600">
              📦 No orders found
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="order-card bg-white p-6 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-[#8d6e63]">
                      Order ID: {order._id.slice(-6)}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-[var(--secondary-green)]'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-4">
                    {order.products.map((item) => (
                      <li
                        key={item.product._id}
                        className="flex items-center border-b pb-2"
                      >
                        <img
                          src={`http://localhost:4000${item.product.image}`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                        />
                        <div className="flex-grow">
                          <p className="text-gray-800 font-medium">{item.product.name}</p>
                          <p className="text-gray-600">
                            ₹{item.product.price} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-gray-800 font-medium">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-[#8d6e63]">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;