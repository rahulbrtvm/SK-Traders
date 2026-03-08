'use client';

import React, { useState } from 'react';
import { Send, Phone, MapPin, User, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            customer_name: formData.get('name'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            message: formData.get('message'),
            status: 'new'
        };

        try {
            const { error: submitError } = await supabase
                .from('leads')
                .insert([data]);

            if (submitError) throw submitError;

            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            console.error('Submission error:', err);
            setError('Something went wrong. Please try again or call us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Get In Touch</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-secondary mb-8">
                            Start Your Project <span className="text-primary italic">Today</span>
                        </h3>
                        <p className="text-lg text-secondary/60 mb-12 leading-relaxed">
                            Have questions about our tiles or need a custom quote? Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0 border border-neutral-100">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-secondary/40 uppercase tracking-widest">Call Us</p>
                                    <a href="tel:7012311156" className="text-xl font-bold text-secondary hover:text-primary transition-colors">7012311156</a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0 border border-neutral-100">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-secondary/40 uppercase tracking-widest">Our Location</p>
                                    <p className="text-xl font-bold text-secondary">Trivandrum, Kerala</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-neutral-200 border border-neutral-100 relative">
                        {success ? (
                            <div className="text-center py-12 animate-in fade-in zoom-in">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send size={40} />
                                </div>
                                <h4 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h4>
                                <p className="text-secondary/60 mb-8">Thank you for reaching out. We'll contact you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-secondary/70 flex items-center" htmlFor="name">
                                            <User size={14} className="mr-2 text-primary" /> Full Name
                                        </label>
                                        <input
                                            required
                                            name="name"
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-secondary/70 flex items-center" htmlFor="phone">
                                            <Phone size={14} className="mr-2 text-primary" /> Phone Number
                                        </label>
                                        <input
                                            required
                                            name="phone"
                                            id="phone"
                                            type="tel"
                                            data-testid="input-customer-phone"
                                            placeholder="7012311156"
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary/70 flex items-center" htmlFor="location">
                                        <MapPin size={14} className="mr-2 text-primary" /> Project Location
                                    </label>
                                    <input
                                        required
                                        name="location"
                                        id="location"
                                        type="text"
                                        placeholder="e.g. Kazhakkoottam, Trivandrum"
                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary/70 flex items-center" htmlFor="message">
                                        <MessageSquare size={14} className="mr-2 text-primary" /> Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm font-medium">{error}</p>
                                )}

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-secondary hover:bg-neutral-800 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Get My Free Quote'}
                                    {!loading && <Send size={18} className="ml-2" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
