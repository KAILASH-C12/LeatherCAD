import express from 'express';
import Design from '../models/Design.js';
import { protect } from '../middleware/authMiddleware.js';
import { generateTechPack } from '../services/techPackService.js';

const router = express.Router();

// @desc    Save a new design
// @route   POST /api/designs
router.post('/', protect, async (req, res) => {
    try {
        const { product, name, configuration, previewImageUrl, isPublic } = req.body;

        const design = await Design.create({
            user: req.user._id,
            product,
            name,
            configuration,
            previewImageUrl,
            isPublic
        });

        res.status(201).json(design);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get designs
// @route   GET /api/designs
router.get('/', protect, async (req, res) => {
    try {
        let query = {};

        // Admin sees all designs, Designers/Users see only their own
        if (req.user.role !== 'admin') {
            query.user = req.user._id;
        }

        const designs = await Design.find(query)
            .populate('product', 'name category')
            .populate('user', 'name email') // Helpful for admin to identify author
            .sort({ updatedAt: -1 });
        res.json(designs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get design by ID
// @route   GET /api/designs/:id
router.get('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id)
            .populate('user', 'name')
            .populate('product', 'name category modelUrl');

        if (design) {
            // Check visibility
            if (!design.isPublic && (!req.user || design.user._id.toString() !== req.user._id.toString())) {
                // Check auth
            }
            res.json(design);
        } else {
            res.status(404).json({ message: 'Design not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update design status
// @route   PUT /api/designs/:id/status
router.put('/:id/status', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const design = await Design.findById(req.params.id);

        if (design) {
            design.status = req.body.status;
            const updatedDesign = await design.save();
            res.json(updatedDesign);
        } else {
            res.status(404).json({ message: 'Design not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete design
// @route   DELETE /api/designs/:id
router.delete('/:id', protect, async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);

        if (design) {
            // Check ownership or admin role
            if (design.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await design.deleteOne();
            res.json({ message: 'Design removed' });
        } else {
            res.status(404).json({ message: 'Design not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Download Tech Pack PDF
// @route   GET /api/designs/:id/export
router.get('/:id/export', protect, async (req, res) => {
    try {
        const design = await Design.findById(req.params.id).populate('product').populate('user');

        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }

        // Authorization check
        if (design.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=TechPack-${design._id}.pdf`);

        generateTechPack(design, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'PDF Generation Failed' });
    }
});

export default router;
