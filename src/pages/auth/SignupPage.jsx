import { SignUp } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

export default function SignupPage() {
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
                        Create your account
                    </p>
                </div>

                {/* Signup Form Container */}
                <div className="flex justify-center">
                    <SignUp
                        path="/signup"
                        signInUrl="/login"
                        fallbackRedirectUrl="/designer"
                        appearance={{
                            layout: {
                                socialButtonsPlacement: "bottom",
                                socialButtonsVariant: "blockButton",
                            },
                            variables: {
                                colorPrimary: "#2563eb",
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
                                footerActionLink: "font-medium text-blue-600 hover:text-blue-700"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
