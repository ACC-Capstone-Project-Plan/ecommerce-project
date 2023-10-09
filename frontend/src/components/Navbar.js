import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div className="navbar-buttons">
        {/* Home button */}
        <Link to="/">
          <button className="Home">Home</button>
        </Link>

        {/* Cart button for logged-out users */}
        <Link to="/cart">
          <button className="Cart">Cart</button>
        </Link>

        {/* Users button */}
        <Link to="/profile">
          <button className="users">Profile</button>
        </Link>

        {/* Conditionally render Login or Logout button */}
        {user ? (
          <button className="login" onClick={onLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;