import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AboutUs from './pages/AboutUs';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          
          <Route path="/orders" element={user ? <Orders /> : <Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={user ? <Cart /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;