import Navbar from '../components/layout/Navbar';

const articles = [
    { title: "The Future of Digital Leather Patterning", cat: "Industry", date: "Oct 12, 2024", img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=600" },
    { title: "Sourcing Sustainable Leather Materials", cat: "Materials", date: "Sep 28, 2024", img: "https://images.unsplash.com/photo-1551216223-37c8d1dbec5c?auto=format&fit=crop&q=80&w=600" },
    { title: "How 3D Customization Boosts Sales", cat: "Case Study", date: "Sep 15, 2024", img: "https://images.unsplash.com/photo-1605218427368-35b8686e06b3?auto=format&fit=crop&q=80&w=600" },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold mb-12">Latest Insights</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-white/5">
                                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                <span className="text-primary font-medium">{post.cat}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
