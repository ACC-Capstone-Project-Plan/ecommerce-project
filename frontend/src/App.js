import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ProductList from "./components/ProductsList";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Profile from "./components/profile";
import Cart from "./components/Cart";
import UserCart from "./components/userCart";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Function to load cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Function to load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Save the user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    // Remove the user data from localStorage on logout
    localStorage.removeItem("user");
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );
    if (existingCartItem) {
      // If the product is already in the cart, update its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }

    // Update localStorage
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { product, quantity: 1 }])
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    // Update the cart state by filtering out the item to remove
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );

    // Update localStorage with the updated cart data
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item.product.id !== productId))
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    // Find the cart item by productId and update its quantity
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          user={user}
          onLogout={handleLogout}
          cartItemCount={cart.length}
        />
        <div className="content-container">
          <Route path="/" exact>
            <ProductList addToCart={addToCart} />
          </Route>
          <Route
            path="/login"
            render={(props) => <LoginForm {...props} onLogin={handleLogin} />}
          />
          <Route
            path="/my-cart/:userId"
            render={(props) =>
              user ? (
                <UserCart {...props} userId={user.id} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            render={(props) =>
              user ? (
                <Profile {...props} user={user} onLogout={handleLogout} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/cart">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
