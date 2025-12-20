
import { useState, useEffect, useRef } from 'react';
import Product3DViewer from '../components/customizer/Product3DViewer';
import { ArrowLeft, Share2, Download, Save, ShoppingCart, Layers, Palette, Sparkles, Loader2, Shield } from 'lucide-react';
import axios from 'axios';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/CartStore';
import { useAuth } from '@clerk/clerk-react';

export default function Customizer() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const addItem = useCartStore(state => state.addItem);
    const productFromUrl = searchParams.get('product') || 'bag';

    const captureRef = useRef(null);

    const [selectedProduct, setSelectedProduct] = useState(productFromUrl);
    const [activePart, setActivePart] = useState('body');

    // Update state when URL changes
    useEffect(() => {
        if (searchParams.get('product')) {
            setSelectedProduct(searchParams.get('product'));
            setActivePart('body'); // Reset part selection
        }
    }, [searchParams]);

    const [config, setConfig] = useState({
        body: '#8B4513',
        handle: '#654321',
        sleeves: '#8B4513',
        hardware: '#FFD700',
        sole: '#1a1a1a',
        interior: '#D2B48C',
        strap: '#8B4513',
        buckle: '#FFD700'
    });

    // AI State
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiPreviewConfig, setAiPreviewConfig] = useState(null); // Store preview before applying

    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        setAiPreviewConfig(null);
        try {
            const token = await getToken();
            const response = await axios.post('http://localhost:3000/api/ai/generate-design', {
                prompt: aiPrompt,
                productType: selectedProduct
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Set preview instead of applying directly
            if (response.data.config) {
                setAiPreviewConfig(response.data.config);
                if (response.data.config.isFallback) {
                    alert("AI Service is currently busy. Showing a default template instead.");
                }
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("AI Generation failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const [productId, setProductId] = useState(null);

    useEffect(() => {
        // Fetch real product ID from backend based on selected string
        const fetchProductId = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                // Find product that matches category or name
                const product = response.data.find(p => p.category === selectedProduct || p.name.toLowerCase().includes(selectedProduct));
                if (product) {
                    setProductId(product._id);
                } else {
                    console.warn("No matching product found in DB for:", selectedProduct);
                    // Fallback to "bag" ID or similar if needed, or handle error
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProductId();
    }, [selectedProduct]);

    const handleSave = async () => {
        try {
            if (!productId) {
                alert("Error: Product definition not found in database. Cannot save.");
                return;
            }

            // Basic name prompt for now
            const name = prompt("Enter a name for your design:", `My Custom ${selectedProduct}`);
            if (!name) return;

            const token = await getToken();
            if (!token) {
                alert("Please login to save designs.");
                navigate('/login');
                return;
            }

            await axios.post('http://localhost:3000/api/designs', {
                product: productId,
                name,
                configuration: config,
                isPublic: false
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Design saved successfully!");
        } catch (error) {
            console.error("Save Error:", error);
            alert("Failed to save design.");
        }
    };

    const handleShare = () => {
        // Mock share functionality
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    // UI State
    const [zoom, setZoom] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock loading
        setIsLoading(true); // Trigger load on product change
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [selectedProduct]);

    // Dynamic Parts Configuration
    const PRODUCT_PARTS = {
        bag: ['body', 'handle', 'hardware'],
        jacket: ['body', 'sleeves', 'hardware'],
        boots: ['body', 'sole', 'hardware'],
        wallet: ['body', 'interior', 'hardware'],
        belt: ['strap', 'buckle', 'hardware']
    };

    const currentParts = PRODUCT_PARTS[selectedProduct] || PRODUCT_PARTS['bag'];

    const colors = [
        { name: 'Saddle Brown', value: '#8B4513' },
        { name: 'Classic Black', value: '#1a1a1a' },
        { name: 'Deep Burgundy', value: '#4A0404' },
        { name: 'Navy Blue', value: '#000080' },
        { name: 'Forest Green', value: '#228B22' },
        { name: 'Tan', value: '#D2B48C' },
        { name: 'Cognac', value: '#9A463D' },
        { name: 'Cream', value: '#FFFDD0' },
    ];

    const hardwareColors = [
        { name: 'Gold', value: '#FFD700' },
        { name: 'Silver', value: '#C0C0C0' },
        { name: 'Rose Gold', value: '#B76E79' },
        { name: 'Gunmetal', value: '#2C3539' },
    ];

    const handleColorChange = (color) => {
        setConfig(prev => ({ ...prev, [activePart]: color }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-2 capitalize">Loading {selectedProduct}...</h2>
                    <p className="text-gray-600">Preparing your 3D experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white">
            {/* Left Sidebar - Controls */}
            <div className="w-full md:w-96 bg-gray-50 border-r border-gray-200 flex flex-col z-10 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white">
                    <Link to="/catalog" className="text-gray-500 hover:text-black transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <Link to="/" className="flex items-center gap-2">
                        <Shield className="text-[#D4AF37]" size={28} />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#AA8822]">
                            LeatherCAD
                        </span>
                    </Link>
                    <div className="w-6"></div>
                </div>

                {/* AI Design Generator */}
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                    {/* ... existing AI code ... */}
                    <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles size={14} /> Smart Designer
                    </h3>
                    {/* ... (rest of AI section is fine, skipping context to focus on insertions) ... */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g. 'Cyberpunk neon black jacket'"
                            className="flex-1 bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleAIGenerate}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                        </button>
                    </div>
                    {/* ... AI Preview Box code ... */}
                    {aiPreviewConfig && (
                        <div className="mt-3 bg-white border border-purple-100 rounded-lg p-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                            {/* ... */}
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">AI Suggestion Preview</h4>
                            <div className="flex gap-2 mb-3">
                                {Object.entries(aiPreviewConfig).slice(0, 3).map(([key, color]) => (
                                    <div key={key} className="flex flex-col items-center">
                                        <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
                                        <span className="text-[10px] text-gray-500 capitalize mt-1">{key}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    // onClick={applyAiPreview} // Assuming this function exists or will be added, keeping placeholder logic safe
                                    onClick={() => {
                                        setConfig(prev => ({ ...prev, ...aiPreviewConfig }));
                                        setAiPreviewConfig(null);
                                    }}
                                    className="flex-1 bg-purple-600 text-white text-xs py-1.5 rounded hover:bg-purple-700 font-medium"
                                >
                                    Apply Design
                                </button>
                                <button
                                    onClick={() => setAiPreviewConfig(null)}
                                    className="flex-1 bg-gray-100 text-gray-600 text-xs py-1.5 rounded hover:bg-gray-200"
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Configuration Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Product Switcher */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={16} /> Product Type
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {['bag', 'jacket', 'boots', 'wallet', 'belt'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedProduct(type);
                                        // Reset active part to first part of new product
                                        const newParts = PRODUCT_PARTS[type] || PRODUCT_PARTS['bag'];
                                        setActivePart(newParts[0]);
                                    }}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all border ${selectedProduct === type
                                        ? 'bg-black text-white border-black shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Part Selector */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={16} /> Select Part
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                            {currentParts.map(part => (
                                <button
                                    key={part}
                                    onClick={() => setActivePart(part)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all border ${activePart === part
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Picker - Compact Grid */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Palette size={16} /> Choose Material
                        </h3>
                        <div className="grid grid-cols-6 gap-3">
                            {(activePart === 'hardware' ? hardwareColors : colors).map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleColorChange(color.value)}
                                    className={`group relative w-full aspect-square rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${config[activePart] === color.value ? 'ring-2 ring-black ring-offset-2 scale-110' : ''
                                        }`}
                                    title={color.name}
                                >
                                    <span
                                        className="absolute inset-0 rounded-full border border-black/10 shadow-inner"
                                        style={{ backgroundColor: color.value }}
                                    />
                                    {config[activePart] === color.value && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="mt-3 text-sm text-gray-500 font-medium">
                            Selected: <span className="font-bold text-black">{
                                (activePart === 'hardware' ? hardwareColors : colors)
                                    .find(c => c.value === config[activePart])?.name || 'Custom'
                            }</span>
                        </p>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 border-t border-gray-200 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <span className="text-sm text-gray-500 font-medium">Base Price</span>
                            <div className="text-2xl font-bold text-black">$149.00</div>
                        </div>
                        <button
                            onClick={() => {
                                addItem({
                                    id: Date.now().toString(), // Unique ID for custom item
                                    name: `Custom ${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)}`,
                                    price: 149.00,
                                    image: captureRef.current ? captureRef.current() : `/assets/${selectedProduct}.jpg`,
                                    config: config,
                                    productType: selectedProduct
                                });
                                navigate('/checkout');
                            }}
                            className="bg-black text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black font-medium transition-colors"
                        >
                            <Save size={18} /> Save Design
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black font-medium transition-colors"
                        >
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - 3D Viewer */}
            <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-white">
                {/* Product Title Overlay */}
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                    <h1 className="text-3xl font-bold text-black tracking-tight drop-shadow-sm capitalize">{selectedProduct}</h1>
                    <p className="text-gray-500 font-medium">Premium Configurator</p>
                </div>

                {/* Viewer Controls Overlay */}
                <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
                    <button
                        onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
                        className="p-3 bg-white/90 backdrop-blur shadow-sm border border-gray-200 rounded-full text-black hover:bg-gray-100 transition-colors"
                        title="Zoom In"
                    >
                        <span className="font-bold text-lg">+</span>
                    </button>
                    <button
                        onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
                        className="p-3 bg-white/90 backdrop-blur shadow-sm border border-gray-200 rounded-full text-black hover:bg-gray-100 transition-colors"
                        title="Zoom Out"
                    >
                        <span className="font-bold text-lg">-</span>
                    </button>
                </div>

                <Product3DViewer
                    productType={selectedProduct}
                    config={config}
                    zoom={zoom}
                    onPartClick={setActivePart}
                    captureRef={captureRef}
                />
            </div>
        </div>
    );
}
