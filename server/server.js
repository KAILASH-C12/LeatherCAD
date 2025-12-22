import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import designRoutes from './routes/designs.js';
import paymentRoutes from './routes/payment.js';
import aiRoutes from './routes/ai.js';
import orderRoutes from './routes/orders.js';
import projectRoutes from './routes/projects.js';
import cartRoutes from './routes/cart.js';
import materialRoutes from './routes/materials.js';
import userRoutes from './routes/userRoutes.js';
import statsRoutes from './routes/stats.js';

// ... (other imports)
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.send('LeatherCAD API is running');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
