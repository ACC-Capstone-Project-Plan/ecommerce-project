const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const connectDB = require('./connectMongo');
connectDB();

const ProductModel = require('./models/products');

app.get('/products', async (req, res) => {
    try {
        const data = await ProductModel.find();
        return res.status(200).json({
            msg: 'OK',
            data
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const data = await ProductModel.findById(req.params.id);
        
        if (data) {
            return res.status(200).json({
                msg: 'OK',
                data
            });
        }
        
        return res.status(404).json({
            msg: 'Not Found',
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

app.post('/products', async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;
        const product = new ProductModel({
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
        await ProductModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            msg: 'Ok',
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
