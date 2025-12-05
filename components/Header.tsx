'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

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

    const navLinks = [
        { label: 'Menu', href: '/menu' },
        { label: 'Our Story', href: '/our-story' },
        { label: 'Locations', href: '/locations' },
    ];

    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled || !isHome
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
                        className="md:hidden z-50 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-4xl font-display font-bold text-white hover:text-brand-gold transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/order"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 px-8 py-4 border border-brand-gold text-brand-gold font-display tracking-widest uppercase"
                        >
                            Order Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
