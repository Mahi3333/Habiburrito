'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function LocationsPage() {
    return (
        <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
                            FIND <span className="text-brand-gold">US</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Visit us at our flagship location.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 border-t-4 border-brand-gold animate-fade-in-up delay-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-heading font-bold text-white">Downtown HQ</h2>
                                <div className="space-y-2 text-gray-400">
                                    <p>123 Flavor Street</p>
                                    <p>Foodie District, FD 90210</p>
                                </div>
                                <div className="space-y-2 text-gray-400">
                                    <p><strong className="text-brand-gold">Mon-Sun:</strong> 11:00 AM - 10:00 PM</p>
                                </div>
                                <div className="pt-4">
                                    <a href="tel:+15551234567" className="text-white hover:text-brand-gold transition-colors text-lg font-bold">
                                        (555) 123-4567
                                    </a>
                                </div>
                            </div>
                            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                                <span className="text-gray-600">Map Placeholder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
