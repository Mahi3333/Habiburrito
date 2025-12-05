'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OrderPage() {
    return (
        <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-12 animate-fade-in-up">
                        START YOUR <span className="text-brand-gold">ORDER</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Option 1: Signature Menu */}
                        <Link href="/menu" className="group relative h-96 glass-panel border border-brand-gold/20 hover:border-brand-gold transition-all duration-500 flex flex-col items-center justify-center p-8 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                            <div className="absolute inset-0 bg-[url('/menu-items/bowl-signature.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"></div>

                            <div className="relative z-20 space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                                <h2 className="text-3xl font-heading font-bold text-white">SIGNATURE MENU</h2>
                                <p className="text-gray-300 max-w-xs mx-auto">Explore our chef-curated bowls, burritos, and salads.</p>
                                <span className="inline-block mt-4 text-brand-gold font-bold tracking-widest uppercase text-sm border-b border-brand-gold pb-1">View Menu</span>
                            </div>
                        </Link>

                        {/* Option 2: Build Your Own */}
                        <Link href="/build" className="group relative h-96 glass-panel border border-brand-orange/20 hover:border-brand-orange transition-all duration-500 flex flex-col items-center justify-center p-8 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                            {/* Fallback pattern if no image */}
                            <div className="absolute inset-0 bg-brand-dark-gray opacity-40 group-hover:opacity-60 transition-all duration-700"></div>

                            <div className="relative z-20 space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                                <h2 className="text-3xl font-heading font-bold text-white">BUILD YOUR OWN</h2>
                                <p className="text-gray-300 max-w-xs mx-auto">Customize every layer. Your bowl, your way.</p>
                                <span className="inline-block mt-4 text-brand-orange font-bold tracking-widest uppercase text-sm border-b border-brand-orange pb-1">Start Building</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
