import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cart';

// Helper to get token
const getToken = () => localStorage.getItem('token');

export const useCartStore = create((set, get) => ({
    items: [],
    isOpen: false,

    toggleCart: () => set({ isOpen: !get().isOpen }),

    // Fetch cart from server (call this on login)
    fetchCart: async () => {
        const token = getToken();
        if (!token) return;

        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Map server items to frontend format if needed
            const serverItems = res.data.map(item => ({
                id: item.productId || item._id, // Handle different ID formats
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                config: item.config,
                _id: item._id // Store real mongo ID for removal
            }));
            set({ items: serverItems });
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    },

    addItem: async (product) => {
        // Optimistic UI Update
        const token = getToken();
        set((state) => {
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                return {
                    items: state.items.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
        });

        if (token) {
            try {
                await axios.post(`${API_URL}/add`, { item: product }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // In a perfect world, we'd refetch or update with the server response to get the 'real' IDs
                // For now, we trust the optimistic update or fetchCart will fix eventually
                get().fetchCart(); // Re-sync to get proper IDs
            } catch (error) {
                console.error("Failed to add to server cart", error);
                // Revert on failure? For now, keep local
            }
        }
    },

    removeItem: async (id) => {
        const token = getToken();
        set((state) => ({
            items: state.items.filter(item => item.id !== id && item._id !== id)
        }));

        if (token) {
            try {
                await axios.post(`${API_URL}/remove`, { itemId: id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Failed to remove from server cart", error);
            }
        }
    },

    updateQuantity: (id, amount) => set((state) => ({
        items: state.items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        )
    })),

    clearCart: async () => {
        const token = getToken();
        set({ items: [] });
        if (token) {
            try {
                await axios.post(`${API_URL}/clear`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Failed to clear server cart", error);
            }
        }
    },

    getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}));
