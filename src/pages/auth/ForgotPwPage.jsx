import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import useAuthStore from '../../store/AuthStore';

export default function ForgotPwPage() {
    const { forgotPassword, isLoading, error: authError } = useAuthStore();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const success = await forgotPassword(email);
        if (success) {
            setMessage('Password reset email sent. Please check your inbox (and console for mock).');
        } else {
            setError('Failed to send reset email. User might not exist.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
                <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground mb-6">Enter your email to receive a reset link.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <div className="p-3 bg-green-500/10 text-green-500 rounded text-sm text-center">{message}</div>}
                    {error && <div className="p-3 bg-destructive/10 text-destructive rounded text-sm text-center">{error}</div>}

                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}
