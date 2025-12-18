
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useCartStore } from '../../store/CartStore';

export function CartSidebar() {
    const isOpen = useCartStore(state => state.isOpen);
    const items = useCartStore(state => state.items);
    const toggleCart = useCartStore(state => state.toggleCart);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart} />
            <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-bold">Your Cart ({items.length})</h2>
                    <Button variant="ghost" size="icon" onClick={toggleCart}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                                    <img src={item.image} alt={item.product} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{item.product}</h3>
                                            <p className="text-sm text-muted-foreground">{item.config.colorName}, {item.config.leatherType}</p>
                                        </div>
                                        <p className="font-medium">${item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2 border border-border rounded-md">
                                            <button
                                                className="p-1 hover:bg-secondary rounded-l-md"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-secondary rounded-r-md"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-400 p-1"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-border bg-card">
                    <div className="flex justify-between mb-4 text-lg font-bold">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground">
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
