import { useState } from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { ShieldCheck, User } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [loginType, setLoginType] = useState('user'); // 'user' | 'admin'

    const isUser = loginType === 'user';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 relative z-10"
            >

                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                            LeatherCAD
                        </span>
                    </Link>
                    <p className="text-gray-400 mt-2 text-sm">
                        {isUser ? 'Sign in to your account' : 'Administrative Access'}
                    </p>
                </div>

                {/* Clean Toggle */}
                <div className="bg-white/5 p-1 rounded-lg mb-8 flex relative border border-white/10">
                    <button
                        onClick={() => setLoginType('user')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 z-10 ${isUser ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <User size={16} />
                        User Log In
                    </button>
                    <button
                        onClick={() => setLoginType('admin')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 z-10 ${!isUser ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <ShieldCheck size={16} />
                        Admin Access
                    </button>
                </div>

                {/* Login Form Container */}
                <div className="flex justify-center">
                    <SignIn
                        key={loginType}
                        fallbackRedirectUrl={isUser ? "/dashboard" : "/admin"}
                        signUpUrl="/signup"
                        appearance={{
                            layout: {
                                socialButtonsPlacement: "bottom",
                                socialButtonsVariant: "blockButton",
                            },
                            variables: {
                                colorPrimary: isUser ? "#3b82f6" : "#dc2626", // Bright Blue for user, Red for admin
                                colorText: "#ffffff",
                                colorBackground: "transparent",
                                colorInputBackground: "#171717",
                                colorInputText: "#ffffff",
                                colorTextSecondary: "#9ca3af",
                                borderRadius: "0.5rem",
                                colorAlphaShade: "white"
                            },
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-none w-full p-0 bg-transparent",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                formButtonPrimary: "font-semibold shadow-lg hover:shadow-xl transition-all",
                                socialButtonsBlockButton: "border-white/10 text-gray-200 hover:bg-white/5",
                                dividerLine: "bg-white/10",
                                dividerText: "text-gray-500",
                                formFieldLabel: "text-gray-300 font-medium mb-1",
                                formFieldInput: "border-white/10 focus:border-blue-500 focus:ring-blue-500/20 bg-white/5",
                                footerActionText: "text-gray-400",
                                footerActionLink: `font-medium ${isUser ? 'text-blue-400 hover:text-blue-300' : 'text-red-400 hover:text-red-300'}`
                            }
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
