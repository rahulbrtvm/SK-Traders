import React from 'react';
import { Tag, Calendar } from 'lucide-react';

const SpecialOffers = () => {
    return (
        <section className="py-12 bg-primary">
            <div className="container mx-auto px-4">
                <div className="bg-secondary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>

                    <div className="relative z-10 flex-grow text-center md:text-left">
                        <div className="inline-flex items-center space-x-2 bg-primary text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Tag size={14} />
                            <span>Limited Time Offer</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                            Save <span className="text-primary tracking-tighter italic">₹2 Per Tile</span>
                        </h3>
                        <p className="text-xl text-white/70 max-w-xl">
                            Get an exclusive discount when you pre-book your orders this month. Don't miss out on premium quality at an unbeatable price.
                        </p>
                    </div>

                    <div className="relative z-10 w-full md:w-auto">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
                                <Calendar size={20} />
                                <span className="font-bold text-sm uppercase tracking-widest">Pre-Booking Active</span>
                            </div>
                            <a
                                href="#contact"
                                className="block w-full bg-primary hover:bg-accent text-secondary font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105"
                            >
                                Claim Discount Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
