import React, { useState, useEffect } from 'react';
import './main.css'

function ProductList() {
  const [products, setProducts] = useState([]); // Store all products
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [productsPerPage] = useState(5); // Number of products to display per page
  const [categoryFilter, setCategoryFilter] = useState(''); // Category filter
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order ('asc' or 'desc')
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Define the available category options
  const availableCategories = [
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing",
  ];

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the products to display on the current page
  const currentProducts = products
    .filter((product) =>
      product.category.toLowerCase().includes(categoryFilter.toLowerCase())
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    fetchProductList();
  }, []);

  async function fetchProductList() {
    try {
      const response = await fetch('https://ecommerce-acc-api.onrender.com/');
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  }

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle category filter change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Function to handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Function to handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="all-products">
      <h1>Product List</h1>
      <div className="filters">
        <div className="filter-selects">
          <label htmlFor="categoryFilter">Category:</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="sortOrder">Sort:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <label htmlFor="searchTerm">Search:</label>
          <input className='search-bar'
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="prod-price">${product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default ProductList;
