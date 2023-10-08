import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import TopProducts from "./TopProducts";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const availableCategories = [
    "men's clothing",
    "jewelry",
    "electronics",
    "women's clothing",
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.category.toLowerCase().includes(categoryFilter.toLowerCase())
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
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
      const response = await fetch("https://ecommerce-acc-api.onrender.com/");
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }

  // Function to get the top 5 products by highest reviews
  function getTopProducts(products, count) {
    return products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, count);
  }

  // Inside the ProductList component
  const top5Products = getTopProducts(products, 5);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (product) => {
    console.log("Adding product to cart:", product);
    const existingProductIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingProductIndex !== -1) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, { product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  return (
    <div className="all-products">
      <TopProducts topProducts={top5Products} />
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
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <label htmlFor="searchTerm">Search:</label>
          <input
            className="search-bar"
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <div className="product" key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.title} />
              <h1>{product.title}</h1>
              <p className="prod-price">${product.price}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default ProductList;
