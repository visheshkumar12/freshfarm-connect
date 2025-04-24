import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const [error, setError] = useState(''); // Add error state
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      '.register-container',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-background min-h-screen flex items-center justify-center">
      <div className="register-container container mx-auto p-6 max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Join Farmer Connect
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-[#8d6e63] font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-[#8d6e63] font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] transition-colors"
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-[#8d6e63] font-semibold">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] transition-colors"
                disabled={isSubmitting}
              >
                <option value="consumer">Consumer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;