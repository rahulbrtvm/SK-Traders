'use client';

import React from 'react';
import { Grid3X3, Droplets, HardHat, ArrowRight } from 'lucide-react';

const services = [
    {
        title: "Premium Interlocking Tiles",
        description: "Transform your outdoor spaces with our high-durability, aesthetically superior interlocking tiles. Available in various shapes, sizes, and colors to match your vision.",
        icon: <Grid3X3 className="w-10 h-10 text-primary" />,
        link: "#products",
        badge: "Landscaping"
    },
    {
        title: "Professional Waterproofing",
        description: "Protect your structure from moisture and leaks with our advanced waterproofing treatments. Expert application for terraces, basements, and swimming pools.",
        icon: <Droplets className="w-10 h-10 text-primary" />,
        link: "#contact",
        badge: "Protection"
    },
    {
        title: "Construction & Materials",
        description: "From solid bricks and ACC blocks to natural stones and metal earthwork, we provide premium building materials for every stage of your project.",
        icon: <HardHat className="text-primary w-10 h-10" />,
        link: "#contact",
        badge: "Building"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-neutral-50 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-700">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Expertise You Can Trust</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 leading-tight">
                        Our <span className="text-primary italic">Premier Services</span>
                    </h3>
                    <p className="text-lg text-secondary/60 leading-relaxed max-w-2xl">
                        Comprehensive solutions for modern construction and landscaping. We combine quality materials with unmatched expertise.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="group bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start"
                        >
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500 shadow-lg group-hover:shadow-primary/20">
                                <div className="group-hover:text-secondary transition-colors duration-500">
                                    {service.icon}
                                </div>
                            </div>

                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 block opacity-60 group-hover:opacity-100 transition-opacity">
                                {service.badge}
                            </span>
                            
                            <h4 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                                {service.title}
                            </h4>
                            
                            <p className="text-secondary/60 leading-relaxed mb-8 flex-grow">
                                {service.description}
                            </p>

                            <a 
                                href={service.link}
                                className="inline-flex items-center text-secondary font-bold text-sm hover:text-primary transition-colors group/link"
                            >
                                Get More info
                                <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
