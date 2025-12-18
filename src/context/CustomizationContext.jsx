import { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext();

export function CustomizationProvider({ children }) {
    const [config, setConfig] = useState({
        color: '#1a1a1a',
        material: 'leather_smooth',
        zipper: 'silver',
        pockets: true,
        epaulettes: false,
        monogram: '',
        monogramColor: 'gold',
        view: 'front' // front, back, side
    });

    const updateConfig = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <CustomizationContext.Provider value={{ config, updateConfig }}>
            {children}
        </CustomizationContext.Provider>
    );
}

export function useCustomization() {
    return useContext(CustomizationContext);
}
