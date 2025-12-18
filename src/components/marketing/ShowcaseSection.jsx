import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const products = [
    {
        name: "Dean Biker Jacket",
        category: "Jackets",
        image: "https://images.unsplash.com/photo-1551028919-ac7fa7ea47ea?auto=format&fit=crop&q=80&w=600",
        slug: "jacket",
        price: "$899",
    },
    {
        name: "Executive Tote Bag",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
        slug: "bag",
        price: "$549",
    },
    {
        name: "Classic Chelsea Boots",
        category: "Boots",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=600",
        slug: "boots",
        price: "$449",
    },
    {
        name: "Heritage Belt",
        category: "Belts",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=600",
        slug: "belt",
        price: "$149",
    },
    {
        name: "Artisan Wallet",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
        slug: "wallet",
        price: "$199",
    },
    {
        name: "Aviator Jacket",
        category: "Jackets",
        image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=600",
        slug: "jacket",
        price: "$1099",
    },
    {
        name: "Oxford Boots",
        category: "Boots",
        image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&q=80&w=600",
        slug: "boots",
        price: "$499",
    },
    {
        name: "Messenger Bag",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
        slug: "bag",
        price: "$399",
    },
]

export default function ShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState("right")

    const nextSlide = () => {
        if (isAnimating) return
        setDirection("right")
        setIsAnimating(true)
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % products.length)
            setIsAnimating(false)
        }, 300)
    }

    const prevSlide = () => {
        if (isAnimating) return
        setDirection("left")
        setIsAnimating(true)
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + products.length) % products.length)
            setIsAnimating(false)
        }, 300)
    }

    const goToSlide = (index) => {
        if (isAnimating || index === activeIndex) return
        setDirection(index > activeIndex ? "right" : "left")
        setIsAnimating(true)
        setTimeout(() => {
            setActiveIndex(index)
            setIsAnimating(false)
        }, 300)
    }

    return (
        <section id="showcase" className="py-24 px-6 bg-gradient-to-b from-background to-secondary/10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
                        Showcase
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                        Customize Any Leather Product
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From jackets to boots, bags to belts - design and customize your perfect leather goods with our 3D tool.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="flex items-center justify-center gap-4 md:gap-6 overflow-hidden py-8">
                        {/* Show 3 items on desktop, 1 on mobile */}
                        {[-1, 0, 1].map((offset) => {
                            const index = (activeIndex + offset + products.length) % products.length
                            const product = products[index]
                            const isActive = offset === 0

                            return (
                                <Link
                                    to={`/customizer?product=${product.slug}`}
                                    key={`${index}-${offset}`}
                                    className={`
                    flex-shrink-0 w-72 md:w-80 transition-all duration-500 ease-out
                    ${isActive ? "scale-100 opacity-100 z-10" : "scale-90 opacity-50 hidden md:block"}
                    ${isAnimating ? (direction === "right" ? "translate-x-4" : "-translate-x-4") : "translate-x-0"}
                  `}
                                >
                                    <div
                                        className={`
                    group relative rounded-2xl overflow-hidden bg-card border transition-all duration-500
                    ${isActive ? "border-white/30 shadow-2xl shadow-white/5" : "border-border"}
                    hover:border-white/50
                  `}
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-secondary to-card">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className={`
                          w-full h-full object-cover transition-all duration-700
                          ${isActive ? "scale-100" : "scale-95"}
                          group-hover:scale-110
                        `}
                                            />
                                        </div>

                                        {/* Hover overlay with CTA */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <span className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                Customize Now
                                            </span>
                                        </div>

                                        {/* Product info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm text-white/70 mb-1">{product.category}</div>
                                                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                                                </div>
                                                <div className="text-lg font-bold text-white">{product.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            disabled={isAnimating}
                            className="rounded-full border-white/20 hover:bg-white/10 hover:border-white/40 bg-transparent text-white transition-all duration-300 hover:scale-110"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        {/* Dot indicators */}
                        <div className="flex items-center gap-2">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    disabled={isAnimating}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            disabled={isAnimating}
                            className="rounded-full border-white/20 hover:bg-white/10 hover:border-white/40 bg-transparent text-white transition-all duration-300 hover:scale-110"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Quick product grid for all items */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">All Products</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((product, index) => (
                            <Link
                                to={`/customizer?product=${product.slug}`}
                                key={index}
                                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-white/30 transition-all duration-300 hover:scale-105"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4">
                                    <div>
                                        <p className="text-xs text-white/60">{product.category}</p>
                                        <p className="text-sm font-semibold text-white">{product.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
