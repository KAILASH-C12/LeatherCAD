import mongoose from 'mongoose';
import Product from './models/Product.js';

mongoose.connect('mongodb://localhost:27017/leathercad')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedProducts = async () => {
    try {
        await Product.deleteMany({}); // Clear existing products

        const products = [
            {
                name: 'Classic Leather Jacket',
                category: 'jacket',
                price_base: 299,
                modelUrl: 'jacket',
                thumbnailUrl: '/assets/jacket-thumb.jpg'
            },
            {
                name: 'Premium Tote Bag',
                category: 'bag',
                price_base: 149,
                modelUrl: 'bag',
                thumbnailUrl: '/assets/bag-thumb.jpg'
            },
            {
                name: 'Motorcycle Boots',
                category: 'boot',
                price_base: 199,
                modelUrl: 'boots',
                thumbnailUrl: '/assets/boots-thumb.jpg'
            },
            {
                name: 'Heritage Belt',
                category: 'belt',
                price_base: 59,
                modelUrl: 'belt',
                thumbnailUrl: '/assets/belt-thumb.jpg'
            },
            {
                name: 'Slim Wallet',
                category: 'wallet',
                price_base: 45,
                modelUrl: 'wallet',
                thumbnailUrl: '/assets/wallet-thumb.jpg'
            },
            {
                name: 'Weekender Duffle',
                category: 'bag',
                price_base: 249,
                modelUrl: 'bag',
                thumbnailUrl: '/assets/duffle-thumb.jpg'
            }
        ];

        for (const product of products) {
            await Product.create(product);
        }

        console.log('Product catalog seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
