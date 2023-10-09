import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api/api";

function LoginForm({ onLogin }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSuccess = (user) => {
    // Save the user's token in local storage
    localStorage.setItem("userToken", user.token);

    // Call the onLogin function to set the user in the app state
    onLogin(user);

    // Redirect to the profile page
    history.push("/profile");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(loginData);

      if (response.success) {
        // Call the function for successful login
        handleLoginSuccess(response.user);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="loginForm">
      <div className="loginForm-content">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
