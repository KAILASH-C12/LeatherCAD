import { useState } from 'react';
import { Search, Filter, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/CartStore';

const products = [
    { id: 1, name: "The Classic Biker", price: 899, category: "Jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600", tag: "Best Seller", type: "jacket" },
    { id: 2, name: "Weekend Duffel", price: 549, category: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", tag: "New", type: "bag" },
    { id: 3, name: "Cheng Chelsea", price: 449, category: "Shoes", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 4, name: "Heritage Belt", price: 149, category: "Accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=600", type: "belt" },
    { id: 5, name: "Slim Wallet", price: 129, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600", type: "wallet" },
    { id: 6, name: "Dean Bike Jacket", price: 920, category: "Jackets", image: "/dean_jacket.png", type: "jacket" },
    { id: 7, name: "Oxford Boots", price: 499, category: "Shoes", image: "https://images.unsplash.com/photo-1542841791-1925b02a2bbb?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 8, name: "Light Messenger", price: 399, category: "Bags", image: "/light_messenger.png", type: "bag" },
    { id: 9, name: "Racer Jacket", price: 950, category: "Jackets", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600", type: "jacket" },
    { id: 10, name: "Travel Tote", price: 620, category: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", type: "bag" },
    { id: 11, name: "Work Boots", price: 520, category: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 12, name: "Braided Belt", price: 160, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", type: "belt" },
    { id: 13, name: "Card Holder", price: 89, category: "Accessories", image: "https://images.unsplash.com/photo-1554981983-4ee4aeb2e62b?auto=format&fit=crop&q=80&w=600", type: "wallet" },
    { id: 14, name: "Bomber Jacket", price: 850, category: "Jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600", type: "jacket" },
    { id: 15, name: "White Backpack", price: 580, category: "Bags", image: "/white_backpack.png", type: "bag" },
];

export default function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark as per request
    const addItem = useCartStore(state => state.addItem);
    const toggleCart = useCartStore(state => state.toggleCart);
    const isOpen = useCartStore(state => state.isOpen);

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();

        const cartItem = {
            id: `${Date.now()}-${product.id}`,
            product: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            config: {
                colorName: "Standard",
                leatherType: "Classic"
            }
        };
        addItem(cartItem);
        if (!isOpen) toggleCart();
    };

    // Filter logic
    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <header className={`border-b border-white/10 py-12 relative overflow-hidden`}>
                {/* Background Blobs for Dark Mode */}
                {isDarkMode && (
                    <>
                        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                    </>
                )}

                <div className="container mx-auto px-4 text-center relative z-10 w-full flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Designed for Life</h1>
                    <p className={`text-xl max-w-2xl mx-auto font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Explore our collection of premium, hand-crafted leather goods. Customize any piece to make it uniquely yours.
                    </p>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`mt-8 px-6 py-2 rounded-full border transition-all flex items-center gap-2 ${isDarkMode
                            ? 'bg-white text-black border-white hover:bg-gray-100'
                            : 'bg-black text-white border-black hover:bg-gray-800'
                            }`}
                    >
                        {isDarkMode ? '☀ Light Mode' : '☾ Dark Mode'}
                    </button>
                </div>
            </header>

            {/* Filters & Search - Simplistic implementation */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {["All", "Jackets", "Bags", "Shoes", "Accessories"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${selectedCategory === cat
                                ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                                : (isDarkMode ? 'border-white/20 hover:border-white/50 text-gray-300' : 'border-black/20 hover:border-black/50 text-gray-600')
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none border ${isDarkMode
                            ? 'bg-white/5 border-white/10 text-white focus:border-white'
                            : 'bg-black/5 border-black/10 text-black focus:border-black'
                            }`}
                    />
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 pb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${isDarkMode
                            ? 'bg-white/5 border-white/5 hover:border-white/20 hover:shadow-blue-500/5'
                            : 'bg-white border-black/5 hover:border-black/10 hover:shadow-black/5'
                            }`}>
                            <div className="relative h-80 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                {product.tag && (
                                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.tag}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                    <button
                                        onClick={(e) => handleAddToCart(product, e)}
                                        className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                                        title="Add to Cart"
                                    >
                                        <ShoppingBag size={20} />
                                    </button>
                                    <Link to={`/customizer?product=${product.type || 'jacket'}`} className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform" title="Customize">
                                        <Filter size={20} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{product.category}</div>
                                        <h3 className={`text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>{product.name}</h3>
                                    </div>
                                    <span className={`text-lg font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>${product.price}</span>
                                </div>
                                <button
                                    onClick={(e) => handleAddToCart(product, e)}
                                    className="w-full mt-4 bg-primary border border-transparent hover:bg-primary-hover text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                                >
                                    <ShoppingBag size={16} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
