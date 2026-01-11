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
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

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
        { label: 'Menu', href: '/menu' },
        { label: 'Build', href: '/build' },
        { label: 'Our Story', href: '/our-story' },
        { label: 'Locations', href: '/locations' },
    ];

    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-400 ${isScrolled || !isHome || mobileMenuOpen
                    ? 'py-5 bg-brand-black/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.35)]'
                    : 'py-7 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="relative z-50">
                        <div className="relative h-14 w-44 md:h-16 md:w-56">
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
                    <nav className="hidden md:flex items-center gap-9">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative text-base font-display font-semibold uppercase tracking-[0.18em] text-white/75 hover:text-brand-gold transition-colors"
                            >
                                {item.label}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left bg-brand-gold transition-transform duration-300" />
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-5">
                        <Link href="/order">
                            <button className="group relative overflow-hidden px-6 py-3.5 rounded-full font-display font-bold tracking-[0.25em] uppercase text-sm bg-brand-gold text-brand-black hover:bg-white transition-colors shadow-[0_10px_30px_rgba(212,175,55,0.35)]">
                                <span className="relative z-10">Order Online</span>
                                <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform" />
                            </button>
                        </Link>

                        <Link href="/cart">
                            <div className="flex items-center gap-2 text-white/85 hover:text-brand-gold transition-colors cursor-pointer px-4.5 py-2.5 rounded-full border border-white/10 bg-white/5">
                                <ShoppingBag size={20} />
                                <span className="font-mono text-base">
                                    {isHydrated ? `$${cartTotal.toFixed(2)}` : '--'}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
                                        <p className="text-2xl font-mono text-brand-gold">
                                            {isHydrated ? `$${cartTotal.toFixed(2)}` : '--'}
                                        </p>
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
