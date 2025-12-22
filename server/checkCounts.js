import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected');
    const u = await User.countDocuments();
    const p = await Product.countDocuments();
    const o = await Order.countDocuments();
    console.log(`Users: ${u}, Products: ${p}, Orders: ${o}`);
    process.exit();
}).catch(e => console.log(e));
