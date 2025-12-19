import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get Cart
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add Item
router.post('/add', protect, async (req, res) => {
    const { item } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const existingItem = user.cart.find(cartItem => cartItem.productId === item.id); // Using productId for simple matching

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                productId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1,
                config: item.config
            });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Remove Item
router.post('/remove', protect, async (req, res) => {
    const { itemId } = req.body; // Expecting the cart item ID (mongoose _id) or productId
    try {
        const user = await User.findById(req.user.id);

        // Filter out the item. Note: item._id is the subdocument ID
        user.cart = user.cart.filter(item => item._id.toString() !== itemId && item.productId !== itemId);

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Sync (Merge local cart with server cart on login)
router.post('/sync', protect, async (req, res) => {
    const { items } = req.body;
    try {
        const user = await User.findById(req.user.id);

        // Simple merge: Add local items if they don't exist in server cart
        items.forEach(localItem => {
            const exists = user.cart.find(serverItem => serverItem.productId === localItem.id);
            if (!exists) {
                user.cart.push({
                    productId: localItem.id,
                    name: localItem.name,
                    price: localItem.price,
                    image: localItem.image,
                    quantity: localItem.quantity || 1,
                    config: localItem.config
                });
            }
        });

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Clear Cart
router.post('/clear', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = [];
        await user.save();
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;
