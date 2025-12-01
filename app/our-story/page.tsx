'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function OurStoryPage() {
    return (
        <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-6">

                    {/* Hero Text */}
                    <div className="text-center mb-20 space-y-6 animate-fade-in-up">
                        <span className="text-brand-gold font-heading tracking-[0.3em] text-sm font-bold uppercase">The Journey</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-none">
                            CRAFTING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 italic">AUTHENTICITY</span>
                        </h1>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

                        {/* Text Content */}
                        <div className="space-y-8 animate-fade-in-up delay-200">
                            <div className="glass-panel p-8 md:p-12 border-l-4 border-brand-gold">
                                <h3 className="text-2xl font-heading font-bold text-white mb-6">Our Roots</h3>
                                <p className="text-gray-400 leading-loose text-lg">
                                    Habiburrito began with a simple mission: to bridge the gap between authentic Mexican street food and premium Halal standards. We noticed a lack of high-quality, Zabiha Halal options that didn't compromise on flavor or freshness.
                                </p>
                                <p className="text-gray-400 leading-loose text-lg mt-6">
                                    What started as a small family kitchen has grown into a community favorite, known for our signature marinades, open-flame grilling, and commitment to using only the freshest ingredients sourced daily.
                                </p>
                            </div>

                            <div className="glass-panel p-8 md:p-12 border-l-4 border-brand-orange">
                                <h3 className="text-2xl font-heading font-bold text-white mb-6">The Halal Promise</h3>
                                <p className="text-gray-400 leading-loose text-lg">
                                    Integrity is our secret ingredient. We strictly adhere to Zabiha Halal standards, ensuring that every piece of meat served is ethically sourced and prepared. No alcohol is used in our cooking, and we maintain a pure, clean kitchen environment.
                                </p>
                            </div>
                        </div>

                        {/* Visual Placeholder */}
                        <div className="relative h-[600px] w-full animate-fade-in-up delay-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent rounded-2xl transform rotate-3"></div>
                            <div className="absolute inset-0 bg-gray-900 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                                {/* Placeholder for Story Image */}
                                <div className="text-center p-8">
                                    <div className="text-6xl mb-4">🌶️</div>
                                    <p className="text-gray-500 font-heading tracking-widest uppercase">Passion in every bite</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
