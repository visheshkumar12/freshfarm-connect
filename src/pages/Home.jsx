import { useState, useEffect } from 'react';
import gsap from 'gsap';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        console.log('Fetched products:', res.data);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Products state:', products);
    if (products.length > 0) {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          position: 'static',
        }
      );
    }
  }, [products]);
 
  

  return (
    <div className="home-background min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative z-10 flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Fresh Farm Products
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
            Connect directly with farmers for the freshest produce, delivered to your door.
          </p>
          <a
            href="#products"
            className="inline-block bg-[var(--primary-green)] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[var(--secondary-green)] transition-colors"
          >
            
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-[var(--light-cream)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--earth-brown)] mb-12">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;