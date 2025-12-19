export default function LegalPage() {
    return (
        <div className="min-h-screen bg-background-dark text-white">
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">Terms & Privacy</h1>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-gray-400">Welcome to LeatherCAD. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Intellectual Property</h2>
                        <p className="text-gray-400">All designs created on the platform remain the intellectual property of the creator, subject to the license capability of your subscription tier.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Data Privacy</h2>
                        <p className="text-gray-400">We respect your privacy. We collect usage data to improve our 3D engine but do not sell your personal data to third parties.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
