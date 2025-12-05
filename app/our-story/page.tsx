'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function OurStoryPage() {
    const [activeSection, setActiveSection] = useState('story');

    return (
        <div className="min-h-screen bg-brand-night flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-28 pb-16 relative overflow-hidden">
                <div className="grain-layer"></div>
                <div className="container mx-auto px-6">
                    {/* Hero Text */}
                    <div className="text-center mb-20 space-y-6 animate-fade-in-up">
                        <span className="text-brand-gold font-heading tracking-[0.3em] text-sm font-bold uppercase">The Journey</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-none">
                            CRAFTING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 italic">AUTHENTICITY</span>
                        </h1>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex justify-center gap-4 mb-16 flex-wrap">
                        {[
                            { id: 'story', label: 'Our Story' },
                            { id: 'team', label: 'Our Team' },
                            { id: 'ordering', label: 'Ordering & Delivery' },
                            { id: 'catering', label: 'Catering' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeSection === tab.id
                                    ? 'bg-brand-gold text-black'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-20 max-w-4xl mx-auto">
                        {/* Our Story Section */}
                        {activeSection === 'story' && (
                            <div className="space-y-12">
                                <div className="glass-panel p-8 md:p-12 border-l-4 border-brand-gold animate-fade-in-up">
                                    <h2 className="text-3xl font-display font-bold text-white mb-6">Our Roots</h2>
                                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                        Habiburrito began with a simple mission: to bridge the gap between authentic Mexican street food and premium Halal standards. We noticed a lack of high-quality, Zabiha Halal options that didn't compromise on flavor or freshness.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                        What started as a passion project has grown into a community favorite in Haverhill. We are a fast-casual kitchen focused on one thing: assembling the perfect bowl or burrito exactly how you want it.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        No gimmicks, just premium ingredients. Our proteins are marinated for hours, our salsas are made fresh daily, and every meal is built to order right in front of you.
                                    </p>
                                </div>

                                <div className="glass-panel p-8 md:p-12 border-l-4 border-brand-orange animate-fade-in-up delay-200">
                                    <h2 className="text-3xl font-display font-bold text-white mb-6">The Halal Promise</h2>
                                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                        Integrity is our secret ingredient. We strictly adhere to Zabiha Halal standards, ensuring that every piece of meat served is ethically sourced and prepared. No alcohol is used in our cooking, and we maintain a pure, clean kitchen environment.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        Our commitment extends beyond certification - we work directly with trusted suppliers to ensure the highest quality spices and produce.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Our Team Section */}
                        {activeSection === 'team' && (
                            <div className="space-y-12">
                                <div className="text-center animate-fade-in-up">
                                    <h2 className="text-4xl font-display font-bold text-white mb-6">Meet Our Team</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                                        Our team is the heart of Habiburrito - a diverse group of culinary artists and hospitality experts dedicated to creating extraordinary dining experiences.
                                    </p>
                                </div>

                                {/* Team Members Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-200">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (2).jpeg"
                                                alt="Chef Yusef"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl font-display text-white mb-2">Chef Yusef</h3>
                                        <p className="text-brand-gold text-sm mb-3">Executive Chef & Founder</p>
                                        <p className="text-gray-400 text-sm">
                                            With 15 years of experience blending Mexican and Middle Eastern cuisines, Chef Yusef leads our culinary vision.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM.jpeg"
                                                alt="Maria Rodriguez"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl font-display text-white mb-2">Maria Rodriguez</h3>
                                        <p className="text-brand-gold text-sm mb-3">Head of Operations</p>
                                        <p className="text-gray-400 text-sm">
                                            Maria ensures every guest feels like family while maintaining our gold-standard service efficiency.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ordering & Delivery Section */}
                        {activeSection === 'ordering' && (
                            <div className="space-y-12">
                                <div className="text-center animate-fade-in-up">
                                    <h2 className="text-4xl font-display font-bold text-white mb-6">How to Order</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                                        We keep it simple. Order in-store at our counter, or skip the line by ordering online for pickup.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-200">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-brand-gold/50 transition-colors group">
                                        <div className="text-4xl mb-4">🏪</div>
                                        <h3 className="text-xl font-display text-white mb-2">In-Store Pickup</h3>
                                        <p className="text-gray-400 mb-6">
                                            Order ahead online and your meal will be ready when you arrive. No waiting in line.
                                        </p>
                                        <Link href="/menu">
                                            <button className="text-brand-gold uppercase tracking-widest text-sm font-bold border-b border-brand-gold pb-1 group-hover:text-white group-hover:border-white transition-colors">
                                                Order Now
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-brand-gold/50 transition-colors group">
                                        <div className="text-4xl mb-4">🚚</div>
                                        <h3 className="text-xl font-display text-white mb-2">Local Delivery</h3>
                                        <p className="text-gray-400 mb-6">
                                            Coming soon to Haverhill and Bradford! We are working on bringing Habiburrito directly to your door.
                                            <span className="block mt-2 text-xs text-brand-gold italic">Future expansion planned for Plaistow & Methuen.</span>
                                        </p>
                                        <button disabled className="text-gray-600 uppercase tracking-widest text-sm font-bold border-b border-gray-600 pb-1 cursor-not-allowed">
                                            Coming Soon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Catering Section */}
                        {activeSection === 'catering' && (
                            <div className="space-y-12">
                                <div className="text-center animate-fade-in-up">
                                    <h2 className="text-4xl font-display font-bold text-white mb-6">Catering for Any Occasion</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                                        From corporate lunches to family gatherings, bring the Habiburrito experience to your event. We offer customizable burrito bars and bowl spreads.
                                    </p>
                                </div>

                                <div className="glass-panel p-8 md:p-12 border-l-4 border-brand-gold animate-fade-in-up delay-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-4">The Taco & Bowl Bar</h3>
                                            <ul className="space-y-3 text-gray-300 mb-6">
                                                <li className="flex items-center gap-2"><span className="text-brand-gold">•</span> Choice of 2 Proteins</li>
                                                <li className="flex items-center gap-2"><span className="text-brand-gold">•</span> Cilantro Lime Rice & Beans</li>
                                                <li className="flex items-center gap-2"><span className="text-brand-gold">•</span> Fresh Salsas & Toppings</li>
                                                <li className="flex items-center gap-2"><span className="text-brand-gold">•</span> Chips & Guacamole</li>
                                            </ul>
                                            <p className="text-sm text-gray-400 italic mb-6">Minimum order for 10 people.</p>
                                            <Link href="mailto:admin@habiburrito.com">
                                                <button className="bg-brand-gold text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                                    Inquire Now
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="relative h-64 rounded-2xl overflow-hidden">
                                            <Image
                                                src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg"
                                                alt="Catering spread"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
