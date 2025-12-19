import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import useAuthStore from '../../store/AuthStore';

export default function ResetPwPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword, isLoading } = useAuthStore();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const success = await resetPassword(token, password);
        if (success) {
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError('Failed to reset password. Link may be invalid or expired.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
                <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <div className="p-3 bg-green-500/10 text-green-500 rounded text-sm text-center">{message}</div>}
                    {error && <div className="p-3 bg-destructive/10 text-destructive rounded text-sm text-center">{error}</div>}

                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl px-10 py-3 text-black focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Set New Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
