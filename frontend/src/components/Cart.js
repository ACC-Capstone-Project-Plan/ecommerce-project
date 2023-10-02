import React, { useState} from "react";

function Cart() {
  // Initialize the cart state by fetching data from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  });

  // Function to update the cart in both state and localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };


  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    updateCart(updatedCart);
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  // Calculate the total price of the cart
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="product-details">
                <img src={item.product.image} alt={item.product.title} />
                <div>
                  <h3>{item.product.title}</h3>
                  <p>
                    Rating: {item.product.rating.rate} (
                    {item.product.rating.count} reviews)
                  </p>
                </div>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <span>${item.product.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <p>Total: ${total}</p>
    </div>
  );
}

export default Cart;
