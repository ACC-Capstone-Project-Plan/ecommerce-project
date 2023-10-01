const express = require('express');
const app = express();
const cors = require('cors');
const mongoose =require('mongoose')

require('dotenv').config();

app.use(express.json());

const connectDB = require('./connectMongo');
connectDB();

const products = require('./models/products');

// Use the 'cors' middleware to enable CORS
app.use(cors());

app.get('/', async (req, res) => {
    try {
        return res.status(200).json({
            msg: 'OK',
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if productId is a positive integer
        if (!/^[1-9]\d*$/.test(productId)) {
            return res.status(400).json({
                msg: 'Invalid product ID format',
            });
        }

        // Convert productId to an integer
        const id = parseInt(productId);

        // Find the product by ID in the data array
        const product = products.find((p) => p.id === id);

        if (!product) {
            return res.status(404).json({
                msg: 'Product not found',
            });
        }

        return res.status(200).json({
            msg: 'OK',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
});

app.post('/', async (req, res) => {
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
            msg: 'Ok',
            data
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        await products.findByIdAndDelete(req.params.id); 
        return res.status(200).json({
            msg: 'Ok',
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
