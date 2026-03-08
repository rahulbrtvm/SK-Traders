import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, LayoutDashboard } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-secondary text-white shadow-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                    <img src="/logo.png" alt="SK" className="h-8 w-8 object-contain" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-black text-primary italic tracking-tighter">SK</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] -mt-0.5 opacity-80">TRADERS</span>
                    </div>
                </Link>



                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="#products" className="hover:text-primary transition-colors">Products</Link>
                    <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
                    <Link href="#about" className="hover:text-primary transition-colors">About Us</Link>
                    <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link
                        href="tel:7012311156"
                        className="flex items-center space-x-1 text-sm bg-primary/10 hover:bg-primary/20 p-2 rounded-full text-primary transition-all md:px-4 md:rounded-lg"
                    >
                        <Phone size={18} />
                        <span className="hidden md:inline font-semibold">Call Now</span>
                    </Link>
                    <Link
                        href="https://wa.me/7012311156"
                        target="_blank"
                        className="flex items-center space-x-1 text-sm bg-green-600 hover:bg-green-700 p-2 rounded-full text-white transition-all md:px-4 md:rounded-lg"
                    >
                        <MessageSquare size={18} />
                        <span className="hidden md:inline font-semibold">WhatsApp</span>
                    </Link>
                    <Link
                        href="/admin/login"
                        data-testid="nav-login-link"
                        className="p-2 text-white/70 hover:text-primary transition-colors"
                        title="Admin Login"
                    >
                        <LayoutDashboard size={20} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
