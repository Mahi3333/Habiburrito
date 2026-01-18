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
                                Your legend is being crafted. We&apos;ve sent a confirmation to your phone and email.
                            </p>
                            {orderId && (
                                <p className="text-sm text-gray-300 font-mono mb-8">Order ID: #{orderId}</p>
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

            <main className="flex-grow flex items-center justify-center">
                {/* Single Central CTA since Build is gone */}
                <Link href="/menu" className="w-full h-full relative group overflow-hidden bg-brand-charcoal flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/menu-items/bowl-signature.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                    <div className="relative z-10 text-center p-8">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-brand-gold tracking-[0.3em] uppercase text-sm font-bold block mb-4"
                        >
                            Order Now
                        </motion.span>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-9xl font-display font-bold text-white mb-8"
                        >
                            THE MENU
                        </motion.h2>
                        <span className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-sm font-bold tracking-widest uppercase group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all rounded-full">
                            Explore &amp; Order
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
