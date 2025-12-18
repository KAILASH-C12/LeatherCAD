import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/CartStore';

export default function ProductDetailPage() {
    const { id } = useParams();
    const addItem = useCartStore(state => state.addItem);

    // Mock Product Data (In real app, fetch by ID)
    const product = {
        id: id,
        name: "Premium Biker Jacket",
        price: 899,
        description: "Hand-crafted from full-grain Italian leather. Features animated 3D preview and full customization options.",
        image: "https://images.unsplash.com/photo-1551028919-ac7fa7ea47ea?auto=format&fit=crop&q=80&w=600"
    };

    return (
        <div className="min-h-screen bg-background-dark text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <Link to="/catalog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
                    <ArrowLeft size={20} /> Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Visual Side */}
                    <div className="bg-background-card rounded-2xl border border-white/10 overflow-hidden h-[500px] flex items-center justify-center relative">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl font-bold mb-4">3D Preview Loading...</h3>
                            <Link to={`/customizer?product=jacket`} className="btn-primary px-8 py-3">
                                Open 3D Configurator
                            </Link>
                        </div>
                    </div>

                    {/* Details Side */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
                            <div className="text-3xl font-light text-primary">${product.price}</div>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div className="flex gap-4 pt-8 border-t border-white/10">
                            <button
                                onClick={() => addItem(product)}
                                className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                            <Link
                                to={`/customizer?product=jacket`}
                                className="flex-1 border border-white/20 hover:bg-white/5 font-bold py-4 rounded-xl transition-colors flex items-center justify-center"
                            >
                                Customize
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
