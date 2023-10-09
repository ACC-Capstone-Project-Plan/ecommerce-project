import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!loginData.username || !loginData.password) {
        setError("Both username and password are required.");
        return;
      }

      // Send a POST request to your backend `/login` endpoint
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // If login is successful, get the userId from the response
        const data = await response.json();
        const userId = data.userId;

        // Call the onLogin function with the userId
        onLogin(userId);

        // Redirect to the user's profile page
        history.push(`/user/${userId}`);
      } else {
        setError("Invalid username or password.");
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