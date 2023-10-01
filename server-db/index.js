const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const connectDB = require('./connectMongo');
connectDB();

const products = require('./models/products');

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
        const data = await products.findById(req.params.id);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
