import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      '.login-container',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="home-background min-h-screen flex items-center justify-center">
      <div className="login-container container mx-auto p-6 max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Login to Farmer Connect
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-[#8d6e63] font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-[#8d6e63] font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
            Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#2e7d32] hover:text-[#4caf50] font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Login;