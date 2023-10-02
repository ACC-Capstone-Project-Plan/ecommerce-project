import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const id = match.params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = `https://ecommerce-acc-api.onrender.com/product/${id}`;

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the product data in the state
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    // Display loading or error message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="center-content">
        <Link className="back-button" to="/">Back to Home</Link>
        <h1>{product.title}</h1>
        <p className="prod-price">Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <p>Category: {product.category}</p>
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};

export default ProductDetails;
