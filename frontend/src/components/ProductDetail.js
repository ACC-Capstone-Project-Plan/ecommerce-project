import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p className="prod-price">${product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export default ProductDetail;
