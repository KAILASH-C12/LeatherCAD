import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini function helper
const getGeminiModel = (apiKey) => {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) throw new Error("API Key is missing");
    const genAI = new GoogleGenerativeAI(key);
    return genAI.getGenerativeModel({ model: "gemini-pro" });
};

// @desc    Generate design configuration from prompt
// @route   POST /api/ai/generate-design
router.post('/generate-design', async (req, res) => {
    try {
        const { prompt, productType } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `
            You are a fashion design assistant for a leather product configurator.
            The user will give you a description of a ${productType || 'product'}.
            You need to return a JSON object with color codes (hex) for the following parts based on the description.
            
            Supported Parts by Product:
            - jacket: body, sleeves, hardware
            - bag: body, handle, hardware
            - boots: body, sole, hardware
            
            Strictly return ONLY the JSON object. No markdown, no explanations.
            Example format for a jacket:
            {
                "body": "#1a1a1a",
                "sleeves": "#1a1a1a",
                "hardware": "#FFD700"
            }
            
            User Prompt: "${prompt}"
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const config = JSON.parse(jsonStr);

        res.json({ config });
    } catch (error) {
        console.error('AI Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate design', error: error.message });
    }
});

export default router;
