import { Link } from 'react-router-dom';
import { ShoppingBag, User, Shield } from 'lucide-react';

import { useCartStore } from '../../store/CartStore';

export default function Navbar() { // Removed props
    const items = useCartStore((state) => state.items);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const cartCount = items.length; // Or reduce quantity if you prefer total quantity

    return (
        <nav className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <img src="/assets/logo.png" alt="LeatherCAD Logo" className="w-8 h-8 object-contain" />
                    LeatherCAD
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">Features</Link>
                    <Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Catalog</Link>
                    <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/customizer" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                        3D Customize
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>

                    <button onClick={toggleCart} className="relative text-gray-400 hover:text-white transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <Link to="/login/designer" className="text-sm font-medium hover:text-white transition-colors">Login</Link>
                    <Link to="/dashboard" className="text-sm font-medium hover:text-white transition-colors">Dashboard</Link>
                    <Link to="/login/designer" className="btn-primary flex items-center gap-2">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
