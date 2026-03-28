'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
    { title: "Services", href: "#services" },
    { title: "Products", href: "#products" },
    { title: "Contact Us", href: "#contact" }
];

const Header = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Sections to observe
        const sectionIds = ['services', 'products', 'contact'];
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full bg-secondary/95 backdrop-blur-md text-white shadow-lg border-b border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group relative z-50">
                    <img src="/logo.png" alt="SK" className="h-8 w-8 object-contain" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-black text-primary italic tracking-tighter">SK</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] -mt-0.5 opacity-80">TRADERS</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.title} 
                            href={link.href} 
                            className={`transition-all duration-300 relative py-1 group ${
                                activeSection === link.href.substring(1) ? 'text-primary' : 'text-white/70 hover:text-white'
                            }`}
                        >
                            {link.title}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                                activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-3 md:space-x-4">
                    <Link
                        href="tel:7012311156"
                        className="hidden sm:flex items-center space-x-1 text-sm bg-primary/10 hover:bg-primary/20 p-2 rounded-full text-primary transition-all md:px-4 md:rounded-lg"
                    >
                        <Phone size={18} />
                        <span className="hidden md:inline font-semibold">Call Now</span>
                    </Link>
                    
                    <Link
                        href="https://wa.me/7012311156"
                        target="_blank"
                        className="flex items-center space-x-2 text-sm bg-green-600 hover:bg-green-700 p-2 rounded-full text-white transition-all md:px-4 md:rounded-lg"
                    >
                        <svg 
                            viewBox="0 0 448 512" 
                            className="w-5 h-5 fill-white"
                        >
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.9-17-41.2-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.7 9.1 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                        <span className="hidden md:inline font-semibold">WhatsApp</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="p-2 text-white hover:text-primary transition-colors md:hidden relative z-50"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Admin Icon (Legacy) */}
                    <Link
                        href="/admin/login"
                        className="hidden md:flex p-2 text-white/50 hover:text-primary transition-colors border-l border-white/10 ml-2 pl-4"
                        title="Admin Login"
                    >
                        <LayoutDashboard size={18} />
                    </Link>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMobileMenu}
            />

            {/* Mobile Sidebar - 100% SOLID & FULL SCREEN */}
            <div 
                className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                style={{ backgroundColor: '#000000', height: '100vh', width: '100vw' }}
            >
                <div className="flex flex-col h-full w-full">
                    {/* Header Bar within Menu */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-secondary font-black text-xl italic">SK</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-widest uppercase italic">SK Traders</span>
                        </div>
                        <button 
                            onClick={toggleMobileMenu}
                            className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-secondary shadow-lg active:scale-90 transition-all font-bold"
                        >
                            <X size={32} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Navigation Links - Ultra Clear */}
                    <nav className="flex-grow flex flex-col items-center justify-center p-6 space-y-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.title} 
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`w-full max-w-sm text-center py-6 px-10 rounded-2xl transition-all border-2 ${
                                    activeSection === link.href.substring(1) 
                                        ? 'bg-primary border-primary text-secondary shadow-2xl shadow-primary/40 scale-105' 
                                        : 'bg-neutral-800 border-neutral-700 text-white hover:border-primary/50'
                                }`}
                            >
                                <span className="text-2xl font-black uppercase tracking-[0.2em]">
                                    {link.title}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Quick Contact Footer */}
                    <div className="p-8 space-y-4 bg-neutral-900 border-t border-white/10">
                        <Link
                            href="tel:7012311156"
                            className="flex items-center justify-center space-x-4 p-5 rounded-2xl bg-primary text-secondary w-full shadow-lg active:scale-95 transition-all"
                        >
                            <Phone size={24} fill="currentColor" />
                            <span className="text-xl font-black italic tracking-tight underline">Call: 70123 11156</span>
                        </Link>
                        
                        <div className="text-center pt-4">
                            <Link
                                href="/admin/login"
                                className="flex items-center justify-center text-white/20 hover:text-primary transition-colors py-4 bg-white/5 rounded-xl border border-dashed border-white/10 px-8"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LayoutDashboard size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
