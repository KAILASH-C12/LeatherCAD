import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import { Users, Globe, Award, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative py-24 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-bold mb-6"
                >
                    Crafting the Future of <br className="hidden md:block" /> <span className="text-primary">Digital Fashion</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    We are bridging the gap between traditional leather craftsmanship and advanced 3D technology.
                </motion.p>
            </section>

            {/* Story */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Founded in 2024, LeatherCAD began with a simple question: Why is customizing luxury leather goods so difficult online?
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            We set out to build a platform that gives artisans the power of industrial CAD tools with the simplicity of a consumer app. Today, we empower thousands of creators to bring their visions to life instantly.
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                        {/* Placeholder for About Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono">
                            [Office / Workshop Image]
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white/5 py-20 border-y border-white/10">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { icon: Users, label: "Active Designers", val: "10k+" },
                        { icon: Globe, label: "Countries Served", val: "45+" },
                        { icon: Award, label: "Design Awards", val: "12" },
                        { icon: Heart, label: "Community Rating", val: "4.9/5" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            <stat.icon className="w-8 h-8 text-primary" />
                            <div>
                                <div className="text-3xl font-bold">{stat.val}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
