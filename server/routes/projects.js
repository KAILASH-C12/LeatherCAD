import express from 'express';
import Project from '../models/Project.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, status } = req.body;

        const project = new Project({
            name,
            description,
            status
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
