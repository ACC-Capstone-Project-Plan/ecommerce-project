import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RegistrationForm = ({ onRegister }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: {
      firstname: "",
      lastname: "",
    },
    email: "",
    phone: "",
    address: {
      geolocation: {
        lat: "",
        long: "",
      },
      city: "",
      street: "",
      number: "",
      zipcode: "",
    },
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      if (response.ok) {
        onRegister();
        history.push("/login");
      } else {
        const errorData = await response.json();
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
    <div className="registrationForm">
      <div className="registrationForm-content">
        <h2>Register</h2>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Add fields for name, email, phone, and address */}
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="name.firstname"
              value={formData.name.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="name.lastname"
              value={formData.name.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lat">Latitude:</label>
            <input
              type="text"
              id="lat"
              name="address.geolocation.lat"
              value={formData.address.geolocation.lat}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="long">Longitude:</label>
            <input
              type="text"
              id="long"
              name="address.geolocation.long"
              value={formData.address.geolocation.long}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Street Number:</label>
            <input
              type="text"
              id="number"
              name="address.number"
              value={formData.address.number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              type="text"
              id="zipcode"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
