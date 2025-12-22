import express from 'express';
import Material from '../models/Material.js';
import { protect, adminOnly as admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all materials
// @route   GET /api/materials
// @access  Public (or Private? Public for customizer, but let's keep unrestricted for now)
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find({}).sort({ createdAt: -1 });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a material
// @route   POST /api/materials
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, type, color, price, imageUrl, inStock } = req.body;

        const material = new Material({
            name,
            type,
            color,
            price,
            imageUrl,
            inStock
        });

        const createdMaterial = await material.save();
        res.status(201).json(createdMaterial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a material
// @route   DELETE /api/materials/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (material) {
            await material.deleteOne();
            res.json({ message: 'Material removed' });
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
