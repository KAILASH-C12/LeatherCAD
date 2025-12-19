import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import designRoutes from './routes/designs.js';
import paymentRoutes from './routes/payment.js';
import aiRoutes from './routes/ai.js';
import cartRoutes from './routes/cart.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        // Log masked URI for debugging
        const maskedURI = process.env.MONGO_URI.replace(/:\/\/([^:]+):([^@]+)@/, '://***:***@');
        console.log(`Attribute Connection to: ${maskedURI}`);

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
        });
        console.log('Connected to MongoDB');

        // Only start server after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit with failure
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('LeatherCAD API is running');
});
