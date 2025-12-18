import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Return dummy data if DB empty
        const products = await Product.find();
        if (products.length === 0) {
            return res.json([
                { _id: '1', name: 'Dean Biker Jacket', category: 'jacket', price: 899, imageUrl: '...' },
                { _id: '2', name: 'Messenger Bag', category: 'bag', price: 399, imageUrl: '...' }
            ]);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
