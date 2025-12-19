import { Button } from "../ui/button"
import { ArrowRight, Play, Layers, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function NewHeroSection() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
            {/* Background gradient - black with white accents */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />

            {/* White accent overlay at top */}
            <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.03] to-transparent" />

            {/* White accent glow spots */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
                    {/* Left Content */}
                    <div className={`space-y-8 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
                        {/* Badge - with white border accent */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 text-white text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Professional Leather Design Tool
                        </div>

                        {/* Headline - with white and brown accent */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="text-white">Design Your</span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
                                Leather Vision
                            </span>
                        </h1>

                        {/* Description - lighter text */}
                        <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                            Professional 3D customization software for leather artisans and MSMEs. Design, visualize, and order your
                            leather products with precision.
                        </p>

                        {/* CTA Buttons - white primary button */}
                        <div className="flex flex-wrap gap-4">
                            <Link to="/customizer" className="no-underline">
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 transition-all hover:scale-105 group px-8 shadow-lg shadow-white/10"
                                >
                                    Start Customizing
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 bg-white/5 hover:bg-white/10 text-white transition-all group px-8"
                            >
                                <Play className="mr-2 h-4 w-4" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats - with white accents */}
                        <div className="flex gap-8 pt-8 border-t border-white/10">
                            <div className="animate-fade-in stagger-1">
                                <div className="text-3xl font-bold text-white">100+</div>
                                <div className="text-sm text-white/50">Active Users</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="animate-fade-in stagger-2">
                                <div className="text-3xl font-bold text-white">500+</div>
                                <div className="text-sm text-white/50">Designs Created</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="animate-fade-in stagger-3">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-sm text-white/50">Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Image with floating cards */}
                    <div className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                        {/* Main product image container - white border accent */}
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] p-1 shadow-2xl border border-white/20">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-black">
                                {/* 
                   Replacing specific image with a high-quality placeholder that matches the theme.
                   Ideally, we would run a generation tool here if we had one and time permitted, 
                   but a sleek dark placeholder works for structure.
                */}
                                <img
                                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
                                    alt="Leather Bag Design"
                                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />
                            </div>
                        </div>

                        {/* Floating Card 1 - 3D Design with white accent */}
                        <div className="absolute top-12 -left-8 animate-float">
                            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">3D Design</div>
                                    <div className="text-sm text-white/60">Real-time Preview</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 2 - Add to Cart */}
                        <div className="absolute bottom-24 -right-8 animate-float-delayed">
                            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Add to Cart</div>
                                    <div className="text-sm text-white/50">Order Instantly</div>
                                </div>
                            </div>
                        </div>

                        {/* White accent glow */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
                        {/* Brown accent glow */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
                    </div>
                </div>

                {/* Scroll indicator - white */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 rounded-full bg-white/50" />
                    </div>
                </div>
            </div>
        </section>
    )
}
