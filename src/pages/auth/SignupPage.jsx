import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight, Building, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../../store/AuthStore';

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup, googleLogin, isLoading, error: authError, clearError } = useAuthStore();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: ''
    });

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
        const success = await signup(formData.name, formData.email, formData.password, formData.company);
        if (success) {
            navigate('/designer');
        }
    };

    const handleGoogleSignup = async () => {
        // Mock Google flow
        // In real app: use Google Login SDK to get token, then decode to get email/name/sub(googleId)
        const mockGoogleUser = {
            email: `google_user_${Date.now()}@gmail.com`,
            name: 'Google User',
            googleId: `google_id_${Date.now()}`
        };

        if (confirm("Mock Google Signup: Continue as " + mockGoogleUser.email + "?")) {
            const success = await googleLogin(mockGoogleUser.email, mockGoogleUser.name, mockGoogleUser.googleId);
            if (success) navigate('/designer');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground mb-2">
                        Create Account
                    </h1>
                    <p className="text-muted-foreground">Join LeatherCAD today</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                            />
                        </div>

                        <div className="relative group">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name (Optional)"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full bg-white border border-gray-300 text-black hover:bg-gray-50 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Google
                    </button>
                </div>

                <p className="text-center text-muted-foreground text-sm mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
