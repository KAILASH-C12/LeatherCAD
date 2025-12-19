import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/AuthStore';

export default function Login({ role = 'designer' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login, isLoading, error, clearError, user, isAuthenticated } = useAuthStore();

    // Clear errors when switching roles or checking in
    useEffect(() => {
        clearError();
    }, [role]);

    // Redirect if already logged in and matches role
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'designer') navigate('/designer');
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password, role);
        if (success) {
            // Navigation handled by useEffect or explicit check here
            // Checking store state immediately might be safe dependent on implementation
            // But relying on verify inside login is safer.
            // Let's rely on the returned success for immediate navigation to avoid race conditions with useEffect
            const currentUser = useAuthStore.getState().user;
            if (currentUser.role === 'admin') navigate('/admin');
            else if (currentUser.role === 'designer') navigate('/designer');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-leather-saddle/20 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-gray-100/95 backdrop-blur-xl rounded-2xl shadow-2xl text-gray-900 border border-white/20"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-md-orange-100 rounded-2xl mx-auto mb-4 bg-[#FDE68A]/20 border border-orange-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">LC</span>
                    </div>
                    <Link to="/">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight hover:text-primary transition-colors">LeatherCAD</h2>
                    </Link>
                    <p className="text-gray-500 mt-2">Welcome back, {role === 'admin' ? 'Administrator' : 'Designer'}!</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder={role === 'admin' ? 'admin@leathercad.com' : 'you@studio.com'}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-[#B48454] hover:bg-[#966b41] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <a href="#" className="text-[#B48454] hover:underline font-medium">Sign up</a>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to home</Link>
                </div>
            </motion.div>
        </div>
    );
}
