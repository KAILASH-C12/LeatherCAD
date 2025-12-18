import { useState, useRef, useEffect } from "react"
import { Palette, Layers, Ruler, Download, Eye, Zap } from "lucide-react"

const features = [
    {
        icon: Palette,
        title: "Color Customization",
        description: "Choose from a wide range of premium leather colors and finishes to match your vision perfectly.",
    },
    {
        icon: Layers,
        title: "3D Visualization",
        description: "See your designs come to life with real-time 3D rendering and interactive product views.",
    },
    {
        icon: Ruler,
        title: "Precise Measurements",
        description: "Define exact dimensions and specifications for your leather products with millimeter accuracy.",
    },
    {
        icon: Download,
        title: "Pattern Export",
        description: "Export production-ready patterns in PDF and SVG formats for seamless manufacturing.",
    },
    {
        icon: Eye,
        title: "Material Preview",
        description: "Preview different leather textures and materials before finalizing your design.",
    },
    {
        icon: Zap,
        title: "Quick Prototyping",
        description: "Rapidly iterate on designs with instant updates and real-time collaboration tools.",
    },
]



export default function FeaturesSection() {
    const [visibleCards, setVisibleCards] = useState([])
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll(".feature-card")
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index])
                            }, index * 100)
                        })
                    }
                })
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section id="features" ref={sectionRef} className="py-24 px-6 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                        Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Everything You Need to Design</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Powerful tools designed specifically for leather artisans to bring their creative visions to life.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${visibleCards.includes(index) ? "animate-slide-up opacity-100" : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-card-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
