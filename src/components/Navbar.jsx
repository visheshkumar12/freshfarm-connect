import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">FarmerConnect</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          {user ? (
            <>
              {user.role === 'farmer' && <Link to="/dashboard">Dashboard</Link>}
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;