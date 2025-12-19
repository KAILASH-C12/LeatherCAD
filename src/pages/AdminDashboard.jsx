import { useState, useEffect } from 'react';
import { Package, Layers, Users, Plus, Edit, Trash2, Search, Settings, LogOut, LayoutDashboard, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle, FolderKanban } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Orders State
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const response = await axios.get('http://localhost:3000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

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



    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });

    useEffect(() => {
        if (activeTab === 'projects') {
            fetchProjects();
        }
    }, [activeTab]);

    const fetchProjects = async () => {
        try {
            const token = await getToken();
            const response = await axios.get('http://localhost:3000/api/projects', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            await axios.post('http://localhost:3000/api/projects', newProject, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewProject({ name: '', description: '' });
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
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
            const token = await getToken();
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
            const token = await getToken();
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
        { id: 'projects', label: 'Projects', icon: FolderKanban },
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
                    <Link to="/">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                            LeatherCAD
                        </h2>
                    </Link>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">Admin Panel</p>
                </div>

                <div className="px-6 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold overflow-hidden">
                            {user?.imageUrl ? (
                                <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span>{user?.firstName?.charAt(0) || 'A'}</span>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <div className="font-medium text-sm truncate text-foreground">{user?.fullName || 'Admin'}</div>
                            <div className="text-xs text-muted-foreground truncate">Administrator</div>
                        </div>
                    </div>
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
                    ) : activeTab === 'projects' ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-foreground">Projects</h1>
                            </div>

                            {/* Create Project Form */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
                                <form onSubmit={handleCreateProject} className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">Project Name</label>
                                        <input
                                            type="text"
                                            value={newProject.name}
                                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                            className="w-full bg-background border border-input rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div className="flex-[2]">
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            className="w-full bg-background border border-input rounded p-2"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-primary/90 flex items-center gap-2"
                                    >
                                        <Plus size={18} />
                                        Add
                                    </button>
                                </form>
                            </div>

                            {/* Projects List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map(project => (
                                    <div key={project._id} className="bg-card border border-border rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">{project.name}</h3>
                                            <span className={`px-2 py-1 rounded text-xs lowercase ${project.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                                        <div className="text-xs text-muted-foreground">
                                            Created: {new Date(project.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <p className="text-muted-foreground col-span-3 text-center py-8">No projects found.</p>
                                )}
                            </div>
                        </div>
                    ) : activeTab === 'orders' ? (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-foreground">All Orders</h1>
                            <div className="bg-card border border-border rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted text-muted-foreground border-b border-border">
                                        <tr>
                                            <th className="p-4 font-medium">Order ID</th>
                                            <th className="p-4 font-medium">Customer</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Total</th>
                                            <th className="p-4 font-medium">Paid</th>
                                            <th className="p-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium">{order._id.substring(0, 8)}...</td>
                                                <td className="p-4">{order.user?.name || order.shippingAddress?.firstName || 'Guest'}</td>
                                                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                                                <td className="p-4">
                                                    {order.isPaid ? <span className="text-green-500 font-bold">Yes</span> : <span className="text-red-500">No</span>}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="p-8 text-center text-muted-foreground">No orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">Standard Dashboard View</div>
                    )}
                </div>
            </main>
        </div>
    );
}
