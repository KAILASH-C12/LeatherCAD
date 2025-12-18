import { motion } from 'framer-motion';
import { Layers, Palette, Shield, Ruler, Download, Eye, ArrowRight, Play, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/marketing/Hero3D';
import NewHeroSection from '../components/marketing/NewHeroSection';
import FeaturesSection from '../components/marketing/FeaturesSection';
import ShowcaseSection from '../components/marketing/ShowcaseSection';
import PricingSection from '../components/marketing/PricingSection';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
            <Navbar />

            <NewHeroSection />
            <FeaturesSection />
            <ShowcaseSection />
            <PricingSection />
            <Footer />
        </div>
    );
}
