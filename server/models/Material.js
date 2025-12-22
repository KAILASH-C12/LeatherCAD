import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['leather', 'fabric', 'hardware', 'thread', 'other'],
        default: 'leather',
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    imageUrl: {
        type: String,
        required: false
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Material', materialSchema);
