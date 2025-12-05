'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    chefNote: string;
    isSignature: boolean;
}

interface MenuClientProps {
    initialMenuItems: MenuItem[];
}

export default function MenuClient({ initialMenuItems }: MenuClientProps) {
    const [menuItems] = useState<MenuItem[]>(initialMenuItems);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['all', 'bowls', 'burritos', 'tacos'];
    const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(i => i.category === activeCategory);

    const getBackgroundImage = () => {
        switch (activeCategory) {
            case 'burritos': return '/background_burritos_blur.png';
            case 'tacos': return '/background_tacos_blur.png';
            case 'bowls': return '/background_bowls_blur.png';
            default: return '/background_bowls_blur.png';
        }
    };

    return (
        <div className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-black relative">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-brand-black/80 z-10" /> {/* Reduced opacity for visibility */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={getBackgroundImage()}
                        alt="Background texture"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </div>

            <div className="relative z-10">
                <Header />

                <main className="pt-32 pb-20 container mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
                        >
                            THE MENU
                        </motion.h1>
                        <p className="text-brand-gold tracking-widest uppercase text-sm">Curated for the obsessed</p>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-center gap-8 mb-16 border-b border-white/10 pb-6 overflow-x-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-sm font-display font-bold uppercase tracking-[0.2em] transition-colors ${activeCategory === cat ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[16/9] mb-6 overflow-hidden bg-brand-charcoal">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    />
                                    {item.isSignature && (
                                        <div className="absolute top-4 left-4 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                            Signature
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-2xl font-display font-bold text-white">{item.name}</h3>
                                    <span className="font-mono text-brand-gold text-lg">{item.price}</span>
                                </div>
                                <p className="text-gray-400 font-light leading-relaxed mb-4 max-w-md">{item.description}</p>

                                <div className="flex items-center gap-2 text-xs text-brand-gold/60 uppercase tracking-wider">
                                    <span className="w-1 h-1 bg-brand-gold rounded-full" />
                                    {item.chefNote}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-32 text-center">
                        <Link href="/build">
                            <button className="px-10 py-5 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold font-display font-bold tracking-widest uppercase transition-all">
                                Build Your Own
                            </button>
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
