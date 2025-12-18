import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
    {
        name: 'Starter',
        price: 'Free',
        description: 'Perfect for hobbyists and learning.',
        features: ['Basic 3D Customization', 'Export to PDF', '5 Saved Designs', 'Community Support'],
        cta: 'Start for Free',
        highlighted: false
    },
    {
        name: 'Pro Artisan',
        price: '$29',
        period: '/month',
        description: 'For serious craftsmen and small studios.',
        features: ['Advanced 3D Rendering', 'Export DXF/SVG Patterns', 'Unlimited Saved Designs', 'Priority Support', 'Commercial License'],
        cta: 'Get Pro',
        highlighted: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large brands and manufacturers.',
        features: ['API Access', 'White-label Solution', 'Custom Feature Development', 'Dedicated Account Manager', 'SSO Integration'],
        cta: 'Contact Sales',
        highlighted: false
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-400">Choose the perfect plan for your creative journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative bg-background-card rounded-2xl p-8 border ${tier.highlighted ? 'border-primary ring-1 ring-primary/50' : 'border-white/10'} flex flex-col`}
                        >
                            {tier.highlighted && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    {tier.period && <span className="text-gray-400">{tier.period}</span>}
                                </div>
                                <p className="text-gray-400 mt-4 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.highlighted
                                ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25'
                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                }`}>
                                {tier.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
