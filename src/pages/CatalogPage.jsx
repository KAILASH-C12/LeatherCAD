import { useState } from 'react';
import { Search, Filter, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/CartStore';

const products = [
    { id: 1, name: "The Classic Biker", price: 899, category: "Jackets", image: "https://images.unsplash.com/photo-1551028919-ac7fa7ea47ea?auto=format&fit=crop&q=80&w=600", tag: "Best Seller", type: "jacket" },
    { id: 2, name: "Weekend Duffel", price: 549, category: "Bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600", tag: "New", type: "bag" },
    { id: 3, name: "Chelsea Boots", price: 449, category: "Shoes", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 4, name: "Heritage Belt", price: 149, category: "Accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=600", type: "belt" },
    { id: 5, name: "Slim Wallet", price: 129, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600", type: "wallet" },
    { id: 6, name: "Field Jacket", price: 799, category: "Jackets", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600", type: "jacket" },
    { id: 7, name: "Oxford Boots", price: 499, category: "Shoes", image: "https://images.unsplash.com/photo-1542841791-1925b02a2bbb?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 8, name: "Messenger Bag", price: 399, category: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600", type: "bag" },
    { id: 9, name: "Racer Jacket", price: 950, category: "Jackets", image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=600", type: "jacket" },
    { id: 10, name: "Travel Tote", price: 620, category: "Bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600", type: "bag" },
    { id: 11, name: "Work Boots", price: 520, category: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600", type: "boots" },
    { id: 12, name: "Braided Belt", price: 160, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", type: "belt" },
    { id: 13, name: "Card Holder", price: 89, category: "Accessories", image: "https://images.unsplash.com/photo-1554981983-4ee4aeb2e62b?auto=format&fit=crop&q=80&w=600", type: "wallet" },
    { id: 14, name: "Bomber Jacket", price: 850, category: "Jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600", type: "jacket" },
    { id: 15, name: "Leather Backpack", price: 580, category: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", type: "bag" },
];

export default function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
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
        <div className="min-h-screen bg-transparent text-black font-sans">
            {/* Header */}
            <header className="bg-background-card border-b border-white/10 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Designed for Life</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Explore our collection of premium, hand-crafted leather goods. Customize any piece to make it uniquely yours.
                    </p>
                </div>
            </header>

            {/* Filters & Search - Simplistic implementation */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {["All", "Jackets", "Bags", "Shoes", "Accessories"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/50'} transition-all text-sm font-medium`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background-card border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-background-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
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
                                        <h3 className="text-xl font-bold font-display">{product.name}</h3>
                                    </div>
                                    <span className="text-lg font-light">${product.price}</span>
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
