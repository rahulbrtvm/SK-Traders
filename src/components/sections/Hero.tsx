'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const slides = [
    {
        badge: "Premium Interlocking Tiles",
        title: "Build Your",
        highlight: "Dream Spaces",
        titleSuffix: "with SK Traders",
        description: "Discover Trivandrum's finest collection of high-durability interlocking tiles. Perfect for driveways, patios, and landscaping.",
        image: "/images/hero-showcase.jpg"
    },
    {
        badge: "Expert Waterproofing",
        title: "Say Goodbye to",
        highlight: "Cracks and Leaks",
        titleSuffix: "with SK Waterproofing",
        description: "Keep your home healthy and dry with our professional waterproofing solutions. From terraces to basements, we've got you covered.",
        image: "/images/waterproofing.jpg"
    },
    {
        badge: "Full Service Solutions",
        title: "The",
        highlight: "Best Service",
        titleSuffix: "for Your Construction Needs",
        description: "From solid bricks to natural stones and metal earthwork, explore our wide range of premium building materials and services.",
        image: "/images/services.jpg"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-secondary">
            {/* Background Pattern/Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary),transparent_70%)] transition-all duration-1000"></div>
                <div className="grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-white/5 h-full"></div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-0">
                    {/* Text Content - Slides */}
                    <div className="relative flex items-center min-h-[350px] md:min-h-[400px] order-2 md:order-1">
                        {slides.map((slide, index) => (
                            <div 
                                key={index}
                                className={`flex flex-col justify-center space-y-6 md:space-y-8 transition-all duration-1000 ${
                                    index === currentSlide 
                                        ? 'opacity-100 translate-x-0 relative z-10' 
                                        : 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'
                                }`}
                            >
                                <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-xs md:text-sm font-bold tracking-wide uppercase self-start">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span>{slide.badge}</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                                    {slide.title} <span className="text-primary italic">{slide.highlight}</span> {slide.titleSuffix}
                                </h1>

                                <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
                                    {slide.description}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-2 md:pt-4">
                                    <a
                                        href="#contact"
                                        className="group relative inline-flex items-center justify-center bg-primary hover:bg-accent text-secondary px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/20"
                                    >
                                        Get Free Quote
                                        <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a
                                        href="#products"
                                        className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all"
                                    >
                                        View Catalog
                                    </a>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-white/60">
                                    <div className="flex items-center">
                                        <CheckCircle className="text-primary mr-2" size={14} />
                                        <span>Durable Quality</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="text-primary mr-2" size={14} />
                                        <span>Modern Designs</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="text-primary mr-2" size={14} />
                                        <span>Expert Installation</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Content - Carousel right side */}
                    <div className="relative block order-1 md:order-2 animate-in fade-in zoom-in duration-1000 delay-300">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-white">
                            {/* Base image to maintain natural aspect ratio (using first slide as template) */}
                            <img
                                src={slides[0].image}
                                alt="spacer"
                                className="w-full h-auto opacity-0"
                            />
                            {slides.map((slide, index) => (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={slide.badge}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Slide Indicators */}
                        <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide 
                                            ? 'bg-primary w-6 md:w-8' 
                                            : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Accent decoration */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-primary/20 rounded-2xl blur-3xl"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-2xl blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
