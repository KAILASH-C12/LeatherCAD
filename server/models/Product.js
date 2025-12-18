import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['jacket', 'bag', 'boot', 'wallet', 'belt'],
        required: true
    },
    price_base: {
        type: Number,
        required: true
    },
    description: String,
    thumbnailUrl: String,
    modelUrl: {
        type: String,
        required: true
    }, // Path to .glb file

    // Default camera positions for this product
    cameraConfig: {
        initialPosition: [Number],
        target: [Number]
    },

    // Defines what can be customized on this product
    customizableZones: [{
        zoneKey: String, // e.g. "body_main", "sleeves", "zipper_main"
        name: String,    // Display name
        type: {
            type: String,
            enum: ['material', 'color', 'component', 'text']
        },
        compatibleMaterials: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material'
        }],
        compatibleComponents: [{ // For zippers, buckles etc
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Component'
        }]
    }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
