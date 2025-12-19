import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // ---------------------------------------------------------
            // CLERK INTEGRATION NOTE:
            // Since we are using Clerk on Frontend but don't have the Secret Key 
            // to verify signatures on backend, we will decode the token 
            // without verification for this PROTOTYPE step.
            // ---------------------------------------------------------

            const decoded = jwt.decode(token); // Insecure: Trusting token content

            if (!decoded) {
                return res.status(401).json({ message: 'Not authorized, token invalid' });
            }

            // Check if user exists in our DB, if not create shadow user
            // We use 'sub' as unique ID or email if available
            // Clerk tokens usually have 'sub' (User ID)

            // For this prototype, we will try to find user by email if available in token,
            // or just mock the user object so the app doesn't crash.

            // NOTE: Clerk JWTs might not have email in payload unless configured.
            // We'll rely on a known admin email for the admin check.

            let user = await User.findOne({
                $or: [{ googleId: decoded.sub }, { email: 'kc3737381@gmail.com' }] // Fallback
            });

            if (!user) {
                // If checking 'kc3737381@gmail.com' specifically as requested
                // We might need to persist this user if it's the admin
                req.user = {
                    _id: decoded.sub,
                    name: 'Clerk User',
                    email: 'kc3737381@gmail.com', // Force for prototype if needed
                    role: 'admin' // Force admin for testing as requested
                };
            } else {
                req.user = user;
            }

            // If the code relies on Mongoose document methods, this mock object might fail.
            // Ideally we should create a user in DB.

            next();
        } catch (error) {
            console.error(error);
            // Allow through for now to prevent blockage if token parsing fails? 
            // No, better to fail.
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
