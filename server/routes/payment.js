import express from 'express';
// import Stripe from 'stripe';

const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Mock payment intent for development
router.post('/create-intent', async (req, res) => {
    try {
        const { items } = req.body;

        // Calculate total (mock logic)
        // In real app, look up prices from DB to avoid client-side manipulation
        const totalAmount = 14900; // $149.00

        // Mock response
        res.json({
            clientSecret: 'mock_client_secret_' + Date.now(),
            amount: totalAmount
        });

        // Real implementation:
        /*
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
        */
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
