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
        console.log('Seeding started...');

        // 1. Seed Users (Kailash, Siddhant, Varsha)
        const usersToSeed = [
            { name: 'Kailash', email: 'kailash@example.com', password: 'password123', role: 'admin' },
            { name: 'Siddhant', email: 'siddhant@example.com', password: 'password123', role: 'designer' },
            { name: 'Varsha', email: 'varsha@example.com', password: 'password123', role: 'user' },
            { name: 'Jane Designer', email: 'designer@example.com', password: 'password123', role: 'designer' }
        ];

        const users = [];
        for (const u of usersToSeed) {
            let user = await User.findOne({ email: u.email });
            if (!user) {
                user = await User.create(u);
                console.log(`Created user: ${u.name}`);
            } else {
                console.log(`User exists: ${u.name}`);
            }
            users.push(user);
        }

        const [kailash, siddhant, varsha, jane] = users;

        // Fetch real products
        const dbProducts = await Product.find({});
        if (dbProducts.length === 0) {
            console.log('No products found, please run seedProducts.js first');
            process.exit(1);
        }
        const p1 = dbProducts[0];
        const p2 = dbProducts.length > 1 ? dbProducts[1] : dbProducts[0];

        // 2. Seed Projects
        await Project.deleteMany({});
        const projects = [
            { name: 'Leather Jacket 2025', description: 'Advanced biker jacket with smart heating.', status: 'active', createdBy: siddhant._id },
            { name: 'Luxury Handbag', description: 'Gold-plated hardware collection.', status: 'active', createdBy: siddhant._id },
            { name: 'Tesla Interior Custom', description: 'Vegan leather seat covers.', status: 'review', createdBy: kailash._id },
            { name: 'Winter Boots Archive', description: 'Last year\'s bestsellers.', status: 'archived', createdBy: jane._id }
        ];
        await Project.insertMany(projects);
        console.log(`Seeded ${projects.length} Projects`);

        // 3. Seed Orders (Historical Data for Charts)
        await Order.deleteMany({});
        const orders = [];
        const statuses = ['Processing', 'Shipped', 'Delivered'];

        // Helper to create random order
        const createOrder = (user, product, daysAgo, isPaid = true) => {
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            return {
                user: user._id,
                orderItems: [{
                    name: product.name,
                    qty: Math.floor(Math.random() * 3) + 1,
                    image: product.thumbnailUrl,
                    price: product.price_base,
                    product: product._id
                }],
                shippingAddress: {
                    firstName: user.name.split(' ')[0],
                    lastName: 'User',
                    address: '123 Maker St',
                    city: 'Innovation City',
                    postalCode: '10101',
                    country: 'India'
                },
                paymentMethod: 'Credit Card',
                paymentResult: { id: `mock_pay_${Date.now()}_${Math.random()}`, status: 'completed', update_time: date, email_address: user.email },
                itemsPrice: product.price_base,
                taxPrice: product.price_base * 0.1,
                shippingPrice: 10,
                totalPrice: product.price_base * 1.1 + 10,
                isPaid: isPaid,
                paidAt: isPaid ? date : null,
                isDelivered: daysAgo > 5, // Old orders delivered
                createdAt: date
            };
        };

        // Generate 20 random orders spanning last 30 days
        for (let i = 0; i < 20; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const product = Math.random() > 0.5 ? p1 : p2;
            const daysAgo = Math.floor(Math.random() * 30);
            orders.push(createOrder(user, product, daysAgo));
        }

        // Specific recent orders for visibility
        orders.push(createOrder(kailash, p1, 1));
        orders.push(createOrder(varsha, p2, 2, false)); // Unpaid

        await Order.insertMany(orders);
        console.log(`Seeded ${orders.length} Orders`);

        // 4. Seed Designs (Review Queue)
        await Design.deleteMany({});
        const designs = [
            {
                user: siddhant._id,
                name: 'Neon Cyberpunk Jacket',
                configuration: { color: 'neon-green', material: 'synthetic-leather' },
                product: p1._id,
                status: 'pending',
                previewImageUrl: 'https://placehold.co/600x400/00FF00/000?text=Cyberpunk+Jacket'
            },
            {
                user: varsha._id,
                name: 'Vintage Floral Bag',
                configuration: { color: 'brown', material: 'embossed-leather' },
                product: p2._id,
                status: 'pending',
                previewImageUrl: 'https://placehold.co/600x400/8B4513/FFF?text=Floral+Bag'
            },
            {
                user: jane._id,
                name: 'Minimalist Wallet',
                configuration: { color: 'black', material: 'matte-finish' },
                product: p1._id, // assuming wallet matches p1 for now
                status: 'approved',
                previewImageUrl: 'https://placehold.co/600x400/333/FFF?text=Wallet'
            }
        ];
        await Design.insertMany(designs);
        console.log(`Seeded ${designs.length} Designs`);

        console.log('Admin Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin data:', error);
        process.exit(1);
    }
};

seedAdminData();
