import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protect, adminOnly as admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get Admin Dashboard Stats
// @route   GET /api/stats/admin
// @access  Private/Admin
router.get('/admin', protect, admin, async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        const ordersCount = await Order.countDocuments();

        // Calculate Total Revenue
        const orders = await Order.find({ isPaid: true });
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

        // Recent Orders
        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');

        res.json({
            usersCount,
            productsCount,
            ordersCount,
            totalRevenue,
            recentOrders
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: 'Server Error fetching stats' });
    }
});

export default router;
