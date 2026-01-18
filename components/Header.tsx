'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronRight } from 'lucide-react';
import { useStoreStatus } from '../app/hooks/useStoreStatus';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showClosedTooltip, setShowClosedTooltip] = useState(false);
    const { cartTotal } = useCart();
    const [isHydrated, setIsHydrated] = useState(false);
    const { isOpen, statusText, color: statusColor } = useStoreStatus();

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
        { label: 'Menu', href: '/menu', description: 'Explore our signatures' },

        { label: 'Our Story', href: '/our-story', description: 'How we started' },
        { label: 'Locations', href: '/locations', description: 'Find us' },
    ];

    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-400 ${isScrolled || !isHome || mobileMenuOpen
                    ? 'py-4 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm'
                    : 'py-6 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 relative flex items-center justify-end md:justify-between">
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 z-50 max-w-[70%]">
                        <div className="relative h-12 w-36 sm:h-14 sm:w-44 md:h-16 md:w-56">
                            <Image
                                src="/logo.jpg"
                                alt="Habiburrito"
                                fill
                                className="object-contain object-left mix-blend-multiply"
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
                                className={`group relative text-sm font-display font-bold uppercase tracking-[0.15em] transition-colors ${isScrolled || !isHome ? 'text-brand-black hover:text-brand-gold' : 'text-brand-black lg:text-white lg:hover:text-brand-gold'
                                    }`}
                            >
                                {item.label}
                                <span className={`absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${isScrolled || !isHome ? 'bg-brand-black' : 'bg-brand-gold'
                                    }`} />
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-5">
                        <div className={`hidden lg:flex items-center gap-2 font-mono text-xs tracking-widest uppercase ${isScrolled || !isHome ? 'text-brand-black' : 'text-white/80'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            {statusText}
                        </div>
                        <div className="relative">
                            {isOpen ? (
                                <Link href="/order">
                                    <button className="group relative overflow-hidden px-6 py-3 rounded-full font-display font-bold tracking-[0.25em] uppercase text-xs bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors shadow-lg">
                                        <span className="relative z-10">Order</span>
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setShowClosedTooltip(!showClosedTooltip)}
                                    className="cursor-not-allowed opacity-50 px-6 py-3 rounded-full font-display font-bold tracking-[0.25em] uppercase text-xs bg-gray-200 text-brand-black border border-black/5"
                                >
                                    Closed
                                </button>
                            )}

                            <AnimatePresence>
                                {showClosedTooltip && !isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full mt-4 right-0 bg-white border border-black/5 p-4 rounded-xl w-64 text-center z-50 shadow-xl"
                                    >
                                        <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-black/5 transform rotate-45" />
                                        <p className="text-brand-black font-bold mb-1">We are currently closed</p>
                                        <p className="text-xs text-brand-black">{statusText}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/cart">
                            <div className={`flex items-center gap-2 transition-colors cursor-pointer px-4 py-2 rounded-full border ${isScrolled || !isHome
                                ? 'border-black/5 bg-gray-50 text-brand-black hover:border-brand-black'
                                : 'border-white/20 bg-black/20 text-white hover:bg-black/40'
                                }`}>
                                <ShoppingBag size={18} />
                                <span className="font-mono text-sm">
                                    {isHydrated ? `$${cartTotal.toFixed(2)}` : '--'}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden z-50 p-2 transition-colors ${(isScrolled || !isHome || mobileMenuOpen) ? 'text-brand-black' : 'text-white'
                            }`}
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
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-brand-cream border-l border-black/5 z-50 flex flex-col md:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between px-6 pt-6">
                                <span className="text-xs uppercase tracking-[0.3em] text-brand-black font-bold">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-full border border-black/10 text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col pt-6 px-8 pb-8 overflow-y-auto">
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
                                                    <span className="text-3xl font-display font-bold text-brand-black group-hover:text-brand-gold transition-colors">
                                                        {item.label}
                                                    </span>
                                                    <ChevronRight size={20} className="text-brand-black group-hover:text-brand-gold transition-colors" />
                                                </div>
                                                <p className="text-base text-brand-black font-medium">{item.description}</p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-12 space-y-6">
                                    <div className="p-4 rounded-xl bg-white border border-black/5 shadow-sm">
                                        <div className="flex items-center justify-between text-brand-black mb-2">
                                            <span className="text-sm uppercase tracking-widest">Cart Total</span>
                                            <ShoppingBag size={18} />
                                        </div>
                                        <p className="text-2xl font-mono text-brand-black">
                                            {isHydrated ? `$${cartTotal.toFixed(2)}` : '--'}
                                        </p>
                                    </div>

                                    {isOpen ? (
                                        <Link
                                            href="/order"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full bg-brand-black text-brand-gold font-display font-bold tracking-widest uppercase text-center py-5 rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Order Now
                                        </Link>
                                    ) : (
                                        <button disabled className="block w-full bg-gray-200 text-brand-black font-display font-bold tracking-widest uppercase text-center py-5 rounded-lg cursor-not-allowed border border-black/5">
                                            Currently Closed
                                        </button>
                                    )}
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
