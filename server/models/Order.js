import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        design: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Design'
        },
        productType: String, // Snapshot in case design is deleted
        customization: Object, // Snapshot of configuration
        quantity: { type: Number, default: 1 },
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentInfo: {
        id: String, // Stripe PaymentIntent ID
        status: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', OrderSchema);
