import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Plus, Search, ChevronRight, Edit, Download } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import OrdersPage from './OrdersPage';
import SettingsPage from './SettingsPage';

export default function UserDashboard() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('designs');
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            // Mock auth token usage - in real app use interceptor or auth context
            const token = localStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            const response = await axios.get('http://localhost:3000/api/designs', config);
            setDesigns(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching designs:', error);
            setLoading(false);
        }
    };

    const navItems = [
        { id: 'designs', label: 'My Designs', icon: LayoutDashboard },
        { id: 'orders', label: 'Order History', icon: ShoppingBag },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                        LeatherCAD
                    </h2>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">Designer Hub</p>
                </div>

                <div className="px-6 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold overflow-hidden">
                            {user?.imageUrl ? (
                                <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span>{user?.firstName?.charAt(0) || 'U'}</span>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <div className="font-medium text-sm truncate text-foreground">{user?.fullName || 'User'}</div>
                            <div className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
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
                        <span className="capitalize text-foreground font-medium">{activeTab.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                placeholder="Search designs..."
                                className="pl-9 pr-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
                            />
                        </div>
                        <Link to="/customizer">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-primary/20 text-sm">
                                <Plus size={16} /> New Design
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'designs' ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-foreground">My Designs</h1>
                                <p className="text-muted-foreground text-sm">Manage your saved leather creations</p>
                            </div>

                            {loading ? (
                                <div className="text-center py-20 text-muted-foreground">Loading designs...</div>
                            ) : designs.length === 0 ? (
                                <div className="text-center py-20 border-2 border-dashed border-border rounded-xl bg-secondary/5">
                                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                                        <LayoutDashboard size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">No designs yet</h3>
                                    <p className="text-muted-foreground mb-6">Create your first custom leather product today.</p>
                                    <Link to="/customizer">
                                        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                            Start Designing
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {designs.map((design) => (
                                        <div key={design._id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                            {/* Preview Image */}
                                            <div className="h-48 bg-secondary/30 relative overflow-hidden">
                                                {design.previewImageUrl ? (
                                                    <img src={design.previewImageUrl} alt={design.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Preview Available</div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                                    <Link to={`/customizer?designId=${design._id}`} className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button onClick={() => alert('Download')} className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Design Info */}
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{design.name}</h3>
                                                        <p className="text-sm text-muted-foreground capitalize">{design.product?.name || 'Custom Product'}</p>
                                                    </div>
                                                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium">Draft</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                                                    <span>Edited {new Date(design.updatedAt).toLocaleDateString()}</span>
                                                    <span>ID: {design._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : activeTab === 'orders' ? (
                        <div className="h-full">
                            <OrdersPage />
                        </div>
                    ) : activeTab === 'settings' ? (
                        <div className="h-full">
                            <SettingsPage />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-secondary/10">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <h3 className="text-xl font-medium text-foreground mb-2">Coming Soon</h3>
                            <p className="max-w-md text-center">
                                The <span className="font-semibold text-primary">{activeTab.replace('-', ' ')}</span> module is currently under development.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
