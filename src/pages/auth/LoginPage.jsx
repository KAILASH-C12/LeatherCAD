import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/AuthStore';

export default function LoginPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState('designer'); // 'designer' | 'admin'
    const { login, isLoading, error: authError, clearError } = useAuthStore();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Restore loading state if it was missing or just ensure it's there.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Sync local error with store error
    useEffect(() => {
        if (authError) setError(authError);
    }, [authError]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Local loading state for UI feedback
        setError('');

        const success = await login(formData.email, formData.password, role);

        if (success) {
            // Redirect logic is handled by the component or we can do it here
            const user = useAuthStore.getState().user;
            if (user.role === 'admin') {
                navigate('/admin'); // Changed from /admin-dashboard
            } else if (user.role === 'designer') {
                navigate('/designer'); // Changed from /designer-dashboard
            } else {
                navigate('/dashboard');
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                {/* Logo or Brand */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground mb-2">
                            LeatherCAD
                        </h1>
                    </Link>
                    <p className="text-muted-foreground">Sign in to your account</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                    {/* Role Toggle */}
                    <div className="flex bg-secondary/50 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => setRole('designer')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${role === 'designer'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <User size={18} />
                            Designer
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${role === 'admin'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Shield size={18} />
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Mock Credentials Hint */}
                        <div className="text-xs text-muted-foreground p-2 bg-secondary/50 rounded text-center">
                            Mock Login: <span className="font-mono text-primary">{role}@leathercad.com</span>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                                <input type="checkbox" className="rounded border-border bg-secondary/50 text-primary focus:ring-primary" />
                                Remember me
                            </label>
                            <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In as {role === 'admin' ? 'Admin' : 'Designer'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-muted-foreground text-sm mt-8">
                    Don't have an account?{' '}
                    <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">Sign up</a>
                </p>
            </div>
        </div>
    );
}
