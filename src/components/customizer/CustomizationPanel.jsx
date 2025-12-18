import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';


// Basic Accordion if UI components missing
const AccordionItem = ({ title, isOpen, onClick, children }) => (
    <div className="border-b border-border/50">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-white/5 transition-colors"
        >
            <span className="font-medium text-sm uppercase tracking-wider">{title}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && (
            <div className="px-1 pb-6 animate-in slide-in-from-top-2 duration-200">
                {children}
            </div>
        )}
    </div>
);

const SwatchGrid = ({ items, selected, onSelect, type = 'color' }) => (
    <div className="grid grid-cols-4 gap-3">
        {items.map((item) => (
            <button
                key={item.name}
                onClick={() => onSelect(item.value)}
                className={`group relative w-12 h-12 rounded-full border-2 transition-all hover:scale-105 ${selected === item.value ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'
                    }`}
                title={item.name}
            >
                {type === 'color' ? (
                    <span
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: item.hex }}
                    />
                ) : (
                    <div className="absolute inset-1 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] overflow-hidden">
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : item.name.substring(0, 2)}
                    </div>
                )}
            </button>
        ))}
    </div>
);

export function CustomizationPanel({ config, updateConfig, price, onAddToCart, productType }) {
    // Determine options based on product type if needed, or generic

    return (
        <div className="w-full md:w-[400px] bg-card text-card-foreground flex flex-col border-l border-border z-20 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-border">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Custom Made</div>
                <h1 className="text-2xl font-bold capitalize">{productType}</h1>
                <div className="mt-2 text-3xl font-light">${price}</div>
            </div>

            {/* Options */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                <AccordionItem title="Leather & Color" isOpen={true} onClick={() => { }}>
                    <div className="space-y-4">
                        <label className="text-xs text-muted-foreground block">Leather Type</label>
                        <div className="flex gap-2">
                            {['full-grain', 'top-grain', 'exotic'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => updateConfig('leatherType', t)}
                                    className={`px-3 py-1 rounded border text-xs capitalize ${config.leatherType === t ? 'border-primary text-primary' : 'border-border'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <label className="text-xs text-muted-foreground block mt-4">Color</label>
                        <SwatchGrid
                            items={[
                                { name: 'Saddle Brown', value: '#8B4513', hex: '#8B4513' },
                                { name: 'Onyx Black', value: '#000000', hex: '#000000' },
                                { name: 'Deep Navy', value: '#000080', hex: '#000080' },
                                { name: 'Burgundy', value: '#800020', hex: '#800020' },
                                { name: 'Forest Green', value: '#228B22', hex: '#228B22' }
                            ]}
                            selected={config.color}
                            onSelect={(val) => {
                                updateConfig('color', val);
                                // Hacky update for colorName
                                const n = ['Saddle Brown', 'Onyx Black', 'Deep Navy', 'Burgundy', 'Forest Green'].find((_, i) =>
                                    ['#8B4513', '#000000', '#000080', '#800020', '#228B22'][i] === val
                                );
                                if (n) updateConfig('colorName', n);
                            }}
                        />
                    </div>
                </AccordionItem>

                <AccordionItem title="Hardware" isOpen={true} onClick={() => { }}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            {['brass', 'silver', 'gold', 'gunmetal'].map(h => (
                                <button
                                    key={h}
                                    onClick={() => updateConfig('hardware', h)}
                                    className={`p-3 rounded border capitalize flex items-center gap-2 ${config.hardware === h ? 'border-primary bg-primary/5' : 'border-border'}`}
                                >
                                    <div className="w-4 h-4 rounded-full border border-border" style={{
                                        background: h === 'brass' ? '#b5a642' : h === 'silver' ? '#c0c0c0' : h === 'gold' ? '#ffd700' : '#444'
                                    }} />
                                    {h}
                                </button>
                            ))}
                        </div>
                    </div>
                </AccordionItem>

                <AccordionItem title="Personalization" isOpen={true} onClick={() => { }}>
                    <div className="space-y-4">
                        <label className="text-xs text-muted-foreground block">Monogram</label>
                        <input
                            type="text"
                            value={config.monogram}
                            onChange={(e) => updateConfig('monogram', e.target.value)}
                            placeholder="Enter initials"
                            className="w-full bg-background border border-border rounded p-2 text-foreground focus:border-primary outline-none"
                            maxLength={3}
                        />
                    </div>
                </AccordionItem>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-card">
                <Button onClick={onAddToCart} className="w-full size-lg bg-primary text-primary-foreground hover:bg-primary/90">
                    Add to Cart - ${price}
                </Button>
            </div>
        </div>
    );
}
