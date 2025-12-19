import { Shield, Zap, Server, BarChart } from 'lucide-react';

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">

            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-8">
                    Scale Your Manufacturing <br />
                    <span className="text-primary">with LeatherCAD AI</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                    The end-to-end solution for brands, manufacturers, and large-scale retailers. Automate patterns, integrate with ERP, and streamline production.
                </p>

                <div className="flex gap-4 justify-center mb-24">
                    <button className="btn-primary px-8 py-4 text-lg font-bold">Request Demo</button>
                    <button className="px-8 py-4 border border-white/10 rounded-xl hover:bg-white/5 font-medium">Contact Sales</button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {[
                        { icon: Shield, title: "Enterprise Security", desc: "SSO, Audit Logs, and Private Cloud deployment options." },
                        { icon: Server, title: "API Integration", desc: "Seamlessly connect with your existing PLM and ERP systems." },
                        { icon: Zap, title: "Automated Patterning", desc: "Generate production-ready DXF patterns instantly from 3D models." },
                        { icon: BarChart, title: "Advanced Analytics", desc: "Deep insights into design trends, material usage, and cost estimation." },
                        { icon: Shield, title: "White Labeling", desc: "Your brand, your domain, your customizer. Fully verified identity." },
                        { icon: Zap, title: "Dedicated Support", desc: "24/7 Priority support channel and dedicated account success manager." }
                    ].map((feat, i) => (
                        <div key={i} className="bg-background-card p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                            <feat.icon className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                            <p className="text-gray-400">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
