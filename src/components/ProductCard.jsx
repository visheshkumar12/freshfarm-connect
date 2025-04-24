import { useState } from 'react';
import ProductModal from './ProductModal';
import "../components/productCard.css";
import { gsap } from 'gsap';

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    gsap.from('.modal', { opacity: 0, y: -50, duration: 0.5 });
  };

  return (
    <div className="cards">
      <img src={`http://localhost:4000${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handleOpenModal}>
        View Details
      </button>
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
    
  );
}

export default ProductCard;