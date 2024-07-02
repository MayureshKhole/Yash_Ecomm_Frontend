import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

import img1 from '../assest/hbanner/h1.webp';
import img2 from '../assest/hbanner/h2.webp';
import img3 from '../assest/hbanner/h3.webp';
import img4 from '../assest/hbanner/h4.webp';

const Banner = () => {
  const [loading, setLoading] = useState(true); // State to control initial loading delay
  const [products, setProducts] = useState([]); // State for products data

  useEffect(() => {
    // Simulating fetching products data after 4 seconds delay (for initial loading)
    const timer = setTimeout(() => {
      setProducts([
        { _id: 1, productName: "CEILING", productImage: ['img1'] },
        { _id: 2, productName: "FLOOR", productImage: ['img2'] },
        { _id: 3, productName: "Bathroom", productImage: ['img3'] },
        { _id: 4, productName: "WALL", productImage: ['img4'] },
      ]);
      setLoading(false);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Cleanup function to clear the timer if component unmounts before 4 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (event) => {
    event.currentTarget.classList.add('hovered');
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.classList.remove('hovered');
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full h-50rem bg-slate-200 rounded-sm shadow animate-pulse"></div>
            ))
          : products.map((product) => (
              <Link
                key={product._id}
                to={`/product-category`} 
                className="relative w-full h-[36rem] bg-white rounded-sm shadow overflow-hidden group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={
                    product.productImage[0] === 'img1' ? img1 :
                    product.productImage[0] === 'img2' ? img2 :
                    product.productImage[0] === 'img3' ? img3 :
                    product.productImage[0] === 'img4' ? img4 :
                    img1 // Default image if product image doesn't match
                  }
                  alt={product.productName}
                  className="object-cover w-full h-full transition-transform transform group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 ransition-transform transform group-hover:scale-105 transition-all duration-1000 flex items-center justify-center opacity-100 transition-opacity">
                  <h2 className="text-white font-mono text-4xl font-medium">
                    {product.productName}
                  </h2>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Banner;
