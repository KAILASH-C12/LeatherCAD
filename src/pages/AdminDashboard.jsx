import { useState, useEffect } from 'react';
import { Package, Layers, Users, Plus, Edit, Trash2, Search, Settings, LogOut, LayoutDashboard, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Orders Data
    const mockOrders = [
        { id: 'ORD-001', customer: 'John Doe', date: '2023-11-20', total: 149.00, status: 'Completed', items: 1 },
        { id: 'ORD-002', customer: 'Alice Smith', date: '2023-11-21', total: 299.50, status: 'Processing', items: 2 },
        { id: 'ORD-003', customer: 'Bob Wilson', date: '2023-11-21', total: 89.00, status: 'Pending', items: 1 },
        { id: 'ORD-004', customer: 'Emma Brown', date: '2023-11-22', total: 450.00, status: 'Completed', items: 3 },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // In a real app, use base URL from env
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        if (activeTab === 'dashboard') {
            // Re-fetch logic if needed
        } else if (activeTab === 'review') {
            fetchDesigns();
        }
    }, [activeTab]);

    const fetchDesigns = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/designs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Filter only pending designs for review
            const data = Array.isArray(response.data) ? response.data : [];
            setDesigns(data.filter(d => d.status === 'pending'));
        } catch (error) {
            console.error('Error fetching designs:', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/designs/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchDesigns(); // Refresh list
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'review', label: 'Review Queue', icon: CheckCircle }, // New Tab
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'materials', label: 'Materials', icon: Layers },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar code remains same but navItems updated */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                        LeatherCAD
                    </h2>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">Admin Panel</p>
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
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'review' ? (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-foreground">Design Review Queue</h1>
                            {designs.length === 0 ? <p className="text-gray-500">No pending designs.</p> : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {designs.map(design => (
                                        <div key={design._id} className="bg-card border border-border rounded-xl overflow-hidden p-4">
                                            <h3 className="font-bold">{design.name}</h3>
                                            <p className="text-xs text-gray-500 mb-2">By: {design.user?.name}</p>
                                            <p className="text-xs text-gray-500 mb-4">Product: {design.product?.name}</p>

                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => handleUpdateStatus(design._id, 'approved')}
                                                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(design._id, 'rejected')}
                                                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'products' ? (
                        <div className="content-products">
                            <h1 className="text-2xl font-bold">Products (Placeholder)</h1>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">Standard Dashboard View</div>
                    )}
                </div>
            </main>
        </div>
    );
}
