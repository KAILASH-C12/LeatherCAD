import { useState } from 'react';
import { PenTool, Plus, LogOut, LayoutDashboard, Image as ImageIcon, Box, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import OrdersPage from './OrdersPage';

export default function DesignerDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('designs');

    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (activeTab === 'designs') {
            fetchDesigns();
        }
    }, [activeTab, navigate]);

    const fetchDesigns = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/designs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Ensure we're setting an array
            setDesigns(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching designs:', error);
            if (error.response && error.response.status === 401) {
                // Token invalid or expired
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
            setLoading(false);
            setDesigns([]); // Fallback to empty array
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this design?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/designs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchDesigns(); // Refresh list
            } catch (error) {
                console.error('Error deleting design:', error);
            }
        }
    };

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'designs', label: 'My Designs', icon: PenTool },
        { id: 'orders', label: 'My Orders', icon: ShoppingBag }, // Added Orders
        { id: 'assets', label: 'Assets', icon: ImageIcon },
        { id: 'prototypes', label: '3D Prototypes', icon: Box },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                            LeatherCAD
                        </h2>
                    </Link>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">Designer Studio</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                            {activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="capitalize text-foreground font-medium">{activeTab}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-primary/20">
                        DS
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'designs' ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-foreground">My Designs</h1>
                                    <p className="text-muted-foreground text-sm">Manage and edit your leather creations</p>
                                </div>
                                <button
                                    onClick={() => navigate('/customizer')}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-primary/20"
                                >
                                    <Plus size={18} /> New Design
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading ? <p>Loading...</p> : designs.length === 0 ? <p className="text-gray-500">No designs found</p> : designs.map(design => (
                                    <div key={design._id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                                        <div className="aspect-video bg-secondary relative flex items-center justify-center text-muted-foreground">
                                            {design.previewImageUrl ? (
                                                <img src={design.previewImageUrl} alt={design.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={32} className="opacity-20" />
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/customizer?designId=${design._id}`)}
                                                    className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(design._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-foreground">{design.name}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${design.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                                    design.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                                                        design.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-blue-500/10 text-blue-500'
                                                    }`}>
                                                    {design.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Product: {design.product?.name || 'Custom'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'orders' ? (
                        <div className="h-full">
                            <OrdersPage />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-secondary/10">
                            <PenTool size={48} className="mb-4 opacity-20" />
                            <h3 className="text-xl font-medium text-foreground mb-2">Coming Soon</h3>
                            <p className="max-w-md text-center">
                                The <span className="font-semibold text-primary">{activeTab}</span> module is currently under development.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
