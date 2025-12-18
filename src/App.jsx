import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import CheckoutPage from './pages/CheckoutPage';
import Customizer from './pages/Customizer';
import AdminDashboard from './pages/AdminDashboard';
import DesignerDashboard from './pages/DesignerDashboard';

import { CartSidebar } from './components/cart/CartSidebar';

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
                {/* Redirect legacy routes to new login */}
                <Route path="/login/designer" element={<Navigate to="/login" replace />} />
                <Route path="/login/admin" element={<Navigate to="/login" replace />} />

                <Route path="/customizer" element={<Customizer />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/designer" element={<DesignerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
