import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCartStore } from '../../store/CartStore';
import useAuthStore from '../../store/AuthStore';

export default function Layout({ children }) {
    const { fetchCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart]);

    return (
        <div className="min-h-screen bg-background-dark text-gray-100 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
