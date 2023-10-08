import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopProducts.css";

function TopProducts({ topProducts }) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const rotateProducts = () => {
      setCurrentProductIndex(
        (prevIndex) => (prevIndex + 1) % topProducts.length
      );
    };

    const intervalId = setInterval(rotateProducts, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [topProducts]);

  const handleScrollDownClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-products">
      <h1>Top 5 Products by Highest Reviews</h1>
      <div className="carousel-container">
        {topProducts.map((product, index) => (
          <Link
            to={`/product/${product.id}`} // Link to the product details page
            key={product.id}
            className={`carousel-item ${
              index === currentProductIndex ? "current" : ""
            }`}
          >
            <img src={product.image} alt={product.title} />
            <p>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </Link>
        ))}
        <div className="scroll-down-button">
          <button onClick={handleScrollDownClick}>
            Click here to scroll down
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
