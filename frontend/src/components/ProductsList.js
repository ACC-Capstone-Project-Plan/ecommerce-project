import React, { useState, useEffect } from 'react';

function ProductList() {
  // Define state to store the list of products
  const [products, setProducts] = useState([]);

  // Define an effect to fetch the list of products when the component mounts
  useEffect(() => {
    fetchProductList();
  }, []);

  // Function to fetch the product list from the API
  async function fetchProductList() {
    try {
      const response = await fetch('https://ecommerce-acc-api.onrender.com/');

      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Update the products state with the fetched data
      setProducts(data.data); // Assuming 'data' contains the products array
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  }

  return (
    <div className="all-products">
      <h1>Product List</h1>
      {/* Add filters and other UI elements as needed */}
      <div className="filters">
        <div className="filter-selects">
          {/* You can add filter controls here */}
        </div>
      </div>
      {/* Display the list of products */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
