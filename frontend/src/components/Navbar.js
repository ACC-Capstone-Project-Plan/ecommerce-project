import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const history = useHistory();

  const handleLogout = () => {
    // Call the onLogout function to clear the user
    onLogout();

    // Redirect the user to the /login route
    history.push('/login');
  };

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

        {/* Profile or Log In button */}
        {user ? (
          <>
            <Link to={`/user/${user}`}>
              <button className="Profile">Profile</button>
            </Link>
            <button className="Logout" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">
            <button className="Login">Log In</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
