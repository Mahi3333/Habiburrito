'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import { motion } from 'framer-motion';

function OrderContent() {
    const searchParams = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    if (success) {
        return (
            <div className="min-h-screen bg-brand-black flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                    {/* Success UI */}
                    <div className="absolute inset-0 bg-[url('/background_bowls_blur.png')] opacity-20 bg-cover" />
                    <div className="relative z-10 text-center max-w-2xl">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(198,168,124,0.4)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">ORDER <span className="text-brand-gold">CONFIRMED</span></h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Your legend is being crafted. We've sent a confirmation to your phone and email.
                            </p>
                            {orderId && (
                                <p className="text-sm text-gray-500 font-mono mb-8">Order ID: #{orderId}</p>
                            )}
                            <Link href="/">
                                <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-brand-gold transition-colors">
                                    Return Home
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="h-screen bg-brand-black flex flex-col overflow-hidden">
            <Header />

            <main className="flex-grow flex flex-col md:flex-row">
                {/* Left: Signature */}
                <Link href="/menu" className="flex-1 relative group overflow-hidden border-r border-white/10">
                    <div className="absolute inset-0 bg-[url('/menu-items/bowl-signature.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4"
                        >
                            Curated
                        </motion.span>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                        >
                            SIGNATURE
                        </motion.h2>
                        <span className="px-6 py-3 border border-white/30 text-white text-xs font-bold tracking-widest uppercase group-hover:bg-white group-hover:text-black transition-all">
                            View Menu
                        </span>
                    </div>
                </Link>

                {/* Right: Build Your Own */}
                <Link href="/build" className="flex-1 relative group overflow-hidden bg-brand-charcoal">
                    <div className="absolute inset-0 bg-[url('/background_create.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4"
                        >
                            Custom
                        </motion.span>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                        >
                            CREATE
                        </motion.h2>
                        <span className="px-6 py-3 border border-white/30 text-white text-xs font-bold tracking-widest uppercase group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-black transition-all">
                            Start Building
                        </span>
                    </div>
                </Link>
            </main>
        </div>
    );
}

export default function OrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-black" />}>
            <OrderContent />
        </Suspense>
    );
}
