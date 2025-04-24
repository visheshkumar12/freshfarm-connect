import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function AboutUs() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.2,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/cart-vegetables-bg.png')` }}
    >
      <div className="backdrop-blur-sm bg-white/70 min-h-screen">
        <div className="container mx-auto py-10 px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-center text-[#8d6e63] mb-8">
            About FarmerConnect
          </h1>

          {/* Our Mission Section */}
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            className="bg-white p-6 rounded-lg shadow-md mb-8 transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#8d6e63] mb-4">Our Mission</h2>
            <p className="text-gray-600">
              FarmerConnect bridges the gap between farmers and consumers, providing a platform for fresh, local produce while empowering farmers with direct market access.
            </p>
          </div>

          {/* Our Team Section */}
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-2xl font-semibold text-[#8d6e63] mb-6">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Team Member: Tushar */}
              <div className="text-center transition-transform hover:-translate-y-1">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Tushar"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#8d6e63]">Tushar</h3>
                <p className="text-gray-600">friend 1</p>
              </div>
              {/* Team Member: Uday */}
              <div className="text-center transition-transform hover:-translate-y-1">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Uday"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#8d6e63]">Uday</h3>
                <p className="text-gray-600">friend 2</p>
              </div>
              {/* Team Member: Vishesh */}
              <div className="text-center transition-transform hover:-translate-y-1">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Vishesh"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#8d6e63]">Vishesh</h3>
                <p className="text-gray-600">friend 3</p>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className="bg-white p-6 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#8d6e63] mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-2">
              Email: <a href="mailto:support@farmerconnect.com" className="text-[var(--primary-green)] hover:underline">support@farmerconnect.com</a>
            </p>
            <p className="text-gray-600">
              Phone: <a href="tel:+919876543210" className="text-[var(--primary-green)] hover:underline">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;