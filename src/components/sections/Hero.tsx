import React from 'react';
import { ArrowRight, CheckCircle, LayoutDashboard } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-secondary">
            {/* Background Pattern/Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary),transparent_70%)]"></div>
                <div className="grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-white/5 h-full"></div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-bold tracking-wide uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span>Premium Interlocking Tiles</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        Build Your <span className="text-primary italic">Dream Spaces</span> with SK Traders
                    </h1>

                    <p className="text-xl text-white/80 max-w-lg leading-relaxed">
                        Discover Trivandrum's finest collection of high-durability interlocking tiles. Perfect for driveways, patios, and landscaping.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="#contact"
                            data-testid="hero-quote-btn"
                            className="group relative inline-flex items-center justify-center bg-primary hover:bg-accent text-secondary px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/20"
                        >
                            Get Free Quote
                            <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#products"
                            className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
                        >
                            View Catalog
                        </a>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-white/60">
                        <div className="flex items-center">
                            <CheckCircle className="text-primary mr-2" size={16} />
                            <span>Durable Quality</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="text-primary mr-2" size={16} />
                            <span>Modern Designs</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="text-primary mr-2" size={16} />
                            <span>Expert Installation</span>
                        </div>
                    </div>
                </div>

                <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group bg-white">
                        <img
                            src="/images/hero-showcase.jpg"
                            alt="SK Traders Showcase"
                            className="w-full h-auto block object-cover"
                        />
                    </div>



                    {/* Accent decoration */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl blur-3xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-2xl blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
