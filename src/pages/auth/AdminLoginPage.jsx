import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background bg-grid-white/[0.02] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

            <div className="w-full max-w-md p-6 relative z-10">
                <Link to="/" className="flex flex-col items-center justify-center gap-2 mb-8 group">
                    <div className="bg-red-500/10 p-3 rounded-full group-hover:bg-red-500/20 transition-colors">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                        Admin Portal
                    </span>
                    <p className="text-sm text-muted-foreground">Authorized Personnel Only</p>
                </Link>
                <div className="flex justify-center">
                    <SignIn
                        fallbackRedirectUrl="/admin"
                        signUpUrl="/signup" // Admins usually shouldn't sign up publicly, but for now
                        appearance={{
                            elements: {
                                card: "bg-card border border-red-500/20 shadow-xl shadow-red-500/5",
                                headerTitle: "text-foreground",
                                headerSubtitle: "text-muted-foreground",
                                socialButtonsBlockButton: "bg-secondary text-foreground hover:bg-secondary/80 border-border",
                                formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white",
                                formFieldLabel: "text-foreground",
                                formFieldInput: "bg-background border-input text-foreground",
                                footerActionText: "text-muted-foreground",
                                footerActionLink: "text-red-500 hover:text-red-400"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
