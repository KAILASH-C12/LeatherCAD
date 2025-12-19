import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">

            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold">Get in Touch</h1>
                        <p className="text-gray-400 text-lg">
                            Have questions about our enterprise solutions or need help with a design? Our team is here to help.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Email Us</h3>
                                    <p className="text-gray-400">support@leathercad.com</p>
                                    <p className="text-gray-400">sales@leathercad.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Visit Us</h3>
                                    <p className="text-gray-400">123 Innovation Drive</p>
                                    <p className="text-gray-400">Tech City, CA 94000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Call Us</h3>
                                    <p className="text-gray-400">+1 (555) 000-0000</p>
                                    <p className="text-xs text-gray-500">Mon-Fri, 9am - 6pm PST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-background-card p-8 rounded-2xl border border-white/10 space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary"></textarea>
                        </div>

                        <button className="w-full btn-primary py-4 rounded-xl font-bold hover:brightness-110 transition-all">Send Message</button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}
