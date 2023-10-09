import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  // Function to handle successful login
  const handleLoginSuccess = (userId) => {
    // Save the user's login status in localStorage
    localStorage.setItem("userId", userId);
    // Trigger the onLogin function to update the user state in the App component
    onLogin(userId);
    // Redirect to the user's profile
    history.push(`/user/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Request Data:', formData);
      const response = await fetch("https://ecommerce-acc-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response Data:', data);
        handleLoginSuccess(data.userId);
      } else {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        setError(errorData.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="loginForm">
      <div className="loginForm-content">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Not registered?{" "}
          <Link to="/register">Click here to register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
