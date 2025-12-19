
export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">
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
