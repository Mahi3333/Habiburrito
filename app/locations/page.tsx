'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LocationsPage() {
    return (
        <div className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/background_tacos_blur.png"
                        alt="Background texture"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-brand-black/70" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase">The Destination</span>
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter mt-4">
                                FIND <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">US</span>
                            </h1>
                        </motion.div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

                        {/* Left Column: The "Ticket" / Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Location Card */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-brand-gold/30 transition-colors duration-500">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-brand-gold">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>

                                <h2 className="text-3xl font-display font-bold text-white mb-2">Haverhill HQ</h2>
                                <p className="text-brand-gold font-mono text-sm mb-8">Est. 2024 • Premium Halal Kitchen</p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">124 S Main St</p>
                                            <p className="text-gray-400">Bradford, MA 01835</p>
                                            <p className="text-xs text-brand-gold mt-1 italic">Located inside "Mediterranean Pizza & Roast Beef"</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">Opening Hours</p>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-400 mt-1">
                                                <span>Sun - Thu</span>
                                                <span className="text-white">11:00 AM - 11:00 PM</span>
                                                <span>Fri - Sat</span>
                                                <span className="text-white">11:00 AM - 12:00 AM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">Contact</p>
                                            <p className="text-gray-400 text-sm">Questions or Catering?</p>
                                            <a href="mailto:admin@habiburrito.com" className="text-brand-gold hover:text-white transition-colors block mt-1 font-mono">
                                                admin@habiburrito.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                                    <Link href="https://www.google.com/maps/search/?api=1&query=QWCF%2B3W+Bradford%2C+Haverhill%2C+MA+124+S+Main+St%2C+Bradford%2C+MA+01835" target="_blank" className="flex-1">
                                        <button className="w-full py-4 bg-brand-gold text-black rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2">
                                            <span>Get Directions</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </button>
                                    </Link>
                                    <Link href="/menu" className="flex-1">
                                        <button className="w-full py-4 bg-white/10 text-white border border-white/10 rounded-xl font-bold uppercase tracking-wider hover:bg-white/20 transition-colors">
                                            Order Pickup
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* "Getting Here" Mini Section */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                                    <span className="text-2xl mb-2 block">🅿️</span>
                                    <p className="text-white font-bold text-sm">Free Parking</p>
                                    <p className="text-xs text-gray-400">Available on-site</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                                    <span className="text-2xl mb-2 block">♿</span>
                                    <p className="text-white font-bold text-sm">Accessible</p>
                                    <p className="text-xs text-gray-400">Wheelchair friendly</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: The Map Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-full min-h-[500px] lg:min-h-[700px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group"
                        >
                            {/* Map Iframe with Filters */}
                            <iframe
                                width="100%"
                                height="100%"
                                title="map"
                                className="absolute inset-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
                                frameBorder="0"
                                scrolling="no"
                                src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=124%20S%20Main%20St%2C%20Bradford%2C%20MA%2001835&ie=UTF8&t=&z=15&iwloc=B&output=embed"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/20 pointer-events-none" />

                            {/* Animated Pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="relative">
                                    <div className="absolute -inset-8 bg-brand-gold/20 rounded-full animate-ping" />
                                    <div className="absolute -inset-4 bg-brand-gold/40 rounded-full animate-pulse" />
                                    <div className="relative w-6 h-6 bg-brand-gold rounded-full border-4 border-black shadow-[0_0_30px_rgba(255,215,0,0.8)]" />
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-brand-gold/50 whitespace-nowrap">
                                        We Are Here
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Corner Elements */}
                            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-brand-gold/30 rounded-tr-2xl" />
                            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-brand-gold/30 rounded-bl-2xl" />
                        </motion.div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
