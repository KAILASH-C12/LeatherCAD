import mongoose from 'mongoose';
import User from './models/User.js';

mongoose.connect('mongodb://localhost:27017/leathercad')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedUsers = async () => {
    try {
        await User.deleteMany({}); // Clear existing users

        const users = [
            {
                name: 'System Admin',
                email: 'admin@leathercad.com',
                password: 'password123',
                role: 'admin',
                company: 'LeatherCAD Corp'
            },
            {
                name: 'Pro Designer',
                email: 'designer@studio.com',
                password: 'password123',
                role: 'designer',
                company: 'Creative Studio'
            }
        ];

        for (const user of users) {
            await User.create(user);
        }

        console.log('Users seeded successfully');
        console.log('Admin: admin@leathercad.com / password123');
        console.log('Designer: designer@studio.com / password123');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
