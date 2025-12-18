import { create } from 'zustand';

export const useConfiguratorStore = create((set) => ({
    // Configuration State
    config: {
        color: '#1a1a1a', // Default Black
        zipper: 'silver',
        material: 'leather_smooth',
        pockets: true,
        epaulettes: false,
        monogram: '',
        monogramColor: 'gold'
    },

    // Current Product Info
    productInfo: {
        basePrice: 899,
        currentPrice: 899,
        modelUrl: null // Set to '/assets/jacket.gb' when ready
    },

    // View State
    currentView: 'front',
    setFixedView: (view) => set({ currentView: view }),

    // Actions
    updateConfig: (key, value) => set((state) => {
        const newConfig = { ...state.config, [key]: value };

        // --- RULES ENGINE ---
        // Rule 1: Gold zipper cannot be used with Deep Burgundy leather (Example constraint)
        if (key === 'zipper' && value === 'gold' && newConfig.color === '#4A0404') {
            // Revert or warn? For now, we'll force change the color to black if user picked gold
            newConfig.color = '#1a1a1a';
            // In a real app, we'd return an error/notification state
        }
        if (key === 'color' && value === '#4A0404' && newConfig.zipper === 'gold') {
            newConfig.zipper = 'silver';
        }

        // Rule 2: Epaulettes require Pockets to be enabled (Structural dependency example)
        if (key === 'epaulettes' && value === true) {
            newConfig.pockets = true;
        }

        // --- PRICING ENGINE ---
        let price = state.productInfo.basePrice;

        // Material Pricing
        if (newConfig.material === 'leather_exotic') price += 200;

        // Component Pricing
        if (newConfig.monogram) price += 50;
        if (newConfig.epaulettes) price += 30;
        if (newConfig.zipper === 'gold') price += 15; // Premium finish

        return {
            config: newConfig,
            productInfo: { ...state.productInfo, currentPrice: price }
        };
    }),

    setProduct: (product) => set({ productInfo: product }),
    resetConfig: () => set({
        config: {
            color: '#1a1a1a',
            zipper: 'silver',
            material: 'leather_smooth',
            pockets: true,
            epaulettes: false,
            monogram: '',
            monogramColor: 'gold'
        }
    })
}));
