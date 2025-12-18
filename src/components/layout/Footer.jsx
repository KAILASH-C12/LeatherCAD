import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] py-12">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
                <div>
                    <h4 className="font-bold text-white mb-4">Product</h4>
                    <ul className="space-y-2">
                        <li><Link to="/catalog" className="text-gray-400 hover:text-primary transition-colors">Catalog</Link></li>
                        <li><Link to="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
                        <li><Link to="/enterprise" className="text-gray-400 hover:text-primary transition-colors">Enterprise</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link to="/careers" className="text-gray-400 hover:text-primary transition-colors">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link to="/help" className="text-gray-400 hover:text-primary transition-colors">Help Center</Link></li>
                        <li><Link to="/legal" className="text-gray-400 hover:text-primary transition-colors">Terms & Privacy</Link></li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <h4 className="font-bold text-white mb-4">LeatherCAD</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        The world's most advanced 3D leather configurator for artisans and brands. Design, visualize, and craft perfection.
                    </p>
                </div>
            </div>
            <div className="border-t border-white/5 mt-8 pt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} LeatherCAD. All rights reserved.
            </div>
        </footer>
    );
}
