'use client';

import React, { useState, useEffect } from 'react';
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
    const [visibleCount, setVisibleCount] = useState(8);
    const [showStickyButton, setShowStickyButton] = useState(false);

    const categories = ['all', 'bowls', 'burritos', 'tacos'];

    // Reset visible count when category changes
    useEffect(() => {
        setVisibleCount(8);
    }, [activeCategory]);

    // Scroll listener for sticky button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowStickyButton(true);
            } else {
                setShowStickyButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const allFilteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(i => i.category === activeCategory);
    const displayedItems = allFilteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < allFilteredItems.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

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
                <div className="absolute inset-0 bg-brand-black/80 z-10" />
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
                            className="text-5xl md:text-8xl font-display font-bold text-white mb-6"
                        >
                            THE MENU
                        </motion.h1>
                        <p className="text-brand-gold tracking-widest uppercase text-sm">Curated for the obsessed</p>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-start md:justify-center gap-8 mb-16 border-b border-white/10 pb-6 overflow-x-auto no-scrollbar px-4 -mx-6 md:mx-0 md:px-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-sm font-display font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap px-4 py-2 ${activeCategory === cat ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-8 gap-y-10 md:gap-y-16">
                        {displayedItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[16/9] mb-4 md:mb-6 overflow-hidden bg-brand-charcoal">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {item.isSignature && (
                                        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-brand-gold text-black text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 md:px-3 md:py-1">
                                            Signature
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                                    <h3 className="text-lg md:text-2xl font-display font-bold text-white leading-tight">{item.name}</h3>
                                    <span className="font-mono text-brand-gold text-sm md:text-lg">{item.price}</span>
                                </div>
                                <p className="text-xs md:text-base text-gray-400 font-light leading-relaxed mb-3 md:mb-4 max-w-md line-clamp-3 md:line-clamp-none">{item.description}</p>

                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-brand-gold/60 uppercase tracking-wider">
                                    <span className="w-1 h-1 bg-brand-gold rounded-full" />
                                    {item.chefNote}
                                </div>
                            </motion.div>
                        ))}

                        {/* Sentinel for Infinite Scroll */}
                        {hasMore && (
                            <motion.div
                                onViewportEnter={loadMore}
                                className="col-span-full h-20 flex justify-center items-center"
                            >
                                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce mx-1" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </motion.div>
                        )}
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

                {/* Sticky Build Your Own Button */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={showStickyButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-40 w-full md:w-auto px-6 md:px-0"
                >
                    <Link href="/build">
                        <button className="w-full md:w-auto bg-brand-gold text-brand-black px-8 py-4 rounded-full font-display font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                            <span>Build Your Own</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
