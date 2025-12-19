import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Calendar, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import { toast } from 'sonner';

export default function OrdersPage() {
    const { token, isAuthenticated } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await axios.get('http://localhost:3000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
                toast.error("Could not load your orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token, isAuthenticated]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't purchased anything yet.</p>
                <Link to="/customizer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Start Designing <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border pb-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                                    <p className="font-mono text-sm font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Date Placed</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-muted-foreground" />
                                        <span className="font-medium">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                    <p className="font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
                                        ${order.isPaid ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                        {order.isPaid ? 'Paid' : 'Pending Payment'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">Qty: {item.qty} | ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
