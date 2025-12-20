import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import Project from './models/Project.js';
import Design from './models/Design.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

const seedAdminData = async () => {
    try {
        // Find existing users or create dummies
        let designer = await User.findOne({ email: 'designer@example.com' });
        if (!designer) {
            designer = await User.create({
                name: 'Jane Designer',
                email: 'designer@example.com',
                password: 'password123',
                role: 'designer'
            });
        }

        // 1. Seed Projects
        await Project.deleteMany({});
        const projects = [
            { name: 'Fall 2025 Collection', description: 'Leather jackets and boots for the upcoming season', status: 'active', createdBy: designer._id },
            { name: 'Custom Client: Tesla', description: 'Bespoke leather seats for Model S Plaid', status: 'active', createdBy: designer._id },
            { name: 'Archive: Summer 2024', description: 'Past summer collection designs', status: 'archived', createdBy: designer._id }
        ];
        await Project.insertMany(projects);
        console.log('Seeded Projects');

        // Fetch real products
        const dbProducts = await Product.find({});
        if (dbProducts.length === 0) {
            console.log('No products found, please run seedProducts.js first');
            process.exit(1);
        }

        const product1 = dbProducts[0]._id;
        const product2 = dbProducts.length > 1 ? dbProducts[1]._id : dbProducts[0]._id;

        // 2. Seed Orders
        await Order.deleteMany({});
        const orders = [
            {
                user: designer._id,
                orderItems: [{
                    name: 'Classic Leather Jacket',
                    qty: 1,
                    image: '/assets/jacket.jpg',
                    price: 299,
                    product: product1
                }],
                shippingAddress: {
                    firstName: 'Jane',
                    lastName: 'Designer',
                    address: '123 Fake St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA'
                },
                paymentMethod: 'Credit Card',
                paymentResult: { id: 'mock_payment_1', status: 'completed', update_time: Date.now(), email_address: 'designer@example.com' },
                itemsPrice: 299,
                taxPrice: 29.9,
                shippingPrice: 0,
                totalPrice: 328.9,
                isPaid: true,
                paidAt: Date.now(),
                isDelivered: false
            },
            {
                user: designer._id,
                orderItems: [{
                    name: 'Premium Tote Bag',
                    qty: 2,
                    image: '/assets/bag.jpg',
                    price: 149,
                    product: product2
                }],
                shippingAddress: {
                    firstName: 'Jane',
                    lastName: 'Designer',
                    address: '456 Design Blvd',
                    city: 'Los Angeles',
                    postalCode: '90001',
                    country: 'USA'
                },
                paymentMethod: 'PayPal',
                paymentResult: { id: 'mock_payment_2', status: 'completed', update_time: Date.now(), email_address: 'designer@example.com' },
                itemsPrice: 298,
                taxPrice: 20,
                shippingPrice: 15,
                totalPrice: 333,
                isPaid: true,
                paidAt: Date.now() - 86400000, // Yesterday
                isDelivered: true,
                deliveredAt: Date.now()
            }
        ];
        await Order.insertMany(orders);
        console.log('Seeded Orders');

        // 3. Seed Designs (Review Queue)
        await Design.deleteMany({});
        const designs = [
            {
                user: designer._id,
                name: 'Red Dragon Vest',
                configuration: { color: 'red', material: 'dragon-scale' },
                product: product1,
                status: 'pending',
                previewImageUrl: 'https://placehold.co/600x400/800000/FFF?text=Red+Dragon+Vest'
            },
            {
                user: designer._id,
                name: 'Blue Suede Shoes',
                configuration: { color: 'blue', material: 'suede' },
                product: product2,
                status: 'pending',
                previewImageUrl: 'https://placehold.co/600x400/000080/FFF?text=Blue+Suede+Shoes'
            }
        ];
        await Design.insertMany(designs);
        console.log('Seeded Designs');

        console.log('Admin Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin data:', error);
        process.exit(1);
    }
};

seedAdminData();
