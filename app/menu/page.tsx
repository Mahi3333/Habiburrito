'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function MenuPage() {
    const menuCategories = [
        {
            title: "Signature Bowls",
            items: [
                { name: "The Classic", description: "Grilled chicken, cilantro lime rice, black beans, pico de gallo, cheese, and sour cream.", price: "$12.95" },
                { name: "Spicy Steak", description: "Marinated steak, brown rice, pinto beans, hot salsa, corn, and chipotle mayo.", price: "$14.95" },
                { name: "Veggie Delight", description: "Fajita veggies, cilantro lime rice, black beans, guacamole, and mild salsa.", price: "$11.95" }
            ]
        },
        {
            title: "Burritos",
            items: [
                { name: "Chicken Burrito", description: "Flour tortilla, grilled chicken, rice, beans, cheese, and salsa.", price: "$12.95" },
                { name: "Steak Burrito", description: "Flour tortilla, marinated steak, rice, beans, cheese, and salsa.", price: "$14.95" },
                { name: "Bean & Cheese", description: "Flour tortilla, black or pinto beans, and melted cheese.", price: "$9.95" }
            ]
        },
        {
            title: "Salads",
            items: [
                { name: "Chicken Salad", description: "Romaine lettuce, grilled chicken, beans, corn, salsa, and vinaigrette.", price: "$12.95" },
                { name: "Steak Salad", description: "Romaine lettuce, marinated steak, beans, corn, salsa, and vinaigrette.", price: "$14.95" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
                            OUR <span className="text-brand-gold">MENU</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Fresh, Halal, and made to order. Explore our signature creations or build your own masterpiece.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {menuCategories.map((category, idx) => (
                            <div key={idx} className="glass-panel p-8 rounded-none border-t-4 border-brand-gold animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <h2 className="text-3xl font-heading font-bold text-white mb-8 border-b border-gray-800 pb-4">{category.title}</h2>
                                <div className="space-y-8">
                                    {category.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="group flex gap-4 items-start">
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-baseline mb-2">
                                                    <h3 className="text-xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">{item.name}</h3>
                                                    <span className="text-brand-gold font-mono">{item.price}</span>
                                                </div>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Build Your Own CTA Card */}
                        <div className="glass-panel p-8 rounded-none border-t-4 border-brand-orange flex flex-col justify-center items-center text-center animate-fade-in-up delay-300">
                            <h2 className="text-3xl font-heading font-bold text-white mb-4">Build Your Own</h2>
                            <p className="text-gray-400 mb-8">Create your perfect meal with unlimited combinations of fresh ingredients.</p>
                            <Link href="/build">
                                <button className="bg-brand-orange text-white text-lg font-heading font-bold tracking-widest py-4 px-10 hover:bg-orange-600 transition-all uppercase">
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
