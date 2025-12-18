import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    items: [],
    isOpen: false,

    toggleCart: () => set({ isOpen: !get().isOpen }),

    addItem: (product) => set((state) => {
        // Check if item already exists (basic check by ID, for customized items we'd need a unique hash)
        const existing = state.items.find(item => item.id === product.id);
        if (existing) {
            return {
                items: state.items.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),

    updateQuantity: (id, amount) => set((state) => ({
        items: state.items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        )
    })),

    clearCart: () => set({ items: [] }),

    getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}));
