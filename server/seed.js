
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import User from './models/User.js';
import Project from './models/Project.js';
import Product from './models/Product.js';
import Material from './models/Material.js';
import Order from './models/Order.js';
import Design from './models/Design.js';

const users = [
    { name: 'Kailash', email: 'kailash@example.com', password: 'password123', role: 'designer', company: 'Stark Industries' },
    { name: 'Siddhant', email: 'siddhant@example.com', password: 'password123', role: 'designer', company: 'Wayne Enterprises' },
    { name: 'Varsha', email: 'varsha@example.com', password: 'password123', role: 'designer', company: 'Cyberdyne Systems' },
    { name: 'Admin User', email: 'kc3737381@gmail.com', password: 'adminpassword', role: 'admin', company: 'LeatherCAD' },
    { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'designer', company: 'Acme Corp' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'designer', company: 'Globex' },
    { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', role: 'designer', company: 'Umbrella Corp' },
    { name: 'Bob Wilson', email: 'bob@example.com', password: 'password123', role: 'designer', company: 'InGen' },
    { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password123', role: 'designer', company: 'Soylent Corp' },
    { name: 'David Lee', email: 'david@example.com', password: 'password123', role: 'designer', company: 'Massive Dynamic' }
];

const projects = [
    { name: 'Summer Collection 2025', description: 'Lightweight leather jackets for the upcoming season.', status: 'active' },
    { name: 'Custom Biker Gear', description: 'Heavy duty protection wear.', status: 'active' },
    { name: 'Luxury Handbags', description: 'High-end exotic leathers.', status: 'completed' },
    { name: 'Winter Parkas', description: 'Insulated coats for extreme cold.', status: 'active' },
    { name: 'Accessories Line', description: 'Belts, wallets, and keychains.', status: 'active' },
    { name: 'Motorcycle Boots', description: 'Reinforced riding boots.', status: 'completed' },
    { name: 'Travel Luggage', description: 'Durable leather suitcases.', status: 'active' },
    { name: 'Phone Cases', description: 'Leather-wrapped tech accessories.', status: 'completed' },
    { name: 'Watch Straps', description: 'Vintage style watch bands.', status: 'active' },
    { name: 'Office Essentials', description: 'Desk pads and organizers.', status: 'active' }
];

const products = [
    { name: 'Classic Biker Jacket', category: 'jacket', price_base: 299, description: 'Timeless asymmetrical biker jacket.', thumbnailUrl: 'https://images.unsplash.com/photo-1551028919-ac7eedca84d2', modelUrl: '/models/jacket.glb' },
    { name: 'Weekend Duffle', category: 'bag', price_base: 199, description: 'Perfect for short getaways.', thumbnailUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', modelUrl: '/models/bag.glb' },
    { name: 'Slim Wallet', category: 'wallet', price_base: 49, description: 'Minimalist carry.', thumbnailUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93', modelUrl: '/models/wallet.glb' },
    { name: 'Racer Jacket', category: 'jacket', price_base: 349, description: 'Aerodynamic cut for speed.', thumbnailUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2', modelUrl: '/models/jacket.glb' },
    { name: 'Messenger Bag', category: 'bag', price_base: 159, description: 'For the daily commute.', thumbnailUrl: 'https://images.unsplash.com/photo-1590874103328-3fab95ea89e3', modelUrl: '/models/bag.glb' },
    { name: 'Card Holder', category: 'wallet', price_base: 29, description: 'Ultra slim profile.', thumbnailUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93', modelUrl: '/models/wallet.glb' },
    { name: 'Bomber Jacket', category: 'jacket', price_base: 279, description: 'Classic aviator style.', thumbnailUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', modelUrl: '/models/jacket.glb' },
    { name: 'Tote Bag', category: 'bag', price_base: 129, description: 'Spacious everyday carry.', thumbnailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', modelUrl: '/models/bag.glb' },
    { name: 'Passport Core', category: 'wallet', price_base: 59, description: 'Travel essential.', thumbnailUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93', modelUrl: '/models/wallet.glb' },
    { name: 'Chelsea Boots', category: 'boot', price_base: 189, description: 'Sleek ankle boots.', thumbnailUrl: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035', modelUrl: '/models/shoes.glb' }
];

const materials = [
    { name: 'Trial Leather', type: 'leather', color: 'Brown', price: 50, imageUrl: '' },
    { name: 'Black Matte', type: 'leather', color: 'Black', price: 60, imageUrl: '' },
    { name: 'Red Suede', type: 'leather', color: 'Red', price: 55, imageUrl: '' },
    { name: 'Blue Grain', type: 'leather', color: 'Blue', price: 52, imageUrl: '' },
    { name: 'White Patent', type: 'leather', color: 'White', price: 65, imageUrl: '' },
    { name: 'Gold Hardware', type: 'hardware', color: 'Gold', price: 20, imageUrl: '' },
    { name: 'Silver Hardware', type: 'hardware', color: 'Silver', price: 15, imageUrl: '' },
    { name: 'Bronze Hardware', type: 'hardware', color: 'Bronze', price: 18, imageUrl: '' },
    { name: 'Nylon Thread', type: 'thread', color: 'Black', price: 5, imageUrl: '' },
    { name: 'Silk Lining', type: 'fabric', color: 'Red', price: 30, imageUrl: '' }
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data (optional, but good for reset)
        // await User.deleteMany();
        // await Project.deleteMany();
        // await Product.deleteMany();
        // await Material.deleteMany();

        // Upsert Users
        console.log('Seeding Users...');
        for (const user of users) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                console.log(`Created user: ${user.name}`);
            } else {
                console.log(`User exists: ${user.name}`);
            }
        }

        // Upsert Projects
        console.log('Seeding Projects...');
        for (const project of projects) {
            const exists = await Project.findOne({ name: project.name });
            if (!exists) {
                await Project.create(project);
            }
        }
        console.log('Projects Imported!');

        // Upsert Products
        console.log('Seeding Products...');
        for (const product of products) {
            const exists = await Product.findOne({ name: product.name });
            if (!exists) {
                await Product.create(product);
            }
        }
        console.log('Products Imported!');

        // Upsert Materials
        console.log('Seeding Materials...');
        for (const mat of materials) {
            const exists = await Material.findOne({ name: mat.name });
            if (!exists) {
                await Material.create(mat);
            }
        }
        console.log('Materials Imported!');

        // --- NEW: Designs (Review Queue) ---
        console.log('Seeding Designs...');
        const designUser = await User.findOne({ email: 'siddhant@example.com' });
        const designProduct = await Product.findOne({ category: 'jacket' });
        const designProduct2 = await Product.findOne({ category: 'bag' });

        if (designUser && designProduct) {
            const designs = [
                { user: designUser, product: designProduct, name: 'Red Racer Custom', status: 'pending', configuration: { color: 'red' } },
                { user: designUser, product: designProduct, name: 'Siddhant Biker Special', status: 'approved', configuration: { color: 'black' } },
                { user: designUser, product: designProduct, name: 'Cyberpunk Jacket', status: 'pending', configuration: { color: 'neon' } },
                { user: designUser, product: designProduct2, name: 'Neon Messenger', status: 'pending', configuration: { color: 'green' } },
                { user: designUser, product: designProduct, name: 'Stealth Bomber', status: 'rejected', configuration: { color: 'matte black' } }
            ];

            for (const d of designs) {
                const exists = await Design.findOne({ name: d.name });
                if (!exists) {
                    await Design.create(d);
                }
            }
        }
        console.log('Designs Imported!');

        // --- NEW: Orders ---
        console.log('Seeding Orders...');
        const orderUser = await User.findOne({ email: 'kailash@example.com' });

        if (orderUser && designProduct) {
            const orders = [
                {
                    user: orderUser,
                    orderItems: [{ name: designProduct.name, qty: 1, price: designProduct.price_base, product: designProduct }],
                    shippingAddress: { firstName: 'Kailash', lastName: 'User', address: '123 Main St', city: 'Mumbai', postalCode: '400001', country: 'India' },
                    totalPrice: designProduct.price_base,
                    isPaid: true,
                    isDelivered: false,
                    createdAt: new Date('2025-12-20')
                },
                {
                    user: orderUser,
                    orderItems: [{ name: designProduct.name, qty: 2, price: designProduct.price_base, product: designProduct }],
                    shippingAddress: { firstName: 'Kailash', lastName: 'User', address: '123 Main St', city: 'Mumbai', postalCode: '400001', country: 'India' },
                    totalPrice: designProduct.price_base * 2,
                    isPaid: true,
                    isDelivered: true,
                    createdAt: new Date('2025-12-18')
                },
                {
                    user: orderUser,
                    orderItems: [{ name: designProduct2.name, qty: 1, price: designProduct2.price_base, product: designProduct2 }],
                    shippingAddress: { firstName: 'Kailash', lastName: 'User', address: 'Andheri West', city: 'Mumbai', postalCode: '400053', country: 'India' },
                    totalPrice: designProduct2.price_base,
                    isPaid: false,
                    isDelivered: false,
                    createdAt: new Date() // Recent
                },
                {
                    user: orderUser,
                    orderItems: [{ name: 'Custom Wallet', qty: 3, price: 50, product: designProduct }], // Mock item
                    shippingAddress: { firstName: 'Kailash', lastName: 'User', address: 'Bandra', city: 'Mumbai', postalCode: '400050', country: 'India' },
                    totalPrice: 150,
                    isPaid: true,
                    isDelivered: false,
                    createdAt: new Date() // Recent
                }
            ];

            // Always add if not full
            if ((await Order.countDocuments()) < 4) {
                await Order.insertMany(orders);
            }
        }
        console.log('Orders Imported!');


        console.log('Data Imported - SUCCESS');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
