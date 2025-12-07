'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartTotal } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { label: 'Menu', href: '/menu', description: 'Explore our fresh bowls' },
        { label: 'Our Story', href: '/our-story', description: 'The Habiburrito journey' },
        { label: 'Locations', href: '/locations', description: 'Find us near you' },
    ];

    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled || !isHome || mobileMenuOpen
                    ? 'py-4 bg-brand-black/80 backdrop-blur-md border-b border-white/5'
                    : 'py-8 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="relative z-50">
                        <div className="relative h-10 w-32 md:h-12 md:w-40">
                            <Image
                                src="/logo.jpg"
                                alt="Habiburrito"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-12">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-display font-bold uppercase tracking-[0.2em] text-white/70 hover:text-brand-gold transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="flex items-center gap-6 pl-6 border-l border-white/10">
                            <Link href="/order">
                                <button className="bg-brand-gold text-brand-black px-6 py-3 rounded-sm font-display font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors">
                                    Order Online
                                </button>
                            </Link>

                            <div className="flex items-center gap-2 text-white/80">
                                <ShoppingBag size={18} />
                                <span className="font-mono text-sm">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-brand-black border-l border-white/10 z-50 flex flex-col md:hidden shadow-2xl"
                        >
                            <div className="flex-1 flex flex-col pt-24 px-8 pb-8 overflow-y-auto">
                                <div className="space-y-8">
                                    {navLinks.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="group block"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-3xl font-display font-bold text-white group-hover:text-brand-gold transition-colors">
                                                        {item.label}
                                                    </span>
                                                    <ChevronRight size={20} className="text-brand-gold group-hover:text-white transition-colors" />
                                                </div>
                                                <p className="text-base text-gray-300 font-medium">{item.description}</p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-12 space-y-6">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between text-white/80 mb-2">
                                            <span className="text-sm uppercase tracking-widest">Cart Total</span>
                                            <ShoppingBag size={18} />
                                        </div>
                                        <p className="text-2xl font-mono text-brand-gold">${cartTotal.toFixed(2)}</p>
                                    </div>

                                    <Link
                                        href="/order"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full bg-brand-gold text-brand-black font-display font-bold tracking-widest uppercase text-center py-5 rounded-lg hover:bg-white transition-colors"
                                    >
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
