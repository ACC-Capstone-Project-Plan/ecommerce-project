const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");
connectDB();

const products = require("./models/products");
const allUser = require("./models/users");

// Use the 'cors' middleware to enable CORS
app.use(cors());

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      msg: "OK",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if productId is a positive integer
    if (!/^[1-9]\d*$/.test(productId)) {
      return res.status(400).json({
        msg: "Invalid product ID format",
      });
    }

    // Convert productId to an integer
    const id = parseInt(productId);

    // Find the product by ID in the data array
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        msg: "Product not found",
      });
    }

    return res.status(200).json({
      msg: "OK",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    const product = new products({
      title,
      price,
      description,
      category,
      image,
    });
    const data = await product.save();
    return res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: "Ok",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

// All Users
app.get("/users", async (req, res) => {
  try {
    return res.status(200).json({
      msg: "OK",
      data: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = allUser.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({
        msg: "Username already exists",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Add the new user to the allUser array (or save it to your database)
    allUser.push(newUser);

    return res.status(200).json({
      msg: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are present
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  // Find a user with the matching username
  const matchedUser = allUser.find((user) => user.username === username);

  if (matchedUser) {
    // Check the password using bcrypt
    const passwordMatch = bcrypt.compareSync(password, matchedUser.password);

    if (passwordMatch) {
      // If the username and password match, send back the user data
      res.status(200).json({ user: matchedUser });
    } else {
      // If the password does not match, send an error response
      res.status(401).json({ msg: "Invalid password" });
    }
  } else {
    // If no matching user is found, send an error response
    res.status(401).json({ msg: "Invalid username" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Convert userId to an integer
    const id = parseInt(userId);

    // Find the user by ID in the allUser array
    const user = allUser.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    return res.status(200).json({
      msg: "OK",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
