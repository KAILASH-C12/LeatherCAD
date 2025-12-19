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
            const decoded = jwt.decode(token);

            if (!decoded) {
                return res.status(401).json({ message: 'Not authorized, token invalid' });
            }

            // Sync User with MongoDB
            // Clerk ID is in 'sub', email in 'email' (if present)
            const clerkId = decoded.sub;
            const email = decoded.email || decoded.primary_email_address || `clerk_${clerkId}@example.com`; // Fallback
            const name = decoded.name || decoded.first_name || 'Clerk User';

            // Find by clerkId OR email to link existing accounts
            let user = await User.findOne({
                $or: [{ clerkId: clerkId }, { email: email }]
            });

            if (user) {
                // Update existing user with clerkId if missing
                if (!user.clerkId) {
                    user.clerkId = clerkId;
                    await user.save();
                }
                req.user = user;
            } else {
                // Create new user in MongoDB
                // Only create if we have enough info, otherwise it might be a partial token
                const newUser = await User.create({
                    name: name,
                    email: email,
                    clerkId: clerkId,
                    role: 'designer', // Default role
                    password: '$2a$10$clerkuserpasswordplaceholder' + Date.now() // Placeholder
                });
                req.user = newUser;
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({ message: 'Not authorized, auth failed' });
        }
    } else {
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
