import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboard from './pages/UserDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EnterprisePage from './pages/EnterprisePage';
import BlogPage from './pages/BlogPage';
import LegalPage from './pages/LegalPage';
import LoginPage from './pages/auth/LoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPwPage from './pages/auth/ForgotPwPage';
import ResetPwPage from './pages/auth/ResetPwPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import Customizer from './pages/Customizer';
import AdminDashboard from './pages/AdminDashboard';
import DesignerDashboard from './pages/DesignerDashboard';

import { CartSidebar } from './components/cart/CartSidebar';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';

const RequireAdmin = ({ children }) => {
    const { user } = useUser();

    if (!user || user.primaryEmailAddress?.emailAddress !== 'kc3737381@gmail.com') {
        return <Navigate to="/" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <CartSidebar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
                <Route path="/catalog" element={<Layout><CatalogPage /></Layout>} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                <Route path="/enterprise" element={<Layout><EnterprisePage /></Layout>} />
                <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
                <Route path="/legal" element={<Layout><LegalPage /></Layout>} />

                {/* Unified Login Route */}
                {/* Unified Login Route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-login" element={<Navigate to="/login" replace />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPwPage />} />
                <Route path="/resetpassword/:token" element={<ResetPwPage />} />

                <Route path="/checkout" element={
                    <>
                        <SignedIn>
                            <Layout><CheckoutPage /></Layout>
                        </SignedIn>
                        <SignedOut>
                            <Navigate to="/login" />
                        </SignedOut>
                    </>
                } />

                {/* Redirect legacy routes */}
                <Route path="/login/designer" element={<Navigate to="/login" replace />} />
                <Route path="/login/admin" element={<Navigate to="/login" replace />} />

                <Route path="/customizer" element={<Customizer />} />

                {/* Protected Admin Route */}
                <Route path="/admin" element={
                    <SignedIn>
                        <RequireAdmin>
                            <AdminDashboard />
                        </RequireAdmin>
                    </SignedIn>
                } />

                <Route path="/designer" element={<DesignerDashboard />} />

                <Route path="/orders" element={
                    <SignedIn>
                        <Layout><OrdersPage /></Layout>
                    </SignedIn>
                } />
            </Routes>
            <Toaster position="top-center" richColors />
        </Router>
    );
}

export default App;
