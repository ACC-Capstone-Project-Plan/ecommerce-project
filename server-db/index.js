const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
const connectDB = require("./connectMongo");
connectDB();
const Product = require("./models/products");
const User = require("./models/users");

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const products = await products.find();
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

    // Find the product by ID in the database
    const product = await product.findById(id);

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
    next(error); // Pass the error to the error handling middleware
  }
});

app.post("/products", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    const product = new product({
      title,
      price,
      description,
      category,
      image,
    });
    const data = await product.save();
    return res.status(201).json({
      msg: "Created",
      data,
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// All Users
app.get("/users", async (req, res) => {
  try {
    const users = await users.find({}, "-password");
    return res.status(200).json({
      msg: "OK",
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phone,
      address,
    } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        msg: "Username already exists",
      });
    }

    // Generate a salt for password hashing (you can configure the number of rounds)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with the hashed password and additional fields
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      phone,
      address,
    });

    await newUser.save();

    return res.status(201).json({
      msg: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are present
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    // Find a user with the matching username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json({ msg: "Login successful" });
    } else {
      return res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

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
    next(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});