'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuPage() {
    const menuCategories = [
        {
            title: "Signature Bowls",
            badge: "Chef's Mosaic",
            items: [
                { name: "The Classic", description: "Grilled chicken, cilantro lime rice, black beans, pico de gallo, cheese, and sour cream.", price: "$12.95" },
                { name: "Spicy Steak", description: "Marinated steak, brown rice, pinto beans, hot salsa, corn, and chipotle mayo.", price: "$14.95" },
                { name: "Veggie Delight", description: "Fajita veggies, cilantro lime rice, black beans, guacamole, and mild salsa.", price: "$11.95" }
            ]
        },
        {
            title: "Burritos",
            badge: "Charcoal Roll",
            items: [
                { name: "Chicken Burrito", description: "Flour tortilla, grilled chicken, rice, beans, cheese, and salsa.", price: "$12.95" },
                { name: "Steak Burrito", description: "Flour tortilla, marinated steak, rice, beans, cheese, and salsa.", price: "$14.95" },
                { name: "Bean & Cheese", description: "Flour tortilla, black or pinto beans, and melted cheese.", price: "$9.95" }
            ]
        },
        {
            title: "Salads",
            badge: "Garden Ember",
            items: [
                { name: "Chicken Salad", description: "Romaine lettuce, grilled chicken, beans, corn, salsa, and vinaigrette.", price: "$12.95" },
                { name: "Steak Salad", description: "Romaine lettuce, marinated steak, beans, corn, salsa, and vinaigrette.", price: "$14.95" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-brand-night flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-28 pb-20 relative overflow-hidden">
                <div className="grain-layer"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                        <p className="text-xs tracking-[0.3em] uppercase text-brand-gold">Menu & Chef Drops</p>
                        <h1 className="text-5xl md:text-7xl font-display text-white tracking-tight">
                            Gold-label creations with <span className="text-brand-gold">chef notes</span>
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                            Ingredient mosaics, provenance badges, and microinteractions to guide your cravings. Each card carries chef’s notes for a bespoke tasting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {menuCategories.map((category, idx) => (
                            <div key={idx} className="relative bg-white/5 border border-white/10 rounded-3xl p-8 animate-fade-in-up parallax-hover" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-display text-white">{category.title}</h2>
                                    <span className="px-3 py-1 text-xs uppercase tracking-[0.2em] border border-brand-gold/50 text-brand-gold rounded-full">{category.badge}</span>
                                </div>
                                <div className="space-y-8">
                                    {category.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="group flex gap-4 items-start">
                                            <div className="flex-grow space-y-2">
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="text-xl font-display text-brand-cream group-hover:text-brand-gold transition-colors">{item.name}</h3>
                                                    <span className="text-brand-gold font-mono">{item.price}</span>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                                <p className="text-[11px] text-brand-jade uppercase tracking-[0.2em]">Chef note: Ask for ember butter finish</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Build Your Own CTA Card */}
                        <div className="relative bg-gradient-to-br from-brand-dark-gray via-black to-brand-dark-gray border border-brand-ember/40 rounded-3xl p-8 flex flex-col justify-center items-center text-center animate-fade-in-up delay-300 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(11,175,135,0.45),transparent_30%),radial-gradient(circle_at_80%_0,rgba(212,175,55,0.35),transparent_28%)]"></div>
                            <h2 className="text-3xl font-display text-white mb-4">Build Your Own Ritual</h2>
                            <p className="text-gray-300 mb-8 max-w-lg">Tactile steppers, hover parallax on proteins, and chef badges that respond as you layer flavors.</p>
                            <Link href="/build">
                                <button className="bg-brand-gold text-brand-black text-lg font-heading font-bold tracking-widest py-4 px-10 rounded-full hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)] transition-all uppercase">
                                    Start Building
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
