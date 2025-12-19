import { useState } from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { ShieldCheck, User } from 'lucide-react';

const LoginPage = () => {
    const [loginType, setLoginType] = useState('user'); // 'user' | 'admin'

    const isUser = loginType === 'user';

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">

                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            LeatherCAD
                        </span>
                    </Link>
                    <p className="text-gray-500 mt-2 text-sm">
                        {isUser ? 'Sign in to your account' : 'Administrative Access'}
                    </p>
                </div>

                {/* Clean Toggle */}
                <div className="bg-gray-100 p-1 rounded-lg mb-8 flex relative">
                    <button
                        onClick={() => setLoginType('user')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 z-10 ${isUser ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <User size={16} />
                        User Log In
                    </button>
                    <button
                        onClick={() => setLoginType('admin')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 z-10 ${!isUser ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                                colorPrimary: isUser ? "#2563eb" : "#dc2626", // Blue for user, Red for admin
                                colorText: "#1f2937",
                                colorBackground: "#ffffff",
                                colorInputBackground: "#f9fafb",
                                colorInputText: "#1f2937",
                                borderRadius: "0.5rem",
                            },
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-none w-full p-0",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                formButtonPrimary: "font-semibold shadow-none",
                                socialButtonsBlockButton: "border-gray-200 text-gray-600 hover:bg-gray-50",
                                dividerLine: "bg-gray-200",
                                dividerText: "text-gray-400",
                                formFieldLabel: "text-gray-700 font-medium",
                                formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                footerActionText: "text-gray-500",
                                footerActionLink: `font-medium ${isUser ? 'text-blue-600 hover:text-blue-700' : 'text-red-600 hover:text-red-700'}`
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
